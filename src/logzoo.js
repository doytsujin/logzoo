"use strict";

const DEFAULT_LEVELS = 'error warn info debug'.split(' ');
let PLACES = null;

const tool = require('./tool');

const Log = function (places, levels) {
    places = tool.ensureArray(places);
    if ( levels ) console.log('logzoo [warn] levels are not implemented. Default levels are [%s]', DEFAULT_LEVELS.join(', '));
    if ( PLACES !== null ) throw Error('Places already defined');
    if ( Array.isArray([places]) ) {
        PLACES = places.map( $ => $.toUpperCase() );
        Log.place = PLACES.reduce( (P, place, index) => {
            P[place] = index;
            return P;
        }, {});

    }
    return Log;
};

Log.get = function (place) {
    place = ensureCorrectPlace(place);

    let logger = DEFAULT_LEVELS.reduce( (obj, level) => {
        obj[level] = createMethod(place, level);
        return obj;
    }, {});

    return logger;
};


Log.setLogLevel = function (level) {
    // TODO
    console.log('logzoo [warn] setLogLevel is not implemented right now');
};

function ensureCorrectPlace (place) {
    if ( PLACES !== null ) {
        let type = typeof place;

        if ( type  === 'undefined' ) throw Error('Please specify the logger');

        if ( type === 'number' ) {
            if ( place >= PLACES.length || place < 0 )
                throw Error('The requested logger is undefined');
            place = PLACES[place];
        }

        if ( type === 'string' ) {
            place = place.toUpperCase();
            if ( PLACES.indexOf(place) < 0 ) throw Error('The requested logger is undefined');
        }
    }

    return place;
}

function createMethod (place, level) {
    return function () {
        let args = tool.toArray(arguments);
        let template = args.shift();

        let firstArg = typeof place === 'undefined' ?
            `[${level}] ${template}` :
            `${place} [${level}] ${template}`;

        args.unshift(firstArg);

        console.log.apply(console, args);
    };
}

module.exports = Log;
