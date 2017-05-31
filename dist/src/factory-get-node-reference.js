"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_util_1 = require("./type-util");
/**
 * Returns a method which behaviour is:
 * For every non primitive target of its node sole argument,
 * assert it has a known shortest path then returns it.
 *
 * @export
 * @param {ReferenceToNode} shortestPathNodes
 * @returns {IGetNodeReference}
 */
function FactoryGetNodeReference(shortestPathNodes) {
    return (value) => {
        if (type_util_1.IsPrimitive(value)) {
            return null;
        }
        const shortestPathNode = shortestPathNodes.get(value);
        if (shortestPathNode === undefined) {
            throw new Error('ShortestPathNode not defined for target');
        }
        return shortestPathNode;
    };
}
exports.FactoryGetNodeReference = FactoryGetNodeReference;
//# sourceMappingURL=factory-get-node-reference.js.map