"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_node_1 = require("./object-node");
function ConvertToJsonRefsReady(obj) {
    return obj;
}
exports.ConvertToJsonRefsReady = ConvertToJsonRefsReady;
function convertToJsonRefsReady(node, knownNodes) {
    if (node.realValue != null && typeof (node.realValue) === 'object') {
        const existingNode = knownNodes.get(node.realValue);
        if (typeof (existingNode) === 'undefined') {
            knownNodes.set(node.realValue, node);
            return node;
        }
        const closestFromRoot = object_node_1.GetClosestFromRoot([node, existingNode]);
        knownNodes.set(node.realValue, closestFromRoot);
        return closestFromRoot;
    }
    return node.realValue;
}
//# sourceMappingURL=index.js.map