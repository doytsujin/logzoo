"use strict";

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

chai.use(require('sinon-chai'));

describe('logzoo', () => {
    beforeEach( () => {
        this.consoleLog = sinon.spy(console, 'log');
        this.logzoo = require('../src/logzoo');
    });

    afterEach( () => {
        this.consoleLog.restore();
    });

    it('should exist and be a function', () => {
        expect(this.logzoo).to.exist
            .and.to.be.a('function');
    });

    it('should have .get() method', () => {
        expect(this.logzoo).itself.to.respondTo('get');
    });

    it('should have .setLogLevel() method', () => {
        expect(this.logzoo).itself.to.respondTo('setLogLevel');
    });
});
