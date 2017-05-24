import { Node } from '../src/object-node';
import { ConvertToNodeGraph } from '../src/node-graph';
import { getRandomPrimitive } from './util/casual-util';

describe('ConvertToNodeGraph', () => {
    it(`sould retive single node with primitive
    when target is a primitive`, () => {
        // Arrange
        const target = getRandomPrimitive();
        const expected = new Node('', target);

        // Act
        const result = ConvertToNodeGraph(target);

        // Assert
        expect(result).toEqual(expected);
    });
});