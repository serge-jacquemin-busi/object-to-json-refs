export class NodeObject {
    public uniqueId: number = 0;
    public resolution: any;

    private static lastUniqueId = 0;

    constructor(
        public wholePath: string,
        public sourceReference: any,
        public parentNode?: NodeObject,
        public propertyOfParent?: string
        ) {
        this.uniqueId = ++NodeObject.lastUniqueId;
    }
}

export function ClosestFromRoot(a: NodeObject, b: NodeObject): number {
    if (a.wholePath === b.wholePath) {
        return 0;
    }

    let result = a.wholePath.length - b.wholePath.length;

    if (result !== 0)  {
        return result;
    }

    return a.wholePath < b.wholePath ? -1 : 1;
}

export function GetClosestFromRoot(nodes: Array<NodeObject>): NodeObject {
    return nodes.sort(ClosestFromRoot)[0];
}