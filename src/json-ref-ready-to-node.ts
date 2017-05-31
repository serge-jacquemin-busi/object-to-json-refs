import { TreeRepresentation } from './models/tree-representation';
import { Node } from './models/node';
import { IsPrimitive, IsRef } from './type-util';
import { Observable, BehaviorSubject } from 'rxjs';

export type PathToNode = {
    [path: string]: Node;
}

export function JsonRefReadyToNode(
    jsonRefReady: any,
    path: string = '',
    knownPaths: PathToNode = {}
): Node {
    if (IsPrimitive(jsonRefReady)) {
        const node = GetOrCreateNode(knownPaths, path);
        node.target = jsonRefReady;
        return node;
    }

    if (IsRef(jsonRefReady)) {
        const node = GetOrCreateNode(knownPaths, jsonRefReady['$ref']);
        return node;
    }

    const node = GetOrCreateNode(knownPaths, path);
    node.target = jsonRefReady;

    for (let prop in jsonRefReady) {
        if (!jsonRefReady.hasOwnProperty(prop)) {
            continue;
        }
        const subPath = `${path}/${prop}`;

        node.children[prop] = JsonRefReadyToNode(jsonRefReady[prop], subPath, knownPaths);
    }

    return node;
}

function GetOrCreateNode(knownPaths: PathToNode, path: string): Node {
    if (path in knownPaths) {
        return knownPaths[path];
    }

    return knownPaths[path] = new Node(path, null);
}

