"use strict";

const tool = require('./tool');

module.exports = class Places {
    constructor (places) {
        this.set(places);
    }

    set (places) {
        if ( this._locked ) throw Error('Places already defined!');

        this._locked = !!places;
        this._places = this._locked ?
            tool.ensureArray(places).map( tool.uc ) :
            null;
    }

    names () {
        return this.isSet() ?
            this._places.slice() :
            [];
    }

    isSet () {
        return this._locked;
    }

    include (place) {
        let p = place ? tool.uc(place) : place;
        return this.isSet() && p && this._places.indexOf(p) > -1;
    }

    count () {
        return this._places.length;
    }

    placeAt (pos) {
        return this._places[pos];
    }

    ensureCorrectPlace (place) {
        if ( ! this.isSet() ) return place;

        let type = typeof place;
        if ( type === 'undefined' ) throw Error('Please specify the logger');
        if (
            type === 'number' &&
            this.count() > place &&
            place >= 0
        ) place = this.placeAt(place);
        if ( ! this.include(place) ) throw Error(`The '${place}' logger is undefined`);
        return  tool.uc(place);
    }
};
