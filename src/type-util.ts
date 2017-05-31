export function IsPrimitive(value: any): boolean {
    return value == null || typeof (value) !== 'object';
}

export function IsRef(value: any): boolean {
    const properies = Object.getOwnPropertyNames(value);
    return properies.length === 1 && properies[0] === '$ref';
}