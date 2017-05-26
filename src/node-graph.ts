import { Node, GetOneWithShortestPath } from './object-node';

export type ReferenceToNode = WeakMap<any, Node>;

export function ConvertToNodeGraph(
    obj: any,
    path: string = '',
    shortestPathNodes: ReferenceToNode = new WeakMap<any, Node>(),
): Node {
    const node = new Node(path, obj);

    if (obj == null || typeof (obj) !== 'object') {
        return node;
    }

    const knowReference = shortestPathNodes.has(obj);
    ChallengeShortestPathNode(node, shortestPathNodes);

    if (knowReference) {
        return node;
    }

    for (let property of Object.keys(obj)) {
        node.children[property] = ConvertToNodeGraph(obj[property], `${path}/${property}`, shortestPathNodes);
    }

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
function ChallengeShortestPathNode(node: Node, shortestPathNode: ReferenceToNode): any {
    const existingNode = shortestPathNode.get(node.target);

    if (typeof (existingNode) === 'undefined') {
        shortestPathNode.set(node.target, node);
        return node;
    }

    const closestFromRoot = GetOneWithShortestPath([node, existingNode]);
    shortestPathNode.set(node.target, closestFromRoot);
    return closestFromRoot;
}