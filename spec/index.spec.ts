import { ConvertToJsonRefsReady, JsonRefReadyToObject } from '../src/index'
import { GetRandomPrimitive } from './util/casual-util';
import { ConvertToNodeGraph, ReferenceToNode } from '../src/convert-to-node-graph';
import { Node } from '../src/models/node';
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

        // Assert
        expect(result).toEqual(expected);
    });
});


describe(`[Integration Test]
JsonRefReadyToObject`, () => {
    it(`should convert primitive unchanged`, () => {
        //  Arrange
        const primitive = GetRandomPrimitive();

        // Act
        const result = JsonRefReadyToObject(primitive);

        // Arrabe
        expect(result).toBe(primitive);
    });

    it(`should convert empty object equivalent to itself`, () => {
        //  Arrange
        const object = {};

        // Act
        const result = JsonRefReadyToObject(object);

        // Arrabe
        expect(result).toEqual(object);
    });

    it(`should convert empty array equivalent to itself`, () => {
        //  Arrange
        const array: Array<any> = [];

        // Act
        const result = JsonRefReadyToObject(array);

        // Arrabe
        expect(result).toEqual(array);
    });

    it(`should convert object tree with no $ref equivalent to itself`, () => {
        //  Arrange
        const object = {
            [casual.word]: [ GetRandomPrimitive() ],
            [casual.word]: {
                [casual.word]: GetRandomPrimitive()
            }
        };

        // Act
        const result = JsonRefReadyToObject(object);

        // Arrabe
        expect(result).toEqual(object);
    });

    it(`should convert array with no $ref equivalent to itself`, () => {
        //  Arrange
        const array: Array<any> = [
            [ GetRandomPrimitive() ],
            {
                [casual.word]: GetRandomPrimitive()
            }
        ];

        // Act
        const result = JsonRefReadyToObject(array);

        // Arrabe
        expect(result).toEqual(array);
    });

    it(`should convert object tree with one $ref properly
    when $ref appears after actual reference`, () => {
        //  Arrange
        const propertyForRef = casual.word;
        const propertyToRef = casual.word;
        const object = {
            [propertyForRef]: [ GetRandomPrimitive() ],
            [propertyToRef]: {
                $ref: `/${propertyForRef}`
            },
        };

        // Act
        const result = JsonRefReadyToObject(object);

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
            [propertyForRef]: [ GetRandomPrimitive() ]
        };

        // Act
        const result = JsonRefReadyToObject(object);

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
        const obj: any = {
            a: {},
            b: [0, 1, 2, {}],
            c: {}
        }
        obj.a.b = obj.b;
        obj.b[3].a = obj.a;
        obj.c.obj = obj;

        // Act
        const convertion = ConvertToJsonRefsReady(obj);
        const andBack = JsonRefReadyToObject(convertion);

        // Assert
        expect(andBack).toEqual(obj);
    });
});