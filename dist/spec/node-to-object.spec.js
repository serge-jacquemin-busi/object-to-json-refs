"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("../src/models/node");
const node_to_object_1 = require("../src/node-to-object");
const casual_util_1 = require("./util/casual-util");
const casual = require("casual");
const stringify = JSON.stringify;
describe('NodeToObject', () => {
    let treatedNodes;
    let getNodeReference;
    beforeEach(() => {
        treatedNodes = new WeakMap();
        getNodeReference = jasmine.createSpy('getNodeReference');
        getNodeReference.and.returnValue(null);
    });
    it(`should return already treated node's result
    when node has already been treaded`, () => {
        // Arrange
        const treated = {};
        const node = new node_1.Node(casual.word, {});
        treatedNodes.set(node, treated);
        // Act
        const result = node_to_object_1.NodeToObject(node, getNodeReference, treatedNodes);
        // Assert
        expect(result).toBe(treated);
    });
    it(`should return node.target unchanged and add result for node to treated map
    when node.target is a primitive`, () => {
        // Arrange
        const primitive = casual_util_1.GetRandomPrimitive();
        const node = new node_1.Node(casual.word, primitive);
        // Act
        const result = node_to_object_1.NodeToObject(node, getNodeReference, treatedNodes);
        // Assert
        expect(result).toBe(primitive);
        expect(treatedNodes.get(node)).toBe(result);
    });
    it(`should return $ref
    when node has not been treaded yet
    and getNodeReference returns another node`, () => {
        // Arrange
        const reference = {};
        const node = new node_1.Node(casual.word, reference);
        const otherNode = new node_1.Node(casual.word, {});
        getNodeReference.and.callFake((value) => {
            return value === reference ? otherNode : null;
        });
        // Act
        const result = node_to_object_1.NodeToObject(node, getNodeReference);
        // Assert
        expect(result).toEqual({ $ref: otherNode.path });
    });
    it(`should return object including all node's children resolved
    when node.target is a reference
    and getNodeReference doesn't return another node`, () => {
        // Arrange
        const shortestPathNodes = new WeakMap();
        const reference = { a: {}, b: {} };
        const node = new node_1.Node(casual.word, reference);
        node.children.a = new node_1.Node('', reference.a);
        node.children.b = new node_1.Node('', reference.b);
        shortestPathNodes.set(reference, node);
        const nodeToObject = jasmine.createSpy('nodeToObject');
        nodeToObject.and.callFake((node) => node.target);
        // Act
        const result = node_to_object_1.NodeToObject(node, getNodeReference, treatedNodes, nodeToObject);
        // Assert
        expect(result).toEqual(reference);
    });
    it('should successfully resolve a complexe object', () => {
        // Arrange
        const expected = [
            casual_util_1.GetRandomPrimitive(),
            { a: casual_util_1.GetRandomPrimitive(), b: { $ref: casual.word }, c: [casual_util_1.GetRandomPrimitive()] }
        ];
        const node = new node_1.Node('', expected);
        node.children[0] = new node_1.Node('', expected[0]);
        node.children[1] = new node_1.Node('', expected[1]);
        const subChildren = node.children[1].children;
        subChildren.a = new node_1.Node('', expected[1].a);
        subChildren.b = new node_1.Node('', expected[1].b);
        subChildren.c = new node_1.Node('', expected[1].c);
        subChildren.c.children[0] = new node_1.Node('', expected[1].c[0]);
        getNodeReference.and.callFake((value) => value === expected[1].b ? new node_1.Node(expected[1].b.$ref, {}) : null);
        // Act
        const result = node_to_object_1.NodeToObject(node, getNodeReference);
        // Assert
        expect(result).toEqual(expected);
    });
});
//# sourceMappingURL=node-to-object.spec.js.map