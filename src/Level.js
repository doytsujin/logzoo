"use strict";

const DEFAULT_LEVELS = 'error warn info debug'.split(' ');

module.exports = class Level {
    constructor (levels) {
        this._levels = levels || DEFAULT_LEVELS;
        this._currentLevel = null;
    }

    names () {
        return DEFAULT_LEVELS.slice();
    }
    
    set (level) {
        this._currentLevel = level;
    }

    getIndex (level) {
        let i = this._levels.indexOf(level);
        return i >= 0 ?
            i :
            undefined;
    }

    getCurrentIndex (level) {
        return this.getIndex( this._currentLevel );
    }

    isTooLow (level) {
        if ( this._currentLevel === null ) return false;
        return this.getIndex(level) > this.getCurrentIndex();
    }
};
