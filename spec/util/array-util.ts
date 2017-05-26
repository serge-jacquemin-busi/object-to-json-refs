interface Array<T> {
    distinct(): Array<T>
}

Array.prototype.distinct = function() { return Array.from(new Set(this)); }