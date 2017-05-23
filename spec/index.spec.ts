import { NodeObject } from '../src/object-node';
import {
    ConvertToJsonRefsReady,
    UseRealValueForParent,
    MutateToRef,
    ConvertToNodeGraph,
    NodeDictionary
} from '../src/index';

const stringify = JSON.stringify;

describe('UseRealValueForParent', () => {
    [
        (() => {
            const parent = {};
            const parentNode = new NodeObject('', parent);
            const node = new NodeObject('', 55, parentNode, 'x');
            return {
                parent,
                node,
                expected:
                {
                    x: 55
                }
            };
        })(),
        (() => {
            const parent = {};
            const parentNode = new NodeObject('', parent);
            const node = new NodeObject('', { y: ['z'] }, parentNode, 'x');
            return {
                parent,
                node,
                expected:
                {
                    x: { y: ['z'] }
                }
            };
        })()
    ].forEach(({ parent, node, expected }) => {
        it(`should set parent's property accordingly`, () => {
            // Arrange

            // Act
            UseRealValueForParent(node);

            // Assert
            expect(parent).toEqual(expected);
        });
    });
});

describe('MutateToRef', () => {
    [
        (() => {
            const parentNode = new NodeObject('', {});
            const node = new NodeObject('xyz', 55, parentNode, 'x');
            return {
                node,
                expected:
                {
                    $ref: 'xyz'
                }
            };
        })(),
        (() => {
            const node = new NodeObject('abc', null);
            return {
                node,
                expected:
                {
                    $ref: 'abc'
                }
            };
        })()
    ].forEach(({ node, expected }) => {
        it(`should remove all properties then set $ref property`, () => {
            // Arrange

            // Act
            MutateToRef(node);

            // Assert
            expect(stringify(node)).toEqual(stringify(expected));
        });
    });
});

describe('ConvertToNodeGraph', () => {
    it('should keep realValue on primitive', () => {
        // Arrange
        const realValue = {};
        const node = new NodeObject('', 55);
        const knownNodes = new WeakMap<any, NodeObject>();
        const keptNodes: NodeDictionary = {};

        // Act
        const result = ConvertToNodeGraph(node, knownNodes, keptNodes);

        // Assert
        expect(result.resolution).toBe(realValue);
    });

    it('should keep realValue on leaf', () => {
        // Arrange
        const realValue = {};
        const node = new NodeObject('', realValue);
        const knownNodes = new WeakMap<any, NodeObject>();
        const keptNodes: NodeDictionary = {};

        // Act
        const result = ConvertToNodeGraph(node, knownNodes, keptNodes);

        // Assert
        expect(result.sourceReference).toBe(realValue);
    });

    it('should transform 1 level depth tree', () => {
        // Arrange
        const realValue = {a: 10, b: 20};
        const node = new NodeObject('', realValue);
        const knownNodes = new WeakMap<any, NodeObject>();
        const keptNodes: NodeDictionary = {};

        // Act
        const result = ConvertToNodeGraph(node, knownNodes, keptNodes);

        // Assert
        expect(result.sourceReference.a).not.toBeNull();
        expect(result.sourceReference.a.realValue).toBe(realValue.a);
        expect(result.sourceReference.b).not.toBeNull();
        expect(result.sourceReference.b.realValue).toBe(realValue.b);        
    });
});


describe('ConvertToJsonRefsReady', () => {
    [
        true,
        false,
        0,
        Math.random(),
        '',
        `${Math.random()}`
    ].forEach(element => {
        it(`should return primitives unchanged: ${element}`, () => {
            // Arrange

            // Act
            const result = ConvertToJsonRefsReady(element);

            // Assert
            expect(result).toBe(element);
        })
    });

    // [
    //     { a: true },
    //     // { a: { b: true }},
    //     // { a: true, b: { c: true }},
    //     // { a: [1, 2, 3]},
    //     // { a: { b: [1, 2, 3]}},
    //     // { a: [1, 2, 3], b: { c: [1, 2, 3] }},
    // ].forEach(obj => {
    //     it(`should return object with no cycles unchanged: ${obj}`, () => {
    //         // Arrange

    //         // Act
    //         const result = ConvertToJsonRefsReady(obj);

    //         console.log(result);

    //         // Assert
    //         expect(stringify(result)).toBe(stringify(obj));
    //     })
    // });

    // [
    //     [(() => {
    //         const a: any = {};
    //         a['b'] = a;
    //         return a;
    //     })(), {b: { $ref: "" }}],
    //     [(() => {
    //         const a: any = {b: {}};
    //         a.b['c'] = a.b;
    //         return a;
    //     })(), {a: {b: { $ref: "/b" }}}],        
    // ].forEach(([obj, expected]) => {
    //     it(`should return object with simple cycle changed approprietly: ${obj}`, () => {
    //         // Arrange

    //         // Act
    //         const result = ConvertToJsonRefsReady(obj);

    //         // Assert
    //         expect(result).toBe(expected);
    //     })
    // });

});