"use strict";

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

chai.use(require('sinon-chai'));

describe('logzoo/defaultLogger', () => {
    beforeEach( () => {
        this.oldLog = console.log;
        console.log = sinon.spy();
        this.logzoo = require('../src/logzoo');
    });

    afterEach( () => {
        console.log = this.oldLog;
    });

    describe('.get()', () => {
        it('should be a function', () => {
            expect(this.logzoo).itself.to.respondTo('get');
        });

        it('should return a default logger', () => {
            let logger = this.logzoo.get();

            'error warn info debug'.split(' ')
            .forEach(method => {
                expect(logger).itself.to.respondTo(method);
            });
        });

        it('should return a singleton', () => {
            let l1 = this.logzoo.get();
            let l2 = this.logzoo.get();

            expect(l1).to.equal(l2);
        });

        describe('defaultLogger', () => {
            beforeEach( () => {
                this.log = this.logzoo.get();
            });

            let loggingMethodOK = (methodName) => {
                let description = `.${methodName}(...)`;
                describe(description, () => {
                    it('should be a function', () => {
                        expect(this.log).itself.to.respondTo(methodName);
                    });

                    it(`should prepend [${methodName}] to the message`, () => {
                        let message = 'an error message';
                        this.log[methodName](message);

                        expect(console.log)
                            .calledOnce
                            .and.calledWithExactly(`[${methodName}] ${message}`);
                    });

                    it('should understand console.log placeholders', () => {
                        let tpl = 'A number %d and a string %s!';
                        let v1 = 123;
                        let v2 = 'qwe';

                        this.log[methodName](tpl, v1, v2);

                        expect(console.log)
                            .calledOnce
                            .and.calledWithExactly(`[${methodName}] ${tpl}`, 123, 'qwe');
                    });
                });
            };


            'error warn info debug'.split(' ').forEach(loggingMethodOK);
        });
    });

});
