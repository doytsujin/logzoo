"use strict";

const DEFAULT_LEVELS = 'error warn info debug'.split(' ');

const toArray = function (a) {
    return Array.prototype.slice.apply(a);
};

const Log = function (places, levels) {
    //body
};

Log.get = function (place) {
    let logger = DEFAULT_LEVELS.reduce( (obj, level) => {
        obj[level] = createMethod(place, level);
        return obj;
    }, {});

    return logger;
};

function createMethod (place, level) {
    return function () {
        let args = toArray(arguments);
        let template = args.shift();

        args.unshift(`[${level}] ${template}`);

        console.log.apply(console, args);
    };
}

module.exports = Log;
