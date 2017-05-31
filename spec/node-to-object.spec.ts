import { IGetNodeReference } from '../src/models/get-node-reference';
import { Node } from '../src/models/node';
import { ReferenceToNode } from '../src/convert-to-node-graph';
import { NodeToObject, NodeToReference } from '../src/node-to-object';
import { primitives, GetRandomPrimitive } from './util/casual-util';
import * as casual from 'casual';


const stringify = JSON.stringify;

describe('NodeToObject', () => {
    let treatedNodes: NodeToReference;
    let getNodeReference: jasmine.Spy;
    
    beforeEach(() => {
        treatedNodes =  new WeakMap<Node, any>();
        getNodeReference = jasmine.createSpy('getNodeReference');
        getNodeReference.and.returnValue(null);
    });

    it(`should return already treated node's result
    when node has already been treaded`,
        () => {
            // Arrange
            const treated = {};
            const node = new Node(casual.word, {});
            treatedNodes.set(node, treated);

            // Act
            const result = NodeToObject(node, getNodeReference, treatedNodes);

            // Assert
            expect(result).toBe(treated);
        });

    it(`should return node.target unchanged and add result for node to treated map
    when node.target is a primitive`,
        () => {
            // Arrange
            const primitive = GetRandomPrimitive();
            const node = new Node(casual.word, primitive);

            // Act
            const result = NodeToObject(node, getNodeReference, treatedNodes);

            // Assert
            expect(result).toBe(primitive);
            expect(treatedNodes.get(node)).toBe(result);
        });

    it(`should return $ref
    when node has not been treaded yet
    and getNodeReference returns another node`,
        () => {
            // Arrange
            const reference = {};
            const node = new Node(casual.word, reference);
            const otherNode = new Node(casual.word, {});
            getNodeReference.and.callFake((value: any) => {
                return value === reference ? otherNode : null;
            });

            // Act
            const result = NodeToObject(node, getNodeReference);

            // Assert
            expect(result).toEqual({ $ref: otherNode.path });
        });

    it(`should return object including all node's children resolved
    when node.target is a reference
    and getNodeReference doesn't return another node`,
        () => {
            // Arrange
            const shortestPathNodes: ReferenceToNode = new WeakMap<any, Node>();
            const reference = { a : {}, b: {} };
            const node = new Node(casual.word, reference);
            node.children.a = new Node('', reference.a);
            node.children.b = new Node('', reference.b);
            shortestPathNodes.set(reference, node);
            const nodeToObject = jasmine.createSpy('nodeToObject');
            nodeToObject.and.callFake((node: Node) => node.target);

            // Act
            const result = NodeToObject(node, getNodeReference, treatedNodes, nodeToObject);

            // Assert
            expect(result).toEqual(reference);
        });

    it('should successfully resolve a complexe object', () => {
        // Arrange
        const expected: any = [
            GetRandomPrimitive(),
            { a: GetRandomPrimitive(), b: { $ref: casual.word }, c: [GetRandomPrimitive()] }
        ];
        const node = new Node('', expected);
        node.children[0] = new Node('', expected[0]);
        node.children[1] = new Node('', expected[1]);
        const subChildren = node.children[1].children;
        subChildren.a = new Node('', expected[1].a);
        subChildren.b = new Node('', expected[1].b);
        subChildren.c = new Node('', expected[1].c);
        subChildren.c.children[0] = new Node('', expected[1].c[0]);

        getNodeReference.and.callFake((value: any) => 
            value === expected[1].b ? new Node(expected[1].b.$ref, {}) : null
        );
        
        // Act
        const result = NodeToObject(node, getNodeReference);

        // Assert
        expect(result).toEqual(expected);
    });
});