"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const factory_get_node_reference_1 = require("../src/factory-get-node-reference");
const node_1 = require("../src/models/node");
const casual_util_1 = require("./util/casual-util");
const casual = require("casual");
const stringify = JSON.stringify;
describe('FactoryGetNodeReference(...)', () => {
    let shortestPathNodes;
    let method;
    beforeEach(() => {
        shortestPathNodes = new WeakMap();
        method = factory_get_node_reference_1.FactoryGetNodeReference(shortestPathNodes);
    });
    it(`should return null
    when value is a primitive`, () => {
        // Arrange
        const primitive = casual_util_1.GetRandomPrimitive();
        // Act
        const result = method(primitive);
        // Assert
        expect(result).toBeNull();
    });
    it(`should throw
    when value is a reference
    and value isn't a key of shortestPathNode`, () => {
        // Arrange
        const reference = {};
        // Act
        const result = () => method(reference);
        // Assert
        expect(result).toThrow();
    });
    it(`should return node with the shortest path
    when value is a reference
    and value is a key of shortestPathNode`, () => {
        // Arrange
        const reference = {};
        const shortestPathNode = new node_1.Node(casual.word, reference);
        shortestPathNodes.set(reference, shortestPathNode);
        // Act
        const result = method(reference);
        // Assert
        expect(result).toEqual(shortestPathNode);
    });
});
//# sourceMappingURL=factory-get-node-reference.spec.js.map