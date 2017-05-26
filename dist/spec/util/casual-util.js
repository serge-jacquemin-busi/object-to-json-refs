"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const casual = require("casual");
exports.primitives = [
    casual.integer(),
    casual.word,
    true,
    null
];
function GetRandomPrimitive() {
    return getRandom(...exports.primitives);
}
exports.GetRandomPrimitive = GetRandomPrimitive;
function getRandom(...values) {
    const shuffledValues = values.slice().sort((a, b) => Math.random() - 0.5);
    return shuffledValues[0];
}
//# sourceMappingURL=casual-util.js.map