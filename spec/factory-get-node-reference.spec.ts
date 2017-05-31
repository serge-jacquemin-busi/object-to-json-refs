import { IGetNodeReference } from '../src/models/get-node-reference';
import { FactoryGetNodeReference } from '../src/factory-get-node-reference';
import { Node } from '../src/models/node';
import { ReferenceToNode } from '../src/convert-to-node-graph';
import { NodeToObject } from '../src/node-to-object';
import { primitives, GetRandomPrimitive } from './util/casual-util';
import * as casual from 'casual';


const stringify = JSON.stringify;

describe('FactoryGetNodeReference(...)', () => {
    let shortestPathNodes: ReferenceToNode;
    let method: IGetNodeReference;

    beforeEach(() => {
        shortestPathNodes = new WeakMap<any, Node>();
        method = FactoryGetNodeReference(shortestPathNodes);
    })

    it(`should return null
    when value is a primitive`,
        () => {
            // Arrange
            const primitive = GetRandomPrimitive();

            // Act
            const result = method(primitive);

            // Assert
            expect(result).toBeNull();
        });

    it(`should throw
    when value is a reference
    and value isn't a key of shortestPathNode`,
        () => {
            // Arrange
            const reference = {};

            // Act
            const result = () => method(reference);

            // Assert
            expect(result).toThrow();
        });

    it(`should return node with the shortest path
    when value is a reference
    and value is a key of shortestPathNode`,
        () => {
            // Arrange
            const reference = {};
            const shortestPathNode = new Node(casual.word, reference);
            shortestPathNodes.set(reference, shortestPathNode);

            // Act
            const result = method(reference);

            // Assert
            expect(result).toEqual(shortestPathNode);
        });
});