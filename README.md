# object-to-json-refs
Convert back and from object to JSON with references

## Demo
### Code (Typescript):
````typescript
import { ConvertToJsonRefsReady } from 'object-to-json-refs';

const obj: any = {
    fruit: {
        name: 'banana'
    },
    vegetable: {
        color: 'green',
        rating: {
            value: 3,
            max: 5
        },
        name: 'Cumcumber'
    },
    celebrities: [
        { name: 'Robert Travolta' },
        { name: 'Jhon De Niro' }
    ]
};
obj.fruit.favoriteCelebrity = obj.celebrities[1];
obj.robert = obj.celebrities[0];
obj.knownRatings = [ obj.vegetable.rating ];

const result = ConvertToJsonRefsReady(obj);
console.log(result);
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