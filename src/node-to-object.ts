import { IGetNodeReference } from './models/get-node-reference';
import { Node } from './models/node';
import { IsPrimitive } from './type-util';

export type NodeToReference = WeakMap<Node, any>;

export interface INodeToObject {
    (
        node: Node,
        getNodeReference: IGetNodeReference,
        treatedNodes: NodeToReference,
        nodeToObject: INodeToObject
    ): any;
}

export function NodeToObject(
    node: Node,
    getNodeReference: IGetNodeReference = () => null,
    treatedNodes: NodeToReference =  new WeakMap<Node, any>(),
    nodeToObject: INodeToObject = NodeToObject
): any {
    if (treatedNodes.has(node)) {
        return treatedNodes.get(node);
    }

    if (IsPrimitive(node.target)) {
        treatedNodes.set(node, node.target);
        return node.target;
    }    

    const nodeReference = getNodeReference(node.target);
    if (nodeReference && nodeReference !== node) {
        return { $ref: nodeReference.path };
    }

    const returnValue: any = Array.isArray(node.target) ? [] : {};

    treatedNodes.set(node, returnValue);

    for (let property in node.children) {
        returnValue[property] = nodeToObject(node.children[property], getNodeReference, treatedNodes, nodeToObject);
    }

    return returnValue;
}