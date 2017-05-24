"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_node_1 = require("../src/object-node");
const node_graph_1 = require("../src/node-graph");
const casual_util_1 = require("./util/casual-util");
describe('ConvertToNodeGraph', () => {
    it(`sould retive single node with primitive
    when target is a primitive`, () => {
        // Arrange
        const target = casual_util_1.getRandomPrimitive();
        const expected = new object_node_1.Node('', target);
        // Act
        const result = node_graph_1.ConvertToNodeGraph(target);
        // Assert
        expect(result).toEqual(expected);
    });
});
//# sourceMappingURL=node-graph.spec.js.map