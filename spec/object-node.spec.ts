import { ObjectNode, ClosestFromRoot, GetClosestFromRoot } from '../src/object-node';

describe('ClosestFromRoot', () => {
    it('should return 0 when wholePath is identical', () => {
        // Arrange
        const wholePath = Math.random().toString();
        const a: ObjectNode = {
            wholePath: wholePath,
            realValue: {}
        };
        const b: ObjectNode = {
            wholePath: wholePath,
            realValue: {}
        };        
        
        // Act
        const result = ClosestFromRoot(a, b);

        // Assert
        expect(result).toBe(0);
    });

    it(`should return negative number when wholePath of first argument is shorter than second argument's one`, () => {
        // Arrange
        const greaterLength = 1 + Math.floor(Math.random() * 10);
        const lesserLength = Math.floor(Math.random() * greaterLength);
        const a: ObjectNode = {
            wholePath: 'x'.repeat(lesserLength),
            realValue: {}
        };
        const b: ObjectNode = {
            wholePath: 'x'.repeat(greaterLength),
            realValue: {}
        };        
        
        // Act
        const result = ClosestFromRoot(a, b);

        // Assert
        expect(result).toBeLessThan(0);
    });

    it(`should return positive number when wholePath of first argument is greater than second argument's one`, () => {
        // Arrange
        const greaterLength = 1 + Math.floor(Math.random() * 10);
        const lesserLength = Math.floor(Math.random() * greaterLength);
        const a: ObjectNode = {
            wholePath: 'x'.repeat(greaterLength),
            realValue: {}
        };
        const b: ObjectNode = {
            wholePath: 'x'.repeat(lesserLength),
            realValue: {}
        };        
        
        // Act
        const result = ClosestFromRoot(a, b);

        // Assert
        expect(result).toBeGreaterThan(0);
    });

    it(`should return negative number when wholePath of arguments are of same length but first'one is alphabetically before second argument's one`, () => {
        // Arrange
        const prefix = Math.random().toString();
        const a: ObjectNode = {
            wholePath: `${prefix}A`,
            realValue: {}
        };
        const b: ObjectNode = {
            wholePath: `${prefix}Z`,
            realValue: {}
        };        
        
        // Act
        const result = ClosestFromRoot(a, b);

        // Assert
        expect(result).toBeLessThan(0);
    });

    it(`should return positive number when wholePath of arguments are of same length but first'one is alphabetically after second argument's one`, () => {
        // Arrange
        const prefix = Math.random().toString();
        const a: ObjectNode = {
            wholePath: `${prefix}Z`,
            realValue: {}
        };
        const b: ObjectNode = {
            wholePath: `${prefix}A`,
            realValue: {}
        };        
        
        // Act
        const result = ClosestFromRoot(a, b);

        // Assert
        expect(result).toBeGreaterThan(0);
    });
});

describe('GetClosestFromRoot', () => {
    it('should call sort with the right function', () => {
        // Arrange
        const array: Array<ObjectNode> = [];
        const arraySpy = spyOn(array, 'sort').and.returnValue(array);
        
        // Act
        GetClosestFromRoot(array);

        // Assert
        expect(arraySpy).toHaveBeenCalledWith((ClosestFromRoot));
    });

    it('should return first element after sort', () => {
        // Arrange
        const unsortedArray: Array<ObjectNode> = new Array(10)
            .fill(null)
            .map(() => ({
                wholePath: Math.random().toString(),
                realValue: {}
            } as ObjectNode));
        const arraySpy = spyOn(unsortedArray, 'sort').and.returnValue(unsortedArray);
        
        // Act
        const result = GetClosestFromRoot(unsortedArray);

        // Assert
        expect(result).toBe(unsortedArray[0]);
    });    
});