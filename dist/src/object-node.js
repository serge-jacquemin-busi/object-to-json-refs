"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ObjectNode {
}
exports.ObjectNode = ObjectNode;
function ClosestFromRoot(a, b) {
    if (a.wholePath === b.wholePath) {
        return 0;
    }
    let result = a.wholePath.length - b.wholePath.length;
    if (result !== 0) {
        return result;
    }
    return a.wholePath < b.wholePath ? -1 : 1;
}
exports.ClosestFromRoot = ClosestFromRoot;
function GetClosestFromRoot(nodes) {
    return nodes.sort(ClosestFromRoot)[0];
}
exports.GetClosestFromRoot = GetClosestFromRoot;
//# sourceMappingURL=object-node.js.map