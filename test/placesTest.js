"use strict";

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

chai.use(require('sinon-chai'));

describe('ohlog', () => {
    beforeEach( () => {
        this.oldLog = console.log;
        console.log = sinon.spy();
        this.ohlog = require('../src/ohlog');
    });

    afterEach( () => {
        console.log = this.oldLog;
        delete require.cache[ require.resolve('../src/ohlog') ];
    });

    it('should define places and return self for chaining', () => {
        let places = ['http', 'storage'];
        let self = this.ohlog(places);

        expect(self).to.equal(this.ohlog);
        expect(this.ohlog).to.have.property('place')
            .that.is.an('object');
        expect(this.ohlog.place).to.have.property('HTTP');
        expect(this.ohlog.place).to.have.property('STORAGE')
            .that.not.equals(this.ohlog.place.HTTP);
    });

    it('should throw an error if a user tries to redefine places', () => {
        let places = ['http', 'storage'];
        let self = this.ohlog(places);

        expect( () => {
            this.ohlog(places);
        }).to.throw(Error)
        .that.has.property('message')
        .that.includes('defined');
    });

    describe('placed loggers', () => {
        beforeEach( () => {
            this.ohlog(['http', 'storage']);
        });

        it('should prepend place to log message', () => {
            let logHTTP = this.ohlog.get(this.ohlog.place.HTTP);
            let logSTORAGE = this.ohlog.get(this.ohlog.place.STORAGE);

            logHTTP.info('xyz');
            logSTORAGE.warn('abc');

            expect(console.log).calledTwice
            .and.calledWithExactly('HTTP [info] xyz')
            .and.calledWithExactly('STORAGE [warn] abc');
        });

        it('should recognize loggers by name', () => {
            let logHTTP = this.ohlog.get('http');
            let logSTORAGE = this.ohlog.get('storage');

            logHTTP.info('xyz');
            logSTORAGE.warn('abc');

            expect(console.log).calledTwice
            .and.calledWithExactly('HTTP [info] xyz')
            .and.calledWithExactly('STORAGE [warn] abc');
        });

        it('should throw error if undefined place is requested after the places are defined', () => {
            expect( _ => {
                this.ohlog.get();
            }).to.throw('specify the logger');
        });

        it('should throw error if unknown logger is requested', () => {
            expect( () => {
                this.ohlog.get('undefined_place');
            }).to.throw('logger is undefined');

            expect( () => {
                this.ohlog.get(100500);
            }).to.throw('logger is undefined');
        });
    });


    describe('places defined as string', () => {
        it('should understand space separated list', () => {
            this.ohlog('a b');
            expect(this.ohlog.place.A).to.exist;
            expect(this.ohlog.place.B).to.exist;
        });

        it('should understand space/comma separated list', () => {
            this.ohlog('a, b,c');
            expect(this.ohlog.place.A).to.exist;
            expect(this.ohlog.place.B).to.exist;
            expect(this.ohlog.place.C).to.exist;
        });

        it('should understand space/semicolumn separated list', () => {
            this.ohlog('a; b;c');
            expect(this.ohlog.place.A).to.exist;
            expect(this.ohlog.place.B).to.exist;
            expect(this.ohlog.place.C).to.exist;
        });
    });
});
