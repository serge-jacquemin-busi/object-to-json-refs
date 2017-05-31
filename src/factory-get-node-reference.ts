import { IGetNodeReference } from './models/get-node-reference';
import { Node } from './models/node';
import { PrimitiveRepresentation, TreeRepresentation } from './models/tree-representation';
import { IsPrimitive } from './type-util';
import { ReferenceToNode } from './convert-to-node-graph';

/**
 * Returns a method which behaviour is:
 * For every non primitive target of its node sole argument,
 * assert it has a known shortest path then returns it.
 * 
 * @export
 * @param {ReferenceToNode} shortestPathNodes 
 * @returns {IGetNodeReference} 
 */
export function FactoryGetNodeReference(
    shortestPathNodes: ReferenceToNode
): IGetNodeReference {
    return (value: any) => {
        if (IsPrimitive(value)) {
            return null;
        }

        const shortestPathNode = shortestPathNodes.get(value);
        if (shortestPathNode === undefined) {
            throw new Error('ShortestPathNode not defined for target')
        }
        
        return shortestPathNode;
    }
}