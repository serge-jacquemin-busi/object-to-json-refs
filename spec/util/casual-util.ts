import *  as casual from 'casual';

export const primitives = [
    casual.integer(),
    casual.text,
    true,
    null
];

export function getRandomPrimitive(): number | string | boolean | null {
    return getRandom(...primitives);
}

export function getRandom(...values: Array<any>): any {
    const shuffledValues = values.slice().sort((a, b) => Math.random() - 0.5);
    return shuffledValues[0];
}