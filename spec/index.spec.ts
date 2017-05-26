import { ConvertToJsonRefsReady } from '../src/index'
import { GetRandomPrimitive } from './util/casual-util';
import * as casual from 'casual';

describe(`[Integration Test]
ConvertToJsonRefsReady`, () => {
    it('should properly convert an object', () => {
        // Arrange
        const firstProperty = casual.word;
        const obj = {
            [firstProperty]: GetRandomPrimitive()
        };
    });
});