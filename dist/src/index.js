"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_node_1 = require("./object-node");
function ConvertToJsonRefsReady(obj) {
    const knownNodes = new WeakMap();
    const keptNodes = {};
    const envelop = new object_node_1.NodeObject('', { content: obj });
    const root = new object_node_1.NodeObject('', obj, envelop, 'content');
    ConvertToNodeGraph(root, knownNodes, keptNodes);
    for (let uniqueId in keptNodes) {
        const keptNode = keptNodes[uniqueId];
        UseRealValueForParent(keptNode);
        MutateToRef(keptNode);
    }
    return envelop.sourceReference.content;
}
exports.ConvertToJsonRefsReady = ConvertToJsonRefsReady;
function UseRealValueForParent(node) {
    if (typeof (node.parentNode) === 'object' &&
        typeof (node.propertyOfParent) === 'string') {
        node.parentNode.sourceReference[node.propertyOfParent] = node.sourceReference;
    }
}
exports.UseRealValueForParent = UseRealValueForParent;
/**
 * Transform all node property so it only contains a $ref property
 *
 * Note: doesn't change __proto__
 *
 * @export
 * @param {ObjectNode} node
 */
function MutateToRef(node) {
    const wholePath = node.wholePath;
    const mutant = node;
    for (let prop in mutant) {
        delete mutant[prop];
    }
    mutant['$ref'] = wholePath;
}
exports.MutateToRef = MutateToRef;
function ConvertToNodeGraph(node, knownNodes, keptNodes) {
    const value = node.sourceReference;
    if (value == null || typeof (value) !== 'object') {
        return node;
    }
    const wasUnknown = !knownNodes.has(value);
    const bestKnowNode = challengeKnowNodes(node, knownNodes);
    if (wasUnknown) {
        const properties = Object.getOwnPropertyNames(value)
            .filter(prop => !Array.isArray(value) || prop !== 'length');
        properties.forEach(prop => {
            const childNode = new object_node_1.NodeObject(`${node.wholePath}/${prop}`, value[prop], node, prop);
            value[prop] = ConvertToNodeGraph(childNode, knownNodes, keptNodes);
        });
        return node;
    }
    if (bestKnowNode !== node) {
        delete keptNodes[node.uniqueId];
        keptNodes[bestKnowNode.uniqueId] = bestKnowNode;
        return bestKnowNode;
    }
    return node;
}
exports.ConvertToNodeGraph = ConvertToNodeGraph;
/**
 * Determine if the node is the best match to keep compared to the already known nodes
 *
 * Stores and returns the best match
 *
 * @param {ObjectNode} node
 * @param {NodeWeakMap} knownNodes
 * @returns {*}
 */
function challengeKnowNodes(node, knownNodes) {
    const existingNode = knownNodes.get(node.sourceReference);
    if (typeof (existingNode) === 'undefined') {
        knownNodes.set(node.sourceReference, node);
        return node;
    }
    const closestFromRoot = object_node_1.GetClosestFromRoot([node, existingNode]);
    knownNodes.set(node.sourceReference, closestFromRoot);
    return closestFromRoot;
}
//# sourceMappingURL=index.js.map