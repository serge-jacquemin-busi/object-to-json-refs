"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../src/index");
describe('ConvertToJsonRefsReady', function () {
    [
        true,
        false,
        0,
        Math.random(),
        '',
        "" + Math.random()
    ].forEach(function (element) {
        it("should return primitives unchanged: " + element, function () {
            // Arrange
            // Act
            var result = index_1.ConvertToJsonRefsReady(element);
            // Assert
            expect(result).toBe(element);
        });
    });
    [
        { a: true },
        { a: { b: true } },
        { a: true, b: { c: true } },
        { a: [1, 2, 3] },
        { a: { b: [1, 2, 3] } },
        { a: [1, 2, 3], b: { c: [1, 2, 3] } },
    ].forEach(function (obj) {
        it("should return object with no cycles unchanged: " + obj, function () {
            // Arrange
            // Act
            var result = index_1.ConvertToJsonRefsReady(obj);
            // Assert
            expect(result).toBe(obj);
        });
    });
});
//# sourceMappingURL=index.spec.js.map