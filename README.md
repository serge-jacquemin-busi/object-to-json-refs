# object-to-json-refs
Convert back and from object to JSON with references

## Demo
### Code:
````javascript
var objectToJsonRefs = require("object-to-json-refs/dist/src")

const obj: any = {
    actor: [
        { name: 'Robert Travolta' },
        { name: 'Jhon Schwarzenegger' },
        { name: 'Arnold De Niro' }
    ],
    fictionalCharacter: {
        male: [
            { name: 'Stan Mertens' } ,
            { name: 'Homer Smith' },
            { name: 'Finn Simpson' }
        ],
        female: [
            { name: 'Francine Bubblegum' },
            { name: 'Marge Ling' },
            { name: 'Princess Bouvier' }
        ]
    },
    myFavouriteCelebrities: [
    ],
    lastSeen: null
};
obj.myFavouriteCelebrities[0] = obj.actor[0];
obj.myFavouriteCelebrities[1] = obj.fictionalCharacter.male[2];
obj.lastSeen = obj.fictionalCharacter.female[0];

const result = ConvertToJsonRefsReady(obj);
console.log('forth:\n', JSON.stringify(result, null, 4));

const back = JsonRefReadyToObject(result);
console.log('back:\n', JSON.stringify(back, null, 4));

console.log('references still equal:\n', [
    back.myFavouriteCelebrities[0] === back.actor[0],
    back.myFavouriteCelebrities[1] === back.fictionalCharacter.male[2],
    back.lastSeen === back.fictionalCharacter.female[0]          
]);
````
### Output:
````javascript
{ fruit:
   { name: 'banana',
     favoriteCelebrity: { '$ref': '/celebrities/1' } },
  vegetable:
   { color: 'green',
     rating: { '$ref': '/knownRatings/0' },
     name: 'Cumcumber' },
  celebrities: [ { '$ref': '/robert' }, { name: 'Jhon De Niro' } ],
  robert: { name: 'Robert Travolta' },
  knownRatings: [ { value: 3, max: 5 } ] }
````

*(or something similar depending on which tools serves as a viewer)*



## Changelog


### Version 1.1.0

Currently only support convertion from an object to its JSON with references representation. (**not the other way arround yet**)

### Version 1.0.0

Does nothing, it is just a "publish to npm" tutorial induced tryout.