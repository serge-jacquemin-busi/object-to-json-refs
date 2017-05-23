import { ConvertToJsonRefsReady } from '../src/index';

describe('ConvertToJsonRefsReady', () => {
    [
        true,
        false,
        0,
        Math.random(),
        '',
        `${Math.random()}`
    ].forEach(element => {
        it(`should return primitives unchanged: ${element}`, () => {
            // Arrange

            // Act
            const result = ConvertToJsonRefsReady(element);

            // Assert
            expect(result).toBe(element);
        })
    });

    [
        { a: true },
        { a: { b: true }},
        { a: true, b: { c: true }},
        { a: [1, 2, 3]},
        { a: { b: [1, 2, 3]}},
        { a: [1, 2, 3], b: { c: [1, 2, 3] }},
    ].forEach(obj => {
        it(`should return object with no cycles unchanged: ${obj}`, () => {
            // Arrange

            // Act
            const result = ConvertToJsonRefsReady(obj);

            // Assert
            expect(result).toBe(obj);
        })
    });

    [
        [(() => {
            const a: any = {};
            a['b'] = a;
            return a;
        })(), {b: { $ref: "" }}],
        [(() => {
            const a: any = {b: {}};
            a.b['c'] = a.b;
            return a;
        })(), {a: {b: { $ref: "/b" }}}],        
    ].forEach(([obj, expected]) => {
        it(`should return object with simple cycle changed approprietly: ${obj}`, () => {
            // Arrange

            // Act
            const result = ConvertToJsonRefsReady(obj);

            // Assert
            expect(result).toBe(expected);
        })
    });
    
});