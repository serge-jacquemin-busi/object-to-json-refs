"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const casual_util_1 = require("./util/casual-util");
const casual = require("casual");
// Won't build unless primites are valid TreeRepresentation
{
    casual_util_1.primitives.forEach(primitive => {
        const source = primitive;
        const tree = source;
    });
}
// Won't build unless { $ref: string } are valid TreeRepresentation
{
    const source = { $ref: casual.text };
    const tree = source;
}
// Won't build unless {} is valid TreeRepresentation
{
    const source = {};
    const tree = source;
}
// Won't build unless [1, 2, 3] are valid TreeRepresentation
{
    const source = [1, 2, 3];
    const tree = source;
}
// Won't build unless defined source tree is valid TreeRepresentation
{
    const source = {
        a: 'a',
        b: { c: 'c' },
        d: { $ref: '' },
        e: null,
        f: [0, { g: 'g' }, undefined]
    };
    const tree = source;
}
//# sourceMappingURL=tree-representation.mustbuild.js.map