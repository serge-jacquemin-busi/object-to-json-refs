import { Node, GetClosestFromRoot } from './object-node';

// export function ConvertToJsonRefsReady(obj: any): any {
//     const knownNodes: ReferenceToNode = new WeakMap<any, Node>();
//     const keptNodes: NodeDictionary = {};

//     const root = new Node('', obj);

//     ConvertToNodeGraph(root, knownNodes, keptNodes);

//     for (let uniqueId in keptNodes) {
//         const keptNode = keptNodes[uniqueId];
//     }

//     return root;
// }