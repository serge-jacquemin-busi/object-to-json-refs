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