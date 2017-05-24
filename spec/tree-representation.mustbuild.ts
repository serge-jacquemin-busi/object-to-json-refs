import {
    ObjectRepresentation,
    PrimitiveRepresentation,
    ReferenceRepresentation,
    TreeRepresentation
} from '../src/tree-representation';
import { primitives } from './util/casual-util';
import * as casual from 'casual';

// Won't build unless primites are valid TreeRepresentation
{
    primitives.forEach(primitive => {
        const source: PrimitiveRepresentation = primitive;
        const tree: TreeRepresentation = source;
    });
}

// Won't build unless { $ref: string } are valid TreeRepresentation
{
    const source: ReferenceRepresentation = { $ref: casual.text };
    const tree: TreeRepresentation = source;
}

// Won't build unless {} is valid TreeRepresentation
{
    const source: ObjectRepresentation = {};
    const tree: TreeRepresentation = source;
}

// Won't build unless [1, 2, 3] are valid TreeRepresentation
{
    const source: Array<PrimitiveRepresentation> = [1, 2, 3];
    const tree: TreeRepresentation = source;
}

// Won't build unless defined source tree is valid TreeRepresentation
{
    const source = {
        a: 'a',
        b: { c: 'c'},
        d: { $ref: ''},
        e: null,
        f: [0, {g: 'g'}, undefined]
    };
    const tree: TreeRepresentation = source;
}