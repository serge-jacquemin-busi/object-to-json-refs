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
        // Assert
        expect(result).toEqual(expected);
    });
});
describe(`[Integration Test]
JsonRefReadyToObject`, () => {
    it(`should convert primitive unchanged`, () => {
        //  Arrange
        const primitive = casual_util_1.GetRandomPrimitive();
        // Act
        const result = index_1.JsonRefReadyToObject(primitive);
        // Arrabe
        expect(result).toBe(primitive);
    });
    it(`should convert empty object equivalent to itself`, () => {
        //  Arrange
        const object = {};
        // Act
        const result = index_1.JsonRefReadyToObject(object);
        // Arrabe
        expect(result).toEqual(object);
    });
    it(`should convert empty array equivalent to itself`, () => {
        //  Arrange
        const array = [];
        // Act
        const result = index_1.JsonRefReadyToObject(array);
        // Arrabe
        expect(result).toEqual(array);
    });
    it(`should convert object tree with no $ref equivalent to itself`, () => {
        //  Arrange
        const object = {
            [casual.word]: [casual_util_1.GetRandomPrimitive()],
            [casual.word]: {
                [casual.word]: casual_util_1.GetRandomPrimitive()
            }
        };
        // Act
        const result = index_1.JsonRefReadyToObject(object);
        // Arrabe
        expect(result).toEqual(object);
    });
    it(`should convert array with no $ref equivalent to itself`, () => {
        //  Arrange
        const array = [
            [casual_util_1.GetRandomPrimitive()],
            {
                [casual.word]: casual_util_1.GetRandomPrimitive()
            }
        ];
        // Act
        const result = index_1.JsonRefReadyToObject(array);
        // Arrabe
        expect(result).toEqual(array);
    });
    it(`should convert object tree with one $ref properly
    when $ref appears after actual reference`, () => {
        //  Arrange
        const propertyForRef = casual.word;
        const propertyToRef = casual.word;
        const object = {
            [propertyForRef]: [casual_util_1.GetRandomPrimitive()],
            [propertyToRef]: {
                $ref: `/${propertyForRef}`
            },
        };
        // Act
        const result = index_1.JsonRefReadyToObject(object);
        // Arrabe
        expect(Object.getOwnPropertyNames(result)).toEqual(Object.getOwnPropertyNames(object));
        expect(result[propertyForRef]).toEqual(object[propertyForRef]);
        expect(result[propertyToRef]).toBe(result[propertyForRef]);
    });
    it(`should convert object tree with one $ref properly
    when $ref appears before actual reference`, () => {
        //  Arrange
        const propertyForRef = casual.word;
        const propertyToRef = casual.word;
        const object = {
            [propertyToRef]: {
                $ref: `/${propertyForRef}`
            },
            [propertyForRef]: [casual_util_1.GetRandomPrimitive()]
        };
        // Act
        const result = index_1.JsonRefReadyToObject(object);
        // Arrabe
        expect(Object.getOwnPropertyNames(result)).toEqual(Object.getOwnPropertyNames(object));
        expect(result[propertyForRef]).toEqual(object[propertyForRef]);
        expect(result[propertyToRef]).toBe(result[propertyForRef]);
    });
});
describe(`[Integration Test]
ConvertToJsonRefsReady / JsonRefReadyToObject`, () => {
    it(`should be symetric`, () => {
        // Arrange
        const obj = {
            a: {},
            b: [0, 1, 2, {}],
            c: {}
        };
        obj.a.b = obj.b;
        obj.b[3].a = obj.a;
        obj.c.obj = obj;
        // Act
        const convertion = index_1.ConvertToJsonRefsReady(obj);
        const andBack = index_1.JsonRefReadyToObject(convertion);
        // Assert
        expect(andBack).toEqual(obj);
    });
});
//# sourceMappingURL=index.spec.js.map