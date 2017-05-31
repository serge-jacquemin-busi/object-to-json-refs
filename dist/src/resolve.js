"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function FactoryGetNodeReference(shortestPathNodes) {
    return (node) => {
        const shortestPathNode = shortestPathNodes.get(node.target);
        return shortestPathNode || null;
    };
}
exports.FactoryGetNodeReference = FactoryGetNodeReference;
//# sourceMappingURL=resolve.js.map