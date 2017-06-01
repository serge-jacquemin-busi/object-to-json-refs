"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/index");
xdescribe(`[Sample]
ConvertToJsonRefsReady`, () => {
    it('should properly convert an object', () => {
        const obj = {
            actor: [
                { name: 'Robert Travolta' },
                { name: 'Jhon Schwarzenegger' },
                { name: 'Arnold De Niro' }
            ],
            fictionalCharacter: {
                male: [
                    { name: 'Stan Mertens' },
                    { name: 'Homer Smith' },
                    { name: 'Finn Simpson' }
                ],
                female: [
                    { name: 'Francine Bubblegum' },
                    { name: 'Marge Ling' },
                    { name: 'Princess Bouvier' }
                ]
            },
            myFavouriteCelebrities: [],
            lastSeen: null
        };
        obj.myFavouriteCelebrities[0] = obj.actor[0];
        obj.myFavouriteCelebrities[1] = obj.fictionalCharacter.male[2];
        obj.lastSeen = obj.fictionalCharacter.female[0];
        const result = index_1.ConvertToJsonRefsReady(obj);
        console.log('forth:\n', JSON.stringify(result, null, 4));
        const back = index_1.JsonRefReadyToObject(result);
        console.log('back:\n', JSON.stringify(back, null, 4));
        console.log('references still equal:\n', [
            back.myFavouriteCelebrities[0] === back.actor[0],
            back.myFavouriteCelebrities[1] === back.fictionalCharacter.male[2],
            back.lastSeen === back.fictionalCharacter.female[0]
        ]);
    });
});
//# sourceMappingURL=sample.spec.js.map