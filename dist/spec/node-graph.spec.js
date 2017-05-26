"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_node_1 = require("../src/object-node");
const node_graph_1 = require("../src/node-graph");
const casual_util_1 = require("./util/casual-util");
const casual = require("casual");
require("./util/array-util");
describe('ConvertToNodeGraph', () => {
    it(`sould retrieve node with its target and path properly set
    when target is a primitive`, () => {
        // Arrange
        const target = casual_util_1.getRandomPrimitive();
        const path = casual.word;
        // Act
        const result = node_graph_1.ConvertToNodeGraph(target, path);
        // Assert
        expect(result.target).toBe(target);
        expect(result.path).toBe(path);
    });
    it(`sould retrieve node with its target and properly set
    when target is a reference to an object`, () => {
        // Arrange
        const target = {};
        const path = casual.word;
        // Act
        const result = node_graph_1.ConvertToNodeGraph(target, path);
        // Assert
        expect(result.target).toBe(target);
        expect(result.path).toBe(path);
    });
    it(`sould retrieve node with its target and path properly set
    when target is a reference to an array`, () => {
        // Arrange
        const target = [];
        const path = casual.word;
        // Act
        const result = node_graph_1.ConvertToNodeGraph(target, path);
        // Assert
        expect(result.target).toBe(target);
        expect(result.path).toBe(path);
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
        const randomProperties = new Array(20).fill(null)
            .map(() => casual.word)
            .distinct()
            .sort()
            .map(name => ({ name: name, value: casual_util_1.getRandomPrimitive() }));
        const target = randomProperties.reduce((obj, property) => Object.assign(obj, {
            [property.name]: property.value
        }), {});
        // Act
        const result = node_graph_1.ConvertToNodeGraph(target);
        // Assert
        const childrenKeys = Object.keys(result.children).sort();
        expect(childrenKeys).toEqual(randomProperties.map(property => property.name));
        const childrenTargets = childrenKeys.map(key => result.children[key].target);
        expect(childrenTargets).toEqual(randomProperties.map(property => property.value));
    });
    it(`sould retrieve node with its children properly set
    when target is a reference to an array having values`, () => {
        // Arrange
        const target = new Array(20).fill(null)
            .map(() => casual_util_1.getRandomPrimitive());
        // Act
        const result = node_graph_1.ConvertToNodeGraph(target);
        // Assert
        const targetStringKeys = Object.keys(target).sort();
        const childrenKeys = Object.keys(result.children).sort();
        expect(childrenKeys).toEqual(targetStringKeys);
        const childrenTargets = childrenKeys.map(key => result.children[key].target);
        expect(childrenTargets).toEqual(targetStringKeys.map(key => target[parseInt(key)]));
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
    it(`sould properly set shortestPathNodes
    when target is a reference to an object being a tree of mixed types wihtouth cycles`, () => {
        // Arrange
        const shortestPathNodes = new WeakMap();
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
        // Act
        const result = node_graph_1.ConvertToNodeGraph(target, '', shortestPathNodes);
        // Assert
        const targetToNode = function (node) {
            const children = node.children;
            return Object.keys(children).reduce((associations, key) => associations.concat(targetToNode(children[key])), node.target != null && typeof (node.target) === 'object'
                ? [{ target: node.target, node: node }]
                : []);
        };
        targetToNode(result).forEach(({ target, node }) => {
            expect(shortestPathNodes.get(target)).toBe(node);
        });
    });
    it(`sould properly set shortestPathNodes
    when target is a reference to an object being a tree of mixed types with cycles`, () => {
        // Arrange
        const shortestPathNodes = new WeakMap();
        const target = {
            a: casual_util_1.getRandomPrimitive(),
            b: [
                casual_util_1.getRandomPrimitive()
            ],
            c: {
                a: casual_util_1.getRandomPrimitive(),
                b: [
                    casual_util_1.getRandomPrimitive()
                ]
            }
        };
        target.d = target;
        target.e = target.b;
        target.f = target.c.b;
        // Act
        const result = node_graph_1.ConvertToNodeGraph(target, '', shortestPathNodes);
        // Assert
        const targetToNodes = [
            { target: target.b, node: result.children.b },
            { target: target.f, node: result.children.f },
            { target: target.d, node: result },
            { target: target.e, node: result.children.b },
            { target: target.c.b, node: result.children.f },
        ];
        targetToNodes.forEach(({ target, node }) => {
            expect(shortestPathNodes.get(target)).toBe(node);
        });
    });
});
//# sourceMappingURL=node-graph.spec.js.map