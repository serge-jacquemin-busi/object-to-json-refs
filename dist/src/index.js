"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const factory_get_node_reference_1 = require("./factory-get-node-reference");
const node_to_object_1 = require("./node-to-object");
const json_ref_ready_to_node_1 = require("./json-ref-ready-to-node");
const convert_to_node_graph_1 = require("./convert-to-node-graph");
function ConvertToJsonRefsReady(obj) {
    const shortestPathNodes = new WeakMap();
    const node = convert_to_node_graph_1.ConvertToNodeGraph(obj, '', shortestPathNodes);
    const result = node_to_object_1.NodeToObject(node, factory_get_node_reference_1.FactoryGetNodeReference(shortestPathNodes));
    return result;
}
exports.ConvertToJsonRefsReady = ConvertToJsonRefsReady;
function JsonRefReadyToObject(jsonRefReady) {
    const node = json_ref_ready_to_node_1.JsonRefReadyToNode(jsonRefReady);
    return node_to_object_1.NodeToObject(node);
}
exports.JsonRefReadyToObject = JsonRefReadyToObject;
//# sourceMappingURL=index.js.map