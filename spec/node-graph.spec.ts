import { Node } from '../src/object-node';
import { ConvertToNodeGraph, ReferenceToNode } from '../src/node-graph';
import { GetRandomPrimitive } from './util/casual-util';
import * as casual from 'casual';
import './util/array-util';

describe('ConvertToNodeGraph', () => {
    it(`sould retrieve node with its target and path properly set
    when target is a primitive`, () => {
            // Arrange
            const target = GetRandomPrimitive();
            const path = casual.word;

            // Act
            const result = ConvertToNodeGraph(target, path);

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
            const result = ConvertToNodeGraph(target, path);

            // Assert
            expect(result.target).toBe(target);
            expect(result.path).toBe(path);
        });

    it(`sould retrieve node with its target and path properly set
    when target is a reference to an array`, () => {
            // Arrange
            const target: Array<any> = [];
            const path = casual.word;

            // Act
            const result = ConvertToNodeGraph(target, path);

            // Assert
            expect(result.target).toBe(target);
            expect(result.path).toBe(path);
        });

    it(`sould retrieve node with no children
    when target is a primitive`, () => {
            // Arrange
            const target = GetRandomPrimitive();

            // Act
            const result = ConvertToNodeGraph(target);

            // Assert
            expect(result.children).toEqual({});
        });

    it(`sould retrieve node with no children
    when target is a reference to an empty object`, () => {
            // Arrange
            const target = {};

            // Act
            const result = ConvertToNodeGraph(target);

            // Assert
            expect(result.children).toEqual({});
        });

    it(`sould retrieve node with no children
    when target is a reference to an empty array`, () => {
            // Arrange
            const target: Array<any> = [];

            // Act
            const result = ConvertToNodeGraph(target);

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
                .map(name => ({ name: name, value: GetRandomPrimitive() }));
            const target = randomProperties.reduce((obj, property) => Object.assign(obj, {
                [property.name]: property.value
            }), {});

            // Act
            const result = ConvertToNodeGraph(target);

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
                .map(() => GetRandomPrimitive());

            // Act
            const result = ConvertToNodeGraph(target);

            // Assert
            const targetStringKeys = Object.keys(target).sort();
            const childrenKeys = Object.keys(result.children).sort();
            expect(childrenKeys).toEqual(targetStringKeys);
            const childrenTargets = childrenKeys.map(key => result.children[key].target);
            expect(childrenTargets).toEqual(targetStringKeys.map(key => target[parseInt(key)]));
        })

    it(`sould retrieve node with its descendants properly set in cascade
    when target is a reference to an object being a tree of primitives and objects`, () => {
            // Arrange
            const target = {
                [casual.word]: GetRandomPrimitive(),
                [casual.word]: {
                    [casual.word]: GetRandomPrimitive()
                },
                [casual.word]: {
                    [casual.word]: GetRandomPrimitive(),
                    [casual.word]: {
                        [casual.word]: GetRandomPrimitive()
                    }
                },
                [casual.word]: {
                    [casual.word]: GetRandomPrimitive(),
                    [casual.word]: {
                        [casual.word]: GetRandomPrimitive(),
                        [casual.word]: {
                            [casual.word]: GetRandomPrimitive()
                        }
                    }
                }
            }
            const expected = new Node('', target);
            expected.children =
                Object.keys(target).reduce((children, key) =>
                    Object.assign(children, { [key]: ConvertToNodeGraph(target[key], `/${key}`) })
                    , {});


            // Act
            const result = ConvertToNodeGraph(target);

            // Assert
            expect(result).toEqual(expected);
        });

    it(`sould retrieve node with its descendants properly set in cascade
    when target is a reference to an array being a tree of primitives and arrays`, () => {
            // Arrange
            const target = [
                GetRandomPrimitive(),
                [
                    GetRandomPrimitive()
                ],
                [
                    GetRandomPrimitive(),
                    [
                        GetRandomPrimitive()
                    ]
                ],
                [
                    GetRandomPrimitive(),
                    [
                        GetRandomPrimitive(),
                        [
                            GetRandomPrimitive()
                        ]
                    ]
                ]
            ];
            const expected = new Node('', target);
            expected.children =
                Object.keys(target).reduce((children, key) =>
                    Object.assign(children, { [key]: ConvertToNodeGraph(target[parseInt(key)], `/${key}`) })
                    , {});

            // Act
            const result = ConvertToNodeGraph(target);

            // Assert
            expect(result).toEqual(expected);
        });

    it(`sould retrieve node with its descendants properly set in cascade
    when target is a reference to an object being a tree of mixed types`, () => {
            // Arrange
            const target = {
                [casual.word]: GetRandomPrimitive(),
                [casual.word]: [
                    GetRandomPrimitive()
                ],
                [casual.word]: {
                    [casual.word]: GetRandomPrimitive(),
                    [casual.word]: [
                        GetRandomPrimitive()
                    ]
                },
                [casual.word]: [
                    GetRandomPrimitive(),
                    {
                        [casual.word]: GetRandomPrimitive(),
                        [casual.word]: [
                            GetRandomPrimitive()
                        ]
                    }
                ]
            }
            const expected = new Node('', target);
            expected.children =
                Object.keys(target).reduce((children, key) =>
                    Object.assign(children, { [key]: ConvertToNodeGraph(target[key], `/${key}`) })
                    , {});


            // Act
            const result = ConvertToNodeGraph(target);

            // Assert
            expect(result).toEqual(expected);
        });

    it(`sould properly set shortestPathNodes
    when target is a reference to an object being a tree of mixed types wihtouth cycles`, () => {
            // Arrange
            const shortestPathNodes: ReferenceToNode = new WeakMap<any, Node>();
            const target = {
                [casual.word]: GetRandomPrimitive(),
                [casual.word]: [
                    GetRandomPrimitive()
                ],
                [casual.word]: {
                    [casual.word]: GetRandomPrimitive(),
                    [casual.word]: [
                        GetRandomPrimitive()
                    ]
                },
                [casual.word]: [
                    GetRandomPrimitive(),
                    {
                        [casual.word]: GetRandomPrimitive(),
                        [casual.word]: [
                            GetRandomPrimitive()
                        ]
                    }
                ]
            }

            // Act
            const result = ConvertToNodeGraph(target, '', shortestPathNodes);

            // Assert
            const targetToNode = function (node: Node): Array<any> {
                const children = node.children;
                return Object.keys(children).reduce(
                    (associations, key) => associations.concat(targetToNode(children[key])),
                    node.target != null && typeof (node.target) === 'object'
                        ? [{ target: node.target, node: node }]
                        : []
                );
            };

            targetToNode(result).forEach(({ target, node }) => {
                expect(shortestPathNodes.get(target)).toBe(node);
            });
        });

    it(`sould properly set shortestPathNodes
    when target is a reference to an object being a tree of mixed types with cycles`, () => {
            // Arrange
            const shortestPathNodes: ReferenceToNode = new WeakMap<any, Node>();
            const target: any = {
                a: GetRandomPrimitive(),
                b: [
                    GetRandomPrimitive()
                ],
                c: {
                    a: GetRandomPrimitive(),
                    b: [
                        GetRandomPrimitive()
                    ]
                }
            }
            target.d = target;
            target.e = target.b;
            target.f = target.c.b;

            // Act
            const result = ConvertToNodeGraph(target, '', shortestPathNodes);

            // Assert
            const targetToNodes = [
                { target: target.b, node: result.children.b },
                { target: target.f, node: result.children.f },

                { target: target.d, node: result },
                { target: target.e, node: result.children.b },
                { target: target.c.b, node: result.children.f },
            ]

            targetToNodes.forEach(({ target, node }) => {
                expect(shortestPathNodes.get(target)).toBe(node);
            });
        });

    it(`sould only include descedants for references with no know previous shorter path 
    when the tree gets traversed in pre-order`, () => {
            // Arrange
            const shortestPathNodes: ReferenceToNode = new WeakMap<any, Node>();
            const referenceRepeated = {
                propery: 'value'
            };
            const shorterPath = 'a';
            const longerPath =  'aa';
            const longestPath = 'aaa';
            const target: any = {
                [longerPath]: referenceRepeated,
                [shorterPath]: referenceRepeated,
                [longestPath]: referenceRepeated
            }

            // Act
            const result = ConvertToNodeGraph(target, '', shortestPathNodes);

            // Assert
            expect(result.children[longerPath].children).not.toEqual({});
            expect(result.children[shorterPath].children).not.toEqual({});
            expect(result.children[longestPath].children).toEqual({});
        });
});