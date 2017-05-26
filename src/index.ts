import { Node } from './object-node';
import { ConvertToNodeGraph, ReferenceToNode } from './node-graph';
import { Resolve } from './resolve';


export function ConvertToJsonRefsReady(obj: any): any {
    const shortestPathNodes: ReferenceToNode = new WeakMap<any, Node>();
    const node = ConvertToNodeGraph(obj, '', shortestPathNodes);
    const result = Resolve(node, shortestPathNodes);

    return result;
}