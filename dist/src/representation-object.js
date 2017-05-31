"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deferable_path_1 = require("./deferable-path");
const rxjs_1 = require("rxjs");
function RepresentationToObject(representation) {
    const subject = new rxjs_1.BehaviorSubject(new deferable_path_1.DeferablePath(-1, rxjs_1.Observable.from([null])));
    RepresentationToObjectDynamic(representation, '', subject);
    let returnValue;
    subject.filter(obj => obj.path === '')
        .switchMap(obj => obj.defered)
        .subscribe(value => {
        returnValue = value;
        console.warn(value);
    });
    subject.error("Give up");
    return returnValue;
}
exports.RepresentationToObject = RepresentationToObject;
function RepresentationToObjectDynamic(representation, path, subject) {
    if (representation == null || typeof (representation) !== 'object') {
        const returnValue = representation;
        subject.next(new deferable_path_1.DeferablePath(path, rxjs_1.Observable.from([returnValue])));
        return;
    }
    const properies = Object.getOwnPropertyNames(representation);
    if (properies.length === 1 && properies[0] === '$ref') {
        subject.filter(obj => obj.path == representation['$ref']).subscribe(obj => subject.next(new deferable_path_1.DeferablePath(path, obj.defered)));
        return;
    }
    const returnValue = (Array.isArray(representation) ? [] : {});
    for (let prop in representation) {
        if (!representation.hasOwnProperty(prop)) {
            continue;
        }
        const subPath = `${path}/${prop}`;
        RepresentationToObjectDynamic(representation[prop], subPath, subject);
        subject.filter(obj => obj.path == subPath).subscribe(obj => obj.defered.subscribe(v => returnValue[prop] = v));
    }
    subject.next(new deferable_path_1.DeferablePath(path, rxjs_1.Observable.from([returnValue])));
}
exports.RepresentationToObjectDynamic = RepresentationToObjectDynamic;
//# sourceMappingURL=representation-object.js.map