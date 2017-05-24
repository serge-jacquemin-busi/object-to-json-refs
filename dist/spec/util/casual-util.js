"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const casual = require("casual");
exports.primitives = [
    casual.integer(),
    casual.text,
    true,
    null
];
function getRandomPrimitive() {
    return getRandom(...exports.primitives);
}
exports.getRandomPrimitive = getRandomPrimitive;
function getRandom(...values) {
    const shuffledValues = values.slice().sort((a, b) => Math.random() - 0.5);
    return shuffledValues[0];
}
exports.getRandom = getRandom;
//# sourceMappingURL=casual-util.js.map