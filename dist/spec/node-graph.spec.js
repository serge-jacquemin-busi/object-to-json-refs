"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_node_1 = require("../src/object-node");
const node_graph_1 = require("../src/node-graph");
const casual_util_1 = require("./util/casual-util");
const casual = require("casual");
describe('ConvertToNodeGraph', () => {
    it(`sould retrieve node with its target properly set
    when target is a primitive`, () => {
        // Arrange
        const target = casual_util_1.getRandomPrimitive();
        // Act
        const result = node_graph_1.ConvertToNodeGraph(target);
        // Assert
        expect(result.target).toBe(target);
    });
    it(`sould retrieve node with its target properly set
    when target is a reference to an object`, () => {
        // Arrange
        const target = {};
        // Act
        const result = node_graph_1.ConvertToNodeGraph(target);
        // Assert
        expect(result.target).toBe(target);
    });
    it(`sould retrieve node with its target properly set
    when target is a reference to an array`, () => {
        // Arrange
        const target = [];
        // Act
        const result = node_graph_1.ConvertToNodeGraph(target);
        // Assert
        expect(result.target).toBe(target);
    });
    it(`sould retrieve node with no children
    when target is a primitive`, () => {
        // Arrange
        const target = casual_util_1.getRandomPrimitive();
        // Act
        const result = node_graph_1.ConvertToNodeGraph(target);
        // Assert
        expect(result.children).toEqual({});
    });
    it(`sould retrieve node with no children
    when target is a reference to an empty object`, () => {
        // Arrange
        const target = {};
        // Act
        const result = node_graph_1.ConvertToNodeGraph(target);
        // Assert
        expect(result.children).toEqual({});
    });
    it(`sould retrieve node with no children
    when target is a reference to an empty array`, () => {
        // Arrange
        const target = [];
        // Act
        const result = node_graph_1.ConvertToNodeGraph(target);
        // Assert
        expect(result.children).toEqual({});
    });
    it(`sould retrieve node with its children properly set
    when target is a reference to an object having properties`, () => {
        // Arrange
        const randomProperties = new Array(10).fill(null)
            .map(() => ({ name: casual.word, value: casual_util_1.getRandomPrimitive() }));
        const target = randomProperties.reduce((obj, property) => Object.assign(obj, {
            [property.name]: property.value
        }), {});
        // Act
        const result = node_graph_1.ConvertToNodeGraph(target);
        // Assert
        const childrenKeys = Object.keys(result.children);
        expect(childrenKeys).toEqual(randomProperties.map(property => property.name));
        const childrenTargets = childrenKeys.map(key => result.children[key].target);
        expect(childrenTargets).toEqual(randomProperties.map(property => property.value));
    });
    it(`sould retrieve node with its children properly set
    when target is a reference to an array having values`, () => {
        // Arrange
        const target = new Array(10).fill(null)
            .map(() => casual_util_1.getRandomPrimitive());
        // Act
        const result = node_graph_1.ConvertToNodeGraph(target);
        // Assert
        const childrenKeys = Object.keys(result.children);
        expect(childrenKeys).toEqual(Object.keys(target));
        const childrenTargets = childrenKeys.map(key => result.children[key].target);
        expect(childrenTargets).toEqual(target);
    });
    it(`sould retrieve node with its descendants properly set in cascade
    when target is a reference to an object being a tree of primitives and objects`, () => {
        // Arrange
        const target = {
            [casual.word]: casual_util_1.getRandomPrimitive(),
            [casual.word]: {
                [casual.word]: casual_util_1.getRandomPrimitive()
            },
            [casual.word]: {
                [casual.word]: casual_util_1.getRandomPrimitive(),
                [casual.word]: {
                    [casual.word]: casual_util_1.getRandomPrimitive()
                }
            },
            [casual.word]: {
                [casual.word]: casual_util_1.getRandomPrimitive(),
                [casual.word]: {
                    [casual.word]: casual_util_1.getRandomPrimitive(),
                    [casual.word]: {
                        [casual.word]: casual_util_1.getRandomPrimitive()
                    }
                }
            }
        };
        const expected = new object_node_1.Node('', target);
        expected.children =
            Object.keys(target).reduce((children, key) => Object.assign(children, { [key]: node_graph_1.ConvertToNodeGraph(target[key], `/${key}`) }), {});
        // Act
        const result = node_graph_1.ConvertToNodeGraph(target);
        // Assert
        expect(result).toEqual(expected);
    });
    it(`sould retrieve node with its descendants properly set in cascade
    when target is a reference to an array being a tree of primitives and arrays`, () => {
        // Arrange
        const target = [
            casual_util_1.getRandomPrimitive(),
            [
                casual_util_1.getRandomPrimitive()
            ],
            [
                casual_util_1.getRandomPrimitive(),
                [
                    casual_util_1.getRandomPrimitive()
                ]
            ],
            [
                casual_util_1.getRandomPrimitive(),
                [
                    casual_util_1.getRandomPrimitive(),
                    [
                        casual_util_1.getRandomPrimitive()
                    ]
                ]
            ]
        ];
        const expected = new object_node_1.Node('', target);
        expected.children =
            Object.keys(target).reduce((children, key) => Object.assign(children, { [key]: node_graph_1.ConvertToNodeGraph(target[parseInt(key)], `/${key}`) }), {});
        // Act
        const result = node_graph_1.ConvertToNodeGraph(target);
        // Assert
        expect(result).toEqual(expected);
    });
    it(`sould retrieve node with its descendants properly set in cascade
    when target is a reference to an object being a tree of mixed types`, () => {
        // Arrange
        const target = {
            [casual.word]: casual_util_1.getRandomPrimitive(),
            [casual.word]: [
                casual_util_1.getRandomPrimitive()
            ],
            [casual.word]: {
                [casual.word]: casual_util_1.getRandomPrimitive(),
                [casual.word]: [
                    casual_util_1.getRandomPrimitive()
                ]
            },
            [casual.word]: [
                casual_util_1.getRandomPrimitive(),
                {
                    [casual.word]: casual_util_1.getRandomPrimitive(),
                    [casual.word]: [
                        casual_util_1.getRandomPrimitive()
                    ]
                }
            ]
        };
        const expected = new object_node_1.Node('', target);
        expected.children =
            Object.keys(target).reduce((children, key) => Object.assign(children, { [key]: node_graph_1.ConvertToNodeGraph(target[key], `/${key}`) }), {});
        // Act
        const result = node_graph_1.ConvertToNodeGraph(target);
        // Assert
        expect(result).toEqual(expected);
    });
});
//# sourceMappingURL=node-graph.spec.js.map