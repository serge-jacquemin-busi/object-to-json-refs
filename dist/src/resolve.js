"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Convert a node into the TreeRepresentation representing
 * its "JSON with references" content in the context of a tree
 * where all shortest path for non primitive references are known
 *
 * @export
 * @returns TreeRepresentation
 */
function Resolve(node, shortestPathNodes, subResolve = Resolve) {
    if (node.target == null || typeof (node.target) !== 'object') {
        return node.target;
    }
    const shortestPathNode = shortestPathNodes.get(node.target);
    if (typeof (shortestPathNode) === 'undefined') {
        throw new Error('Reference not found amonst shortestPathNodes');
    }
    if (node !== shortestPathNode) {
        return { $ref: shortestPathNode.path };
    }
    const returnValue = Array.isArray(node.target) ? [] : {};
    for (let property in node.children) {
        returnValue[property] = subResolve(node.children[property], shortestPathNodes, subResolve);
    }
    return returnValue;
}
exports.Resolve = Resolve;
//# sourceMappingURL=resolve.js.map