export class ObjectNode {
    public wholePath: string;
    public parent?: ObjectNode;
    public propertyOfParent?: string;
    public realValue: any;
}

export function ClosestFromRoot(a: ObjectNode, b: ObjectNode): number {
    if (a.wholePath === b.wholePath) {
        return 0;
    }

    let result = a.wholePath.length - b.wholePath.length;

    if (result !== 0)  {
        return result;
    }

    return a.wholePath < b.wholePath ? -1 : 1;
}

export function GetClosestFromRoot(nodes: Array<ObjectNode>): ObjectNode {
    return nodes.sort(ClosestFromRoot)[0];
}