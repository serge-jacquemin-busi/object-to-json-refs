"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_node_1 = require("../src/object-node");
const resolve_1 = require("../src/resolve");
const casual_util_1 = require("./util/casual-util");
const casual = require("casual");
const stringify = JSON.stringify;
describe('Resolve', () => {
    it(`should return node.target unchanged
    when node.target is a primitive`, () => {
        // Arrange
        const shortestPathNodes = new WeakMap();
        const primitive = casual_util_1.GetRandomPrimitive();
        const node = new object_node_1.Node(casual.word, primitive);
        // Act
        const result = resolve_1.Resolve(node, shortestPathNodes);
        // Assert
        expect(result).toBe(primitive);
    });
    it(`should throw
    when node.target is a reference
    and node.target isn't a key of shortestPathNode`, () => {
        // Arrange
        const shortestPathNodes = new WeakMap();
        const reference = {};
        const node = new object_node_1.Node(casual.word, reference);
        // Act
        const result = () => resolve_1.Resolve(node, shortestPathNodes);
        // Assert
        expect(result).toThrow();
    });
    it(`should return $ref with the shortest path
    when node.target is a reference
    and node isn't the shortest path node for its target`, () => {
        // Arrange
        const shortestPathNodes = new WeakMap();
        const reference = {};
        const node = new object_node_1.Node(casual.word, reference);
        const shortestPathNode = new object_node_1.Node(casual.word, reference);
        shortestPathNodes.set(reference, shortestPathNode);
        // Act
        const result = resolve_1.Resolve(node, shortestPathNodes);
        // Assert
        expect(result).toEqual({ $ref: shortestPathNode.path });
    });
    it(`should return object including all node's children resolved
    when node.target is a reference
    and node.target is a key of shortestPathNode`, () => {
        // Arrange
        const shortestPathNodes = new WeakMap();
        const reference = { a: {}, b: {} };
        const node = new object_node_1.Node(casual.word, reference);
        node.children.a = new object_node_1.Node('', reference.a);
        node.children.b = new object_node_1.Node('', reference.b);
        shortestPathNodes.set(reference, node);
        const subResolve = jasmine.createSpy('subResolve');
        subResolve.and.callFake((node) => node.target);
        // Act
        const result = resolve_1.Resolve(node, shortestPathNodes, subResolve);
        // Assert
        expect(result).toEqual(reference);
    });
    it('should successfully resolve a complexe object', () => {
        // Arrange
        const expected = [
            casual_util_1.GetRandomPrimitive(),
            { a: casual_util_1.GetRandomPrimitive(), b: { $ref: casual.word }, c: [casual_util_1.GetRandomPrimitive()] }
        ];
        const shortestPathNodes = new WeakMap();
        const node = new object_node_1.Node('', expected);
        shortestPathNodes.set(expected, node);
        node.children[0] = new object_node_1.Node('', expected[0]);
        node.children[1] = new object_node_1.Node('', expected[1]);
        shortestPathNodes.set(expected[1], node.children[1]);
        const subChildren = node.children[1].children;
        subChildren.a = new object_node_1.Node('', expected[1].a);
        subChildren.b = new object_node_1.Node('', expected[1].b);
        subChildren.c = new object_node_1.Node('', expected[1].c);
        shortestPathNodes.set(expected[1].b, new object_node_1.Node(expected[1].b.$ref, {}));
        shortestPathNodes.set(expected[1].c, subChildren.c);
        subChildren.c.children[0] = new object_node_1.Node('', expected[1].c[0]);
        // Act
        console.time();
        const result = resolve_1.Resolve(node, shortestPathNodes);
        console.timeEnd();
        // Assert
        expect(result).toEqual(expected);
    });
});
//# sourceMappingURL=resolve.spec.js.map