export class Node {
    public children: {
        [property: string]: Node;
    }

    constructor(
        public path: string,
        public target: any
        ) {
            this.children = {};
    }
}

export function ClosestFromRoot(a: Node, b: Node): number {
    if (a.path === b.path) {
        return 0;
    }

    let result = a.path.length - b.path.length;

    if (result !== 0)  {
        return result;
    }

    return a.path < b.path ? -1 : 1;
}

export function GetClosestFromRoot(nodes: Array<Node>): Node {
    return nodes.sort(ClosestFromRoot)[0];
}