"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_util_1 = require("./type-util");
function NodeToObject(node, getNodeReference = () => null, treatedNodes = new WeakMap(), nodeToObject = NodeToObject) {
    if (treatedNodes.has(node)) {
        return treatedNodes.get(node);
    }
    if (type_util_1.IsPrimitive(node.target)) {
        treatedNodes.set(node, node.target);
        return node.target;
    }
    const nodeReference = getNodeReference(node.target);
    if (nodeReference && nodeReference !== node) {
        return { $ref: nodeReference.path };
    }
    const returnValue = Array.isArray(node.target) ? [] : {};
    treatedNodes.set(node, returnValue);
    for (let property in node.children) {
        returnValue[property] = nodeToObject(node.children[property], getNodeReference, treatedNodes, nodeToObject);
    }
    return returnValue;
}
exports.NodeToObject = NodeToObject;
//# sourceMappingURL=node-to-object.js.map