import { Node } from '../src/object-node';
import { ReferenceToNode } from '../src/node-graph';
import { Resolve } from '../src/resolve';
import { primitives, GetRandomPrimitive } from './util/casual-util';
import * as casual from 'casual';


const stringify = JSON.stringify;

describe('Resolve', () => {
    it(`should return node.target unchanged
    when node.target is a primitive`,
        () => {
            // Arrange
            const shortestPathNodes: ReferenceToNode = new WeakMap<any, Node>();
            const primitive = GetRandomPrimitive();
            const node = new Node(casual.word, primitive);

            // Act
            const result = Resolve(node, shortestPathNodes);

            // Assert
            expect(result).toBe(primitive);
        });

    it(`should throw
    when node.target is a reference
    and node.target isn't a key of shortestPathNode`,
        () => {
            // Arrange
            const shortestPathNodes: ReferenceToNode = new WeakMap<any, Node>();
            const reference = {};
            const node = new Node(casual.word, reference);

            // Act
            const result = () => Resolve(node, shortestPathNodes);

            // Assert
            expect(result).toThrow();
        });

    it(`should return $ref with the shortest path
    when node.target is a reference
    and node isn't the shortest path node for its target`,
        () => {
            // Arrange
            const shortestPathNodes: ReferenceToNode = new WeakMap<any, Node>();
            const reference = {};
            const node = new Node(casual.word, reference);
            const shortestPathNode = new Node(casual.word, reference);
            shortestPathNodes.set(reference, shortestPathNode);

            // Act
            const result = Resolve(node, shortestPathNodes);

            // Assert
            expect(result).toEqual({ $ref: shortestPathNode.path });
        });

    it(`should return object including all node's children resolved
    when node.target is a reference
    and node.target is a key of shortestPathNode`,
        () => {
            // Arrange
            const shortestPathNodes: ReferenceToNode = new WeakMap<any, Node>();
            const reference = { a : {}, b: {} };
            const node = new Node(casual.word, reference);
            node.children.a = new Node('', reference.a);
            node.children.b = new Node('', reference.b);
            shortestPathNodes.set(reference, node);
            const subResolve = jasmine.createSpy('subResolve');
            subResolve.and.callFake((node: Node) => node.target);

            // Act
            const result = Resolve(node, shortestPathNodes, subResolve);

            // Assert
            expect(result).toEqual(reference);
        });

    it('should successfully resolve a complexe object', () => {
        // Arrange
        const expected: any = [
            GetRandomPrimitive(),
            { a: GetRandomPrimitive(), b: { $ref: casual.word }, c: [GetRandomPrimitive()] }
        ];
        const shortestPathNodes: ReferenceToNode = new WeakMap<any, Node>();
        const node = new Node('', expected);
        shortestPathNodes.set(expected, node);
        node.children[0] = new Node('', expected[0]);
        node.children[1] = new Node('', expected[1]);
        shortestPathNodes.set(expected[1], node.children[1]);
        const subChildren = node.children[1].children;
        subChildren.a = new Node('', expected[1].a);
        subChildren.b = new Node('', expected[1].b);
        subChildren.c = new Node('', expected[1].c);
        shortestPathNodes.set(expected[1].b, new Node(expected[1].b.$ref, {}));
        shortestPathNodes.set(expected[1].c, subChildren.c);
        subChildren.c.children[0] = new Node('', expected[1].c[0]);
        
        // Act
        console.time();
        const result = Resolve(node, shortestPathNodes);
        console.timeEnd();

        // Assert
        expect(result).toEqual(expected);
    });
});