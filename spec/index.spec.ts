import { ConvertToJsonRefsReady } from '../src/index'
import { GetRandomPrimitive } from './util/casual-util';
import * as casual from 'casual';

describe(`[Integration Test]
ConvertToJsonRefsReady`, () => {
    it('should properly convert an object', () => {
        // Arrange
        const firstProperty = casual.word;
        const obj: any = {
            [firstProperty]: GetRandomPrimitive(),
            _a: {
                _a: GetRandomPrimitive()
            },
            _b: [
                GetRandomPrimitive(),
                GetRandomPrimitive()
            ]
        };
        obj._c = { obj: obj, _a: obj._a };
        const expected = {
            [firstProperty]: obj[firstProperty],
            _a: {
                _a: obj._a._a
            },
            _b: [
                obj._b[0],
                obj._b[1]
            ],
            _c: {
                obj: { $ref: '' },
                _a: { $ref: '/_a' }
            }
        }


        // Act
        const result = ConvertToJsonRefsReady(obj);

        console.log(obj);
        console.log(result);
        

        // Assert
        expect(result).toEqual(expected);
    });
});

describe(`[Sample]
ConvertToJsonRefsReady`, () => {
    it('should properly convert an object', () => {
        const obj: any = {
            fruit: {
                name: 'banana'
            },
            vegetable: {
                color: 'green',
                rating: {
                    value: 3,
                    max: 5
                },
                name: 'Cumcumber'
            },
            celebrities: [
                { name: 'Robert Travolta' },
                { name: 'Jhon De Niro' }
            ]
        };
        obj.fruit.favoriteCelebrity = obj.celebrities[1];
        obj.robert = obj.celebrities[0];
        obj.knownRatings = [ obj.vegetable.rating ];

        const result = ConvertToJsonRefsReady(obj);
        console.log(result);
    });
});