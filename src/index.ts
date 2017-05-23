import { ObjectNode, GetClosestFromRoot } from './object-node';

export function ConvertToJsonRefsReady(obj: any): any {
    return obj;
}

function convertToJsonRefsReady(node: ObjectNode, knownNodes: WeakMap<any, ObjectNode>): any {
    if (node.realValue != null && typeof(node.realValue) === 'object') {
        const existingNode = knownNodes.get(node.realValue);

        if (typeof(existingNode) === 'undefined') {
            knownNodes.set(node.realValue, node);
            return node;
        }

        const closestFromRoot = GetClosestFromRoot([node, existingNode]);
        knownNodes.set(node.realValue, closestFromRoot);
        return closestFromRoot;
    }

    return node.realValue;
}