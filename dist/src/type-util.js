"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function IsPrimitive(value) {
    return value == null || typeof (value) !== 'object';
}
exports.IsPrimitive = IsPrimitive;
function IsRef(value) {
    const properies = Object.getOwnPropertyNames(value);
    return properies.length === 1 && properies[0] === '$ref';
}
exports.IsRef = IsRef;
//# sourceMappingURL=type-util.js.map