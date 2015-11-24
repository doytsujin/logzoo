"use strict";

const Level = require('./Level');
const Places = require('./Places');
const tool = require('./tool');

const LOGGERS = {};

let _places = new Places();
let _currentLevel = null;

const Log = function (places, levels) {
    _places.set(places);

    if ( levels ) console.log('logzoo [warn] levels are not implemented.');

    Log.place = _places.names().reduce( (P, place, index) => {
        P[place] = index;
        return P;
    }, {});

    return Log;
};

Log.get = function (place) {
    place = _places.ensureCorrectPlace(place) || '_default';
    let level = new Level();
    level.set(_currentLevel);

    LOGGERS[place] = LOGGERS[place] || level.names().reduce( (obj, level) => {
        obj[level] = createMethod(place, level);
        return obj;
    }, {
        _level: level
    });

    return LOGGERS[place];
};


Log.setLogLevel = function (level) {
    _currentLevel = level;
};

function createMethod (place, level) {
    return function () {
        if ( this._level.isTooLow(level) ) return;
        let args = tool.toArray(arguments);
        let template = args.shift();

        let firstArg = place === '_default' ?
            `[${level}] ${template}` :
            `${place} [${level}] ${template}`;

        args.unshift(firstArg);

        console.log.apply(console, args);
    };
}


module.exports = Log;
