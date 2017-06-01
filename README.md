# object-to-json-refs
Convert back and from object to JSON with references

## Demo
### Code:
````javascript
const objectToJsonRefs = require('object-to-json-refs');

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
    myFavouriteCelebrities: [
    ],
    lastSeen: null
};
obj.myFavouriteCelebrities[0] = obj.actor[0];
obj.myFavouriteCelebrities[1] = obj.fictionalCharacter.male[2];
obj.lastSeen = obj.fictionalCharacter.female[0];

const result = objectToJsonRefs.ConvertToJsonRefsReady(obj);
console.log('forth:\n', JSON.stringify(result, null, 4));

const back = objectToJsonRefs.JsonRefReadyToObject(result);
console.log('back:\n', JSON.stringify(back, null, 4));

console.log('references still equal:\n', [
    back.myFavouriteCelebrities[0] === back.actor[0],
    back.myFavouriteCelebrities[1] === back.fictionalCharacter.male[2],
    back.lastSeen === back.fictionalCharacter.female[0]
]);
````
### Output:
````javascript

forth:
 {
    "actor": [
        {
            "name": "Robert Travolta"
        },
        {
            "name": "Jhon Schwarzenegger"
        },
        {
            "name": "Arnold De Niro"
        }
    ],
    "fictionalCharacter": {
        "male": [
            {
                "name": "Stan Mertens"
            },
            {
                "name": "Homer Smith"
            },
            {
                "$ref": "/myFavouriteCelebrities/1"
            }
        ],
        "female": [
            {
                "$ref": "/lastSeen"
            },
            {
                "name": "Marge Ling"
            },
            {
                "name": "Princess Bouvier"
            }
        ]
    },
    "myFavouriteCelebrities": [
        {
            "$ref": "/actor/0"
        },
        {
            "name": "Finn Simpson"
        }
    ],
    "lastSeen": {
        "name": "Francine Bubblegum"
    }
}
back:
 {
    "actor": [
        {
            "name": "Robert Travolta"
        },
        {
            "name": "Jhon Schwarzenegger"
        },
        {
            "name": "Arnold De Niro"
        }
    ],
    "fictionalCharacter": {
        "male": [
            {
                "name": "Stan Mertens"
            },
            {
                "name": "Homer Smith"
            },
            {
                "name": "Finn Simpson"
            }
        ],
        "female": [
            {
                "name": "Francine Bubblegum"
            },
            {
                "name": "Marge Ling"
            },
            {
                "name": "Princess Bouvier"
            }
        ]
    },
    "myFavouriteCelebrities": [
        {
            "name": "Robert Travolta"
        },
        {
            "name": "Finn Simpson"
        }
    ],
    "lastSeen": {
        "name": "Francine Bubblegum"
    }
}
references still equal:
 [ true, true, true ]

````

*(or something similar depending on which tools serves as a viewer)*



## Changelog

### Version 2.0.1

Removed needless RxJS dependency

### Version 2.0.0

Support transformation both way:
-  from object to their JSON with ref representation
-  from JSON with ref representation to the corresponding object


### Version 1.1.0

Currently only support convertion from an object to its JSON with references representation. (**not the other way arround yet**)

### Version 1.0.0

Does nothing, it is just a "publish to npm" tutorial induced tryout.