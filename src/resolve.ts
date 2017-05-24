import { Node } from './object-node';
import { PrimitiveRepresentation, TreeRepresentation } from './tree-representation';
import { ReferenceToNode } from './node-graph';

export interface IResolve {
    (node: Node, shortestPathNodes: ReferenceToNode, resolve: IResolve): TreeRepresentation;
}
/**
 * Convert a node into the TreeRepresentation representing
 * its "JSON with references" content in the context of a tree
 * where all shortest path for non primitive references are known
 * 
 * @export
 * @returns TreeRepresentation
 */
export function Resolve(
    node: Node,
    shortestPathNodes: ReferenceToNode,
    subResolve: IResolve = Resolve
): TreeRepresentation {
    if (node.target == null || typeof (node.target) !== 'object') {
        return node.target as PrimitiveRepresentation;
    }

    const shortestPathNode = shortestPathNodes.get(node.target) as Node;
    if (typeof (shortestPathNode) === 'undefined') {
        throw new Error('Reference not found amonst shortestPathNodes');
    }

    if (node !== shortestPathNode) {
        return { $ref: shortestPathNode.path };
    }

    const returnValue: any = Array.isArray(node.target) ? [] : {};

    for (let property in node.children) {
        returnValue[property] = subResolve(node.children[property], shortestPathNodes, subResolve);
    }

    return returnValue;
}