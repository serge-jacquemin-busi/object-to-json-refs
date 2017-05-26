"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_graph_1 = require("./node-graph");
const resolve_1 = require("./resolve");
function ConvertToJsonRefsReady(obj) {
    const shortestPathNodes = new WeakMap();
    const node = node_graph_1.ConvertToNodeGraph(obj, '', shortestPathNodes);
    console.log(node);
    const result = resolve_1.Resolve(node, shortestPathNodes);
    return result;
}
exports.ConvertToJsonRefsReady = ConvertToJsonRefsReady;
//# sourceMappingURL=index.js.map