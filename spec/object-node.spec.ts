import { NodeObject, ClosestFromRoot, GetClosestFromRoot } from '../src/object-node';

describe('ClosestFromRoot', () => {
    it('should return 0 when wholePath is identical', () => {
        // Arrange
        const wholePath = Math.random().toString();
        const a = new NodeObject(wholePath, {});
        const b = new NodeObject(wholePath, {});
        
        // Act
        const result = ClosestFromRoot(a, b);

        // Assert
        expect(result).toBe(0);
    });

    it(`should return negative number when wholePath of first argument is shorter than second argument's one`, () => {
        // Arrange
        const greaterLength = 1 + Math.floor(Math.random() * 10);
        const lesserLength = Math.floor(Math.random() * greaterLength);
        const a = new NodeObject('x'.repeat(lesserLength), {});
        const b = new NodeObject('x'.repeat(greaterLength), {});        
        
        // Act
        const result = ClosestFromRoot(a, b);

        // Assert
        expect(result).toBeLessThan(0);
    });

    it(`should return positive number when wholePath of first argument is greater than second argument's one`, () => {
        // Arrange
        const greaterLength = 1 + Math.floor(Math.random() * 10);
        const lesserLength = Math.floor(Math.random() * greaterLength);
        const a = new NodeObject('x'.repeat(greaterLength), {});
        const b = new NodeObject('x'.repeat(lesserLength), {});        
        
        // Act
        const result = ClosestFromRoot(a, b);

        // Assert
        expect(result).toBeGreaterThan(0);
    });

    it(`should return negative number when wholePath of arguments are of same length but first'one is alphabetically before second argument's one`, () => {
        // Arrange
        const prefix = Math.random().toString();
        const a = new NodeObject(`${prefix}A`, {});
        const b = new NodeObject(`${prefix}Z`, {});        
        
        // Act
        const result = ClosestFromRoot(a, b);

        // Assert
        expect(result).toBeLessThan(0);
    });

    it(`should return positive number when wholePath of arguments are of same length but first'one is alphabetically after second argument's one`, () => {
        // Arrange
        const prefix = Math.random().toString();
        const a = new NodeObject(`${prefix}Z`, {});
        const b = new NodeObject(`${prefix}A`, {});        
        
        // Act
        const result = ClosestFromRoot(a, b);

        // Assert
        expect(result).toBeGreaterThan(0);
    });
});

describe('GetClosestFromRoot', () => {
    it('should call sort with the right function', () => {
        // Arrange
        const array: Array<NodeObject> = [];
        const arraySpy = spyOn(array, 'sort').and.returnValue(array);
        
        // Act
        GetClosestFromRoot(array);

        // Assert
        expect(arraySpy).toHaveBeenCalledWith((ClosestFromRoot));
    });

    it('should return first element after sort', () => {
        // Arrange
        const unsortedArray: Array<NodeObject> = new Array(10)
            .fill(null)
            .map(() => ({
                wholePath: Math.random().toString(),
                sourceReference: {}
            } as NodeObject));
        const arraySpy = spyOn(unsortedArray, 'sort').and.returnValue(unsortedArray);
        
        // Act
        const result = GetClosestFromRoot(unsortedArray);

        // Assert
        expect(result).toBe(unsortedArray[0]);
    });    
});