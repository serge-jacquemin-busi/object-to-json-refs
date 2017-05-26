"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_node_1 = require("./object-node");
/**
 * Convert q target into a Node (tree) using argument path as its root path
 * and argument shortestPathNodes as its shortestPathNodes
 *
 * @export
 * @param {*} obj
 * @param {string} [path='']
 * @param {ReferenceToNode} [shortestPathNodes=new WeakMap<any, Node>()]
 * @returns {Node}
 */
function ConvertToNodeGraph(obj, path = '', shortestPathNodes = new WeakMap()) {
    const node = new object_node_1.Node(path, obj);
    if (obj == null || typeof (obj) !== 'object') {
        return node;
    }
    const isShortestPathNode = ChallengeShortestPathNode(node, shortestPathNodes);
    if (!isShortestPathNode) {
        return node;
    }
    for (let property of Object.keys(obj)) {
        node.children[property] = ConvertToNodeGraph(obj[property], `${path}/${property}`, shortestPathNodes);
    }
    return node;
}
exports.ConvertToNodeGraph = ConvertToNodeGraph;
/**
 * Determine if the node has the shortest know path associated with its target
 * and, if so, store it in shortestPathNode
 *
 * Returns true if the node is the one having shortest know path, false otherwise
 *
 * @param {ObjectNode} node
 * @param {NodeWeakMap} knownNodes
 * @returns {*}
 */
function ChallengeShortestPathNode(node, shortestPathNode) {
    const existingNode = shortestPathNode.get(node.target);
    if (typeof (existingNode) === 'undefined') {
        shortestPathNode.set(node.target, node);
        return true;
    }
    const closestFromRoot = object_node_1.GetOneWithShortestPath([node, existingNode]);
    if (closestFromRoot === node) {
        shortestPathNode.set(node.target, closestFromRoot);
        return true;
    }
    return false;
}
//# sourceMappingURL=node-graph.js.map