export interface ReferenceRepresentation {
    $ref: string;
}

export type PrimitiveRepresentation = string | boolean | number | null | undefined;

export type ObjectRepresentation = {
    [property: string]: ObjectRepresentation | Array<ObjectRepresentation>
} | PrimitiveRepresentation | ReferenceRepresentation;

export type TreeRepresentation = ObjectRepresentation | Array<ObjectRepresentation>;