"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Node {
    constructor(path, target) {
        this.path = path;
        this.target = target;
        this.children = {};
    }
}
exports.Node = Node;
function ClosestFromRoot(a, b) {
    if (a.path === b.path) {
        return 0;
    }
    let result = a.path.length - b.path.length;
    if (result !== 0) {
        return result;
    }
    return a.path < b.path ? -1 : 1;
}
exports.ClosestFromRoot = ClosestFromRoot;
function GetOneWithShortestPath(nodes) {
    return nodes.sort(ClosestFromRoot)[0];
}
exports.GetOneWithShortestPath = GetOneWithShortestPath;
//# sourceMappingURL=object-node.js.map