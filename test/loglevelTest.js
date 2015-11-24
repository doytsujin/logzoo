"use strict";

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

chai.use(require('sinon-chai'));

describe('logzoo/loglevel', () => {
    beforeEach( () => {
        this.oldLog = console.log;
        console.log = sinon.spy();
        this.logzoo = require('../src/logzoo');
    });

    afterEach( () => {
        console.log = this.oldLog;
        delete require.cache[ require.resolve('../src/logzoo') ];
    });

    context('default loggers', () => {
        it('should not skip any messages by default', () => {
            let log = this.logzoo.get();

            exercise(log);

            expect(console.log).to.have.callCount(4);
        });

        it('should skip debug with log level "info"', () => {
            this.logzoo.setLogLevel('info');
            let log = this.logzoo.get();

            exercise(log);

            expect(console.log).to.have.callCount(3);
        });
    });
});

function exercise (log) {
    log.debug('debug');
    log.info('info');
    log.warn('warn');
    log.error('error');
}
