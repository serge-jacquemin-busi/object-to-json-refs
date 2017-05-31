import { Node } from './models/node';
import { GetOneWithShortestPath } from './node-util';

export type ReferenceToNode = WeakMap<any, Node>;

/**
 * Convert q target into a Node (tree) using argument path as its root path
 * and argument shortestPathNodes as its shortestPathNodes
 * 
 * @export
 * @param {*} obj 
 * @param {string} [path=''] 
 * @param {ReferenceToNode} [shortestPathNodes=new WeakMap<any, Node>()] 
 * @returns {Node} 
 */
export function ConvertToNodeGraph(
    obj: any,
    path: string = '',
    shortestPathNodes: ReferenceToNode = new WeakMap<any, Node>(),
): Node {
    const node = new Node(path, obj);

    if (obj == null || typeof (obj) !== 'object') {
        return node;
    }

    const isShortestPathNode = ChallengeShortestPathNode(node, shortestPathNodes);

    if (!isShortestPathNode) {
        return node;
    }

    for (let property of Object.keys(obj)) {
        node.children[property] = ConvertToNodeGraph(obj[property], `${path}/${property}`, shortestPathNodes);
    }

    return node;
}

/**
 * Determine if the node has the shortest know path associated with its target
 * and, if so, store it in shortestPathNode 
 * 
 * Returns true if the node is the one having shortest know path, false otherwise
 * 
 * @param {ObjectNode} node 
 * @param {NodeWeakMap} knownNodes 
 * @returns {*} 
 */
function ChallengeShortestPathNode(node: Node, shortestPathNode: ReferenceToNode): boolean {
    const existingNode = shortestPathNode.get(node.target);

    if (typeof (existingNode) === 'undefined') {
        shortestPathNode.set(node.target, node);
        return true;
    }

    const closestFromRoot = GetOneWithShortestPath([node, existingNode]);
    if (closestFromRoot === node) {
        shortestPathNode.set(node.target, closestFromRoot);
        return true;
    }

    return false;
}