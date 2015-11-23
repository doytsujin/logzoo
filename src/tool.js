"use strict";

module.exports = {
    toArray: function (a) {
        return Array.prototype.slice.apply(a);
    },

    ensureArray: function (list) {
        return typeof list === 'string' ?
                list.split(/[\s,;]+/g) :
            Array.isArray(list) ?
                list :
                undefined;
    }
};
