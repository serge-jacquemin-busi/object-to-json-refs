"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_node_1 = require("./object-node");
const type_util_1 = require("./type-util");
function JsonRefReadyToNode(jsonRefReady, path = '', knownPaths = {}) {
    if (type_util_1.IsPrimitive(jsonRefReady)) {
        const node = GetOrCreateNode(knownPaths, path);
        node.target = jsonRefReady;
        return node;
    }
    if (type_util_1.IsRef(jsonRefReady)) {
        const node = GetOrCreateNode(knownPaths, jsonRefReady['$ref']);
        return node;
    }
    const node = GetOrCreateNode(knownPaths, path);
    node.target = jsonRefReady;
    for (let prop in jsonRefReady) {
        if (!jsonRefReady.hasOwnProperty(prop)) {
            continue;
        }
        const subPath = `${path}/${prop}`;
        node.children[prop] = JsonRefReadyToNode(jsonRefReady[prop], subPath, knownPaths);
    }
    return node;
}
exports.JsonRefReadyToNode = JsonRefReadyToNode;
function GetOrCreateNode(knownPaths, path) {
    if (path in knownPaths) {
        return knownPaths[path];
    }
    return knownPaths[path] = new object_node_1.Node(path, null);
}
//# sourceMappingURL=json-ref-ready-to-object.js.map