import { Node } from '../src/models/node';
import { ClosestFromRoot, GetOneWithShortestPath } from '../src/node-util';

describe('ClosestFromRoot', () => {
    it('should return 0 when wholePath is identical', () => {
        // Arrange
        const wholePath = Math.random().toString();
        const a = new Node(wholePath, {});
        const b = new Node(wholePath, {});
        
        // Act
        const result = ClosestFromRoot(a, b);

        // Assert
        expect(result).toBe(0);
    });

    it(`should return negative number when wholePath of first argument is shorter than second argument's one`, () => {
        // Arrange
        const greaterLength = 1 + Math.floor(Math.random() * 10);
        const lesserLength = Math.floor(Math.random() * greaterLength);
        const a = new Node('x'.repeat(lesserLength), {});
        const b = new Node('x'.repeat(greaterLength), {});        
        
        // Act
        const result = ClosestFromRoot(a, b);

        // Assert
        expect(result).toBeLessThan(0);
    });

    it(`should return positive number when wholePath of first argument is greater than second argument's one`, () => {
        // Arrange
        const greaterLength = 1 + Math.floor(Math.random() * 10);
        const lesserLength = Math.floor(Math.random() * greaterLength);
        const a = new Node('x'.repeat(greaterLength), {});
        const b = new Node('x'.repeat(lesserLength), {});        
        
        // Act
        const result = ClosestFromRoot(a, b);

        // Assert
        expect(result).toBeGreaterThan(0);
    });

    it(`should return negative number when wholePath of arguments are of same length but first'one is alphabetically before second argument's one`, () => {
        // Arrange
        const prefix = Math.random().toString();
        const a = new Node(`${prefix}A`, {});
        const b = new Node(`${prefix}Z`, {});        
        
        // Act
        const result = ClosestFromRoot(a, b);

        // Assert
        expect(result).toBeLessThan(0);
    });

    it(`should return positive number when wholePath of arguments are of same length but first'one is alphabetically after second argument's one`, () => {
        // Arrange
        const prefix = Math.random().toString();
        const a = new Node(`${prefix}Z`, {});
        const b = new Node(`${prefix}A`, {});        
        
        // Act
        const result = ClosestFromRoot(a, b);

        // Assert
        expect(result).toBeGreaterThan(0);
    });
});

describe('GetClosestFromRoot', () => {
    it('should call sort with the right function', () => {
        // Arrange
        const array: Array<Node> = [];
        const arraySpy = spyOn(array, 'sort').and.returnValue(array);
        
        // Act
        GetOneWithShortestPath(array);

        // Assert
        expect(arraySpy).toHaveBeenCalledWith((ClosestFromRoot));
    });

    it('should return first element after sort', () => {
        // Arrange
        const unsortedArray: Array<Node> = new Array(10)
            .fill(null)
            .map(() => ({
                path: Math.random().toString(),
                target: {}
            } as Node));
        const arraySpy = spyOn(unsortedArray, 'sort').and.returnValue(unsortedArray);
        
        // Act
        const result = GetOneWithShortestPath(unsortedArray);

        // Assert
        expect(result).toBe(unsortedArray[0]);
    });    
});