"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_node_1 = require("../src/object-node");
describe('ClosestFromRoot', () => {
    it('should return 0 when wholePath is identical', () => {
        // Arrange
        const wholePath = Math.random().toString();
        const a = {
            wholePath: wholePath,
            realValue: {}
        };
        const b = {
            wholePath: wholePath,
            realValue: {}
        };
        // Act
        const result = object_node_1.ClosestFromRoot(a, b);
        // Assert
        expect(result).toBe(0);
    });
    it(`should return negative number when wholePath of first argument is shorter than second argument's one`, () => {
        // Arrange
        const greaterLength = 1 + Math.floor(Math.random() * 10);
        const lesserLength = Math.floor(Math.random() * greaterLength);
        const a = {
            wholePath: 'x'.repeat(lesserLength),
            realValue: {}
        };
        const b = {
            wholePath: 'x'.repeat(greaterLength),
            realValue: {}
        };
        // Act
        const result = object_node_1.ClosestFromRoot(a, b);
        // Assert
        expect(result).toBeLessThan(0);
    });
    it(`should return positive number when wholePath of first argument is greater than second argument's one`, () => {
        // Arrange
        const greaterLength = 1 + Math.floor(Math.random() * 10);
        const lesserLength = Math.floor(Math.random() * greaterLength);
        const a = {
            wholePath: 'x'.repeat(greaterLength),
            realValue: {}
        };
        const b = {
            wholePath: 'x'.repeat(lesserLength),
            realValue: {}
        };
        // Act
        const result = object_node_1.ClosestFromRoot(a, b);
        // Assert
        expect(result).toBeGreaterThan(0);
    });
    it(`should return negative number when wholePath of arguments are of same length but first'one is alphabetically before second argument's one`, () => {
        // Arrange
        const prefix = Math.random().toString();
        const a = {
            wholePath: `${prefix}A`,
            realValue: {}
        };
        const b = {
            wholePath: `${prefix}Z`,
            realValue: {}
        };
        // Act
        const result = object_node_1.ClosestFromRoot(a, b);
        // Assert
        expect(result).toBeLessThan(0);
    });
    it(`should return positive number when wholePath of arguments are of same length but first'one is alphabetically after second argument's one`, () => {
        // Arrange
        const prefix = Math.random().toString();
        const a = {
            wholePath: `${prefix}Z`,
            realValue: {}
        };
        const b = {
            wholePath: `${prefix}A`,
            realValue: {}
        };
        // Act
        const result = object_node_1.ClosestFromRoot(a, b);
        // Assert
        expect(result).toBeGreaterThan(0);
    });
});
describe('GetClosestFromRoot', () => {
    it('should call sort with the right function', () => {
        // Arrange
        const array = [];
        const arraySpy = spyOn(array, 'sort').and.returnValue(array);
        // Act
        object_node_1.GetClosestFromRoot(array);
        // Assert
        expect(arraySpy).toHaveBeenCalledWith((object_node_1.ClosestFromRoot));
    });
    it('should return first element after sort', () => {
        // Arrange
        const unsortedArray = new Array(10)
            .fill(null)
            .map(() => ({
            wholePath: Math.random().toString(),
            realValue: {}
        }));
        const arraySpy = spyOn(unsortedArray, 'sort').and.returnValue(unsortedArray);
        // Act
        const result = object_node_1.GetClosestFromRoot(unsortedArray);
        // Assert
        expect(result).toBe(unsortedArray[0]);
    });
});
//# sourceMappingURL=object-node.spec.js.map