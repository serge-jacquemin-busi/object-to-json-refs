import { FactoryGetNodeReference } from './factory-get-node-reference';
import { NodeToObject } from './node-to-object';
import { JsonRefReadyToNode } from './json-ref-ready-to-node';
import { Node } from './models/node';
import { ConvertToNodeGraph, ReferenceToNode } from './convert-to-node-graph';


export function ConvertToJsonRefsReady(obj: any): any {
    const shortestPathNodes: ReferenceToNode = new WeakMap<any, Node>();
    const node = ConvertToNodeGraph(obj, '', shortestPathNodes);

    const result = NodeToObject(node, FactoryGetNodeReference(shortestPathNodes));

    return result;
}

export function JsonRefReadyToObject(
    jsonRefReady: any
): any {
    const node = JsonRefReadyToNode(jsonRefReady);

    return NodeToObject(node);
}