"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/index");
const casual_util_1 = require("./util/casual-util");
const casual = require("casual");
describe(`[Integration Test]
ConvertToJsonRefsReady`, () => {
    it('should properly convert an object', () => {
        // Arrange
        const firstProperty = casual.word;
        const obj = {
            [firstProperty]: casual_util_1.GetRandomPrimitive(),
            _a: {
                _a: casual_util_1.GetRandomPrimitive()
            },
            _b: [
                casual_util_1.GetRandomPrimitive(),
                casual_util_1.GetRandomPrimitive()
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
        };
        // Act
        const result = index_1.ConvertToJsonRefsReady(obj);
        console.log(obj);
        console.log(result);
        // Assert
        expect(result).toEqual(expected);
    });
});
describe(`[Sample]
ConvertToJsonRefsReady`, () => {
    it('should properly convert an object', () => {
        const obj = {
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
        obj.knownRatings = [obj.vegetable.rating];
        const result = index_1.ConvertToJsonRefsReady(obj);
        console.log(result);
    });
});
//# sourceMappingURL=index.spec.js.map