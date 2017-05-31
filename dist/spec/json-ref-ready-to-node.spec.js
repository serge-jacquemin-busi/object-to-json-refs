"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json_ref_ready_to_node_1 = require("../src/json-ref-ready-to-node");
const casual_util_1 = require("./util/casual-util");
const node_1 = require("../src/models/node");
const casual = require("casual");
describe('JsonRefReadyToNode', () => {
    let knownPaths;
    beforeEach(() => {
        knownPaths = {};
    });
    it(`sould retrieve node with its target and path properly set
    when target is a primitive`, () => {
        // Arrange
        const target = casual_util_1.GetRandomPrimitive();
        const path = casual.word;
        // Act
        const result = json_ref_ready_to_node_1.JsonRefReadyToNode(target, path, knownPaths);
        // Assert
        expect(result.target).toBe(target);
        expect(result.path).toBe(path);
        expect(path in knownPaths).toBeTruthy();
        expect(knownPaths[path]).toBe(result);
    });
    it(`sould retrieve node with its target and path properly set
    when target is a reference to an object`, () => {
        // Arrange
        const target = {};
        const path = casual.word;
        // Act
        const result = json_ref_ready_to_node_1.JsonRefReadyToNode(target, path, knownPaths);
        // Assert
        expect(result.target).toBe(target);
        expect(result.path).toBe(path);
        expect(path in knownPaths).toBeTruthy();
        expect(knownPaths[path]).toBe(result);
    });
    it(`sould retrieve node with its target and path properly set
    when target is a reference to an array`, () => {
        // Arrange
        const target = [];
        const path = casual.word;
        // Act
        const result = json_ref_ready_to_node_1.JsonRefReadyToNode(target, path, knownPaths);
        // Assert
        expect(result.target).toBe(target);
        expect(result.path).toBe(path);
        expect(path in knownPaths).toBeTruthy();
        expect(knownPaths[path]).toBe(result);
    });
    it(`sould retrieve node with no children
    when target is a primitive`, () => {
        // Arrange
        const target = casual_util_1.GetRandomPrimitive();
        // Act
        const result = json_ref_ready_to_node_1.JsonRefReadyToNode(target);
        // Assert
        expect(result.children).toEqual({});
    });
    it(`sould retrieve node with no children
    when target is a reference to an empty object`, () => {
        // Arrange
        const target = {};
        // Act
        const result = json_ref_ready_to_node_1.JsonRefReadyToNode(target);
        // Assert
        expect(result.children).toEqual({});
    });
    it(`sould retrieve node with no children
    when target is a reference to an empty array`, () => {
        // Arrange
        const target = [];
        // Act
        const result = json_ref_ready_to_node_1.JsonRefReadyToNode(target);
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
            .map(name => ({ name: name, value: casual_util_1.GetRandomPrimitive() }));
        const target = randomProperties.reduce((obj, property) => Object.assign(obj, {
            [property.name]: property.value
        }), {});
        // Act
        const result = json_ref_ready_to_node_1.JsonRefReadyToNode(target);
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
            .map(() => casual_util_1.GetRandomPrimitive());
        // Act
        const result = json_ref_ready_to_node_1.JsonRefReadyToNode(target);
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
            [casual.word]: casual_util_1.GetRandomPrimitive(),
            [casual.word]: {
                [casual.word]: casual_util_1.GetRandomPrimitive()
            },
            [casual.word]: {
                [casual.word]: casual_util_1.GetRandomPrimitive(),
                [casual.word]: {
                    [casual.word]: casual_util_1.GetRandomPrimitive()
                }
            },
            [casual.word]: {
                [casual.word]: casual_util_1.GetRandomPrimitive(),
                [casual.word]: {
                    [casual.word]: casual_util_1.GetRandomPrimitive(),
                    [casual.word]: {
                        [casual.word]: casual_util_1.GetRandomPrimitive()
                    }
                }
            }
        };
        const expected = new node_1.Node('', target);
        expected.children =
            Object.keys(target).reduce((children, key) => Object.assign(children, { [key]: json_ref_ready_to_node_1.JsonRefReadyToNode(target[key], `/${key}`) }), {});
        // Act
        const result = json_ref_ready_to_node_1.JsonRefReadyToNode(target);
        // Assert
        expect(result).toEqual(expected);
    });
    it(`sould retrieve node with its descendants properly set in cascade
    when target is a reference to an array being a tree of primitives and arrays`, () => {
        // Arrange
        const target = [
            casual_util_1.GetRandomPrimitive(),
            [
                casual_util_1.GetRandomPrimitive()
            ],
            [
                casual_util_1.GetRandomPrimitive(),
                [
                    casual_util_1.GetRandomPrimitive()
                ]
            ],
            [
                casual_util_1.GetRandomPrimitive(),
                [
                    casual_util_1.GetRandomPrimitive(),
                    [
                        casual_util_1.GetRandomPrimitive()
                    ]
                ]
            ]
        ];
        const expected = new node_1.Node('', target);
        expected.children =
            Object.keys(target).reduce((children, key) => Object.assign(children, { [key]: json_ref_ready_to_node_1.JsonRefReadyToNode(target[parseInt(key)], `/${key}`) }), {});
        // Act
        const result = json_ref_ready_to_node_1.JsonRefReadyToNode(target);
        // Assert
        expect(result).toEqual(expected);
    });
    it(`sould retrieve node with its descendants properly set in cascade
    when target is a reference to an object being a tree of mixed types`, () => {
        // Arrange
        const target = {
            [casual.word]: casual_util_1.GetRandomPrimitive(),
            [casual.word]: [
                casual_util_1.GetRandomPrimitive()
            ],
            [casual.word]: {
                [casual.word]: casual_util_1.GetRandomPrimitive(),
                [casual.word]: [
                    casual_util_1.GetRandomPrimitive()
                ]
            },
            [casual.word]: [
                casual_util_1.GetRandomPrimitive(),
                {
                    [casual.word]: casual_util_1.GetRandomPrimitive(),
                    [casual.word]: [
                        casual_util_1.GetRandomPrimitive()
                    ]
                }
            ]
        };
        const expected = new node_1.Node('', target);
        expected.children =
            Object.keys(target).reduce((children, key) => Object.assign(children, { [key]: json_ref_ready_to_node_1.JsonRefReadyToNode(target[key], `/${key}`) }), {});
        // Act
        const result = json_ref_ready_to_node_1.JsonRefReadyToNode(target);
        // Assert
        expect(result).toEqual(expected);
    });
});
//# sourceMappingURL=json-ref-ready-to-node.spec.js.map