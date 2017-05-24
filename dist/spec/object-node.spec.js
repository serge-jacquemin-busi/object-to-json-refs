"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_node_1 = require("../src/object-node");
describe('ClosestFromRoot', () => {
    it('should return 0 when wholePath is identical', () => {
        // Arrange
        const wholePath = Math.random().toString();
        const a = new object_node_1.Node(wholePath, {});
        const b = new object_node_1.Node(wholePath, {});
        // Act
        const result = object_node_1.ClosestFromRoot(a, b);
        // Assert
        expect(result).toBe(0);
    });
    it(`should return negative number when wholePath of first argument is shorter than second argument's one`, () => {
        // Arrange
        const greaterLength = 1 + Math.floor(Math.random() * 10);
        const lesserLength = Math.floor(Math.random() * greaterLength);
        const a = new object_node_1.Node('x'.repeat(lesserLength), {});
        const b = new object_node_1.Node('x'.repeat(greaterLength), {});
        // Act
        const result = object_node_1.ClosestFromRoot(a, b);
        // Assert
        expect(result).toBeLessThan(0);
    });
    it(`should return positive number when wholePath of first argument is greater than second argument's one`, () => {
        // Arrange
        const greaterLength = 1 + Math.floor(Math.random() * 10);
        const lesserLength = Math.floor(Math.random() * greaterLength);
        const a = new object_node_1.Node('x'.repeat(greaterLength), {});
        const b = new object_node_1.Node('x'.repeat(lesserLength), {});
        // Act
        const result = object_node_1.ClosestFromRoot(a, b);
        // Assert
        expect(result).toBeGreaterThan(0);
    });
    it(`should return negative number when wholePath of arguments are of same length but first'one is alphabetically before second argument's one`, () => {
        // Arrange
        const prefix = Math.random().toString();
        const a = new object_node_1.Node(`${prefix}A`, {});
        const b = new object_node_1.Node(`${prefix}Z`, {});
        // Act
        const result = object_node_1.ClosestFromRoot(a, b);
        // Assert
        expect(result).toBeLessThan(0);
    });
    it(`should return positive number when wholePath of arguments are of same length but first'one is alphabetically after second argument's one`, () => {
        // Arrange
        const prefix = Math.random().toString();
        const a = new object_node_1.Node(`${prefix}Z`, {});
        const b = new object_node_1.Node(`${prefix}A`, {});
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
        object_node_1.GetOneWithShortestPath(array);
        // Assert
        expect(arraySpy).toHaveBeenCalledWith((object_node_1.ClosestFromRoot));
    });
    it('should return first element after sort', () => {
        // Arrange
        const unsortedArray = new Array(10)
            .fill(null)
            .map(() => ({
            path: Math.random().toString(),
            target: {}
        }));
        const arraySpy = spyOn(unsortedArray, 'sort').and.returnValue(unsortedArray);
        // Act
        const result = object_node_1.GetOneWithShortestPath(unsortedArray);
        // Assert
        expect(result).toBe(unsortedArray[0]);
    });
});
//# sourceMappingURL=object-node.spec.js.map