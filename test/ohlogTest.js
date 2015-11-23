"use strict";

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

chai.use(require('sinon-chai'));

describe('ohlog', () => {
    beforeEach( () => {
        this.consoleLog = sinon.spy(console, 'log');
        this.ohlog = require('../src/ohlog');
    });

    afterEach( () => {
        this.consoleLog.restore();
    });

    it('should exist and be a function', () => {
        expect(this.ohlog).to.exist
            .and.to.be.a('function');
    });
});
