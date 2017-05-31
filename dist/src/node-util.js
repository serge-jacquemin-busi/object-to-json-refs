"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=node-util.js.map