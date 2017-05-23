import { NodeObject, GetClosestFromRoot } from './object-node';

type NodeWeakMap = WeakMap<any, NodeObject>;
export interface NodeDictionary {
    [uniqueId: number]: NodeObject;
}

export function ConvertToJsonRefsReady(obj: any): any {
    const knownNodes: NodeWeakMap = new WeakMap<any, NodeObject>();
    const keptNodes: NodeDictionary = {};

    const envelop = new NodeObject('', { content: obj });
    const root = new NodeObject('', obj, envelop, 'content');

    ConvertToNodeGraph(root, knownNodes, keptNodes);

    for (let uniqueId in keptNodes) {
        const keptNode = keptNodes[uniqueId];
        UseRealValueForParent(keptNode);
        MutateToRef(keptNode);
    }

    return envelop.sourceReference.content;
}

export function UseRealValueForParent(node: NodeObject): void {
    if (typeof (node.parentNode) === 'object' &&
        typeof (node.propertyOfParent) === 'string') {
        node.parentNode.sourceReference[node.propertyOfParent] = node.sourceReference;
    }
}

/**
 * Transform all node property so it only contains a $ref property
 * 
 * Note: doesn't change __proto__
 * 
 * @export
 * @param {ObjectNode} node 
 */
export function MutateToRef(node: NodeObject): void {
    const wholePath = node.wholePath;
    const mutant = node as any;

    for (let prop in mutant) {
        delete mutant[prop];
    }

    mutant['$ref'] = wholePath;
}

export function ConvertToNodeGraph(
    node: NodeObject,
    knownNodes: NodeWeakMap,
    keptNodes: NodeDictionary
): NodeObject {
    

    return node;
}

// export function ConvertToNodeGraph(
//     node: NodeObject,
//     knownNodes: NodeWeakMap,
//     keptNodes: NodeDictionary
// ): NodeObject {
//     const reference = node.sourceReference;
//     if (reference == null || typeof (reference) !== 'object') {
//         node.value = reference;
//         return node;
//     }

//     const wasUnknown = !knownNodes.has(reference);
//     const bestKnowNode = challengeKnowNodes(node, knownNodes);

//     if (wasUnknown) {
//         node.value = {};
//         const properties = Object.getOwnPropertyNames(reference)
//             .filter(prop => !Array.isArray(reference) || prop !== 'length');

//         properties.forEach(prop => {
//             const childNode = new NodeObject(
//                 `${node.wholePath}/${prop}`,
//                 reference[prop],
//                 node,
//                 prop
//             );
//             node.value[prop] = ConvertToNodeGraph(childNode, knownNodes, keptNodes);
//         });

//         return node;
//     }

//     if (bestKnowNode !== node) {
//         delete keptNodes[node.uniqueId];
//         keptNodes[bestKnowNode.uniqueId] = bestKnowNode;

//         return bestKnowNode;
//     }

//     return node;

// }


/**
 * Determine if the node is the best match to keep compared to the already known nodes
 * 
 * Stores and returns the best match
 * 
 * @param {ObjectNode} node 
 * @param {NodeWeakMap} knownNodes 
 * @returns {*} 
 */
function challengeKnowNodes(node: NodeObject, knownNodes: NodeWeakMap): any {
    const existingNode = knownNodes.get(node.sourceReference);

    if (typeof (existingNode) === 'undefined') {
        knownNodes.set(node.sourceReference, node);
        return node;
    }

    const closestFromRoot = GetClosestFromRoot([node, existingNode]);
    knownNodes.set(node.sourceReference, closestFromRoot);
    return closestFromRoot;
}