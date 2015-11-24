"use strict";

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

chai.use(require('sinon-chai'));

describe('logzoo', () => {
    beforeEach( () => {
        this.oldLog = console.log;
        console.log = sinon.spy();
        this.logzoo = require('../src/logzoo');
    });

    afterEach( () => {
        console.log = this.oldLog;
        delete require.cache[ require.resolve('../src/logzoo') ];
    });

    it('should define places and return self for chaining', () => {
        let places = ['http', 'storage'];
        let self = this.logzoo(places);

        expect(self).to.equal(this.logzoo);
        expect(this.logzoo).to.have.property('place')
            .that.is.an('object');
        expect(this.logzoo.place).to.have.property('HTTP');
        expect(this.logzoo.place).to.have.property('STORAGE')
            .that.not.equals(this.logzoo.place.HTTP);
    });

    it('should throw an error if a user tries to redefine places', () => {
        let places = ['http', 'storage'];
        let self = this.logzoo(places);

        expect( () => {
            this.logzoo(places);
        }).to.throw(Error)
        .that.has.property('message')
        .that.includes('defined');
    });

    describe('placed loggers', () => {
        beforeEach( () => {
            this.logzoo(['http', 'storage']);
        });

        it('should prepend place to log message', () => {
            let logHTTP = this.logzoo.get(this.logzoo.place.HTTP);
            let logSTORAGE = this.logzoo.get(this.logzoo.place.STORAGE);

            logHTTP.info('xyz');
            logSTORAGE.warn('abc');

            expect(console.log).calledTwice
            .and.calledWithExactly('HTTP [info] xyz')
            .and.calledWithExactly('STORAGE [warn] abc');
        });

        it('should recognize loggers by name', () => {
            let logHTTP = this.logzoo.get('http');
            let logSTORAGE = this.logzoo.get('storage');

            logHTTP.info('xyz');
            logSTORAGE.warn('abc');

            expect(console.log).calledTwice
            .and.calledWithExactly('HTTP [info] xyz')
            .and.calledWithExactly('STORAGE [warn] abc');
        });

        it('should return the same object for the same name', () => {
            ['http', 'storage'].forEach( place => {
                let l1 = this.logzoo.get(place);
                let l2 = this.logzoo.get(place);
                expect(l1).to.equal(l2);
            });
        });

        it('should throw error if undefined place is requested after the places are defined', () => {
            expect( _ => {
                this.logzoo.get();
            }).to.throw('specify the logger');
        });

        it('should throw error if unknown logger is requested', () => {
            expect( () => {
                this.logzoo.get('undefined_place');
            }).to.throw('logger is undefined');

            expect( () => {
                this.logzoo.get(100500);
            }).to.throw('logger is undefined');
        });
    });


    describe('places defined as string', () => {
        it('should understand space separated list', () => {
            this.logzoo('a b');
            expect(this.logzoo.place.A).to.exist;
            expect(this.logzoo.place.B).to.exist;
        });

        it('should understand space/comma separated list', () => {
            this.logzoo('a, b,c');
            expect(this.logzoo.place.A).to.exist;
            expect(this.logzoo.place.B).to.exist;
            expect(this.logzoo.place.C).to.exist;
        });

        it('should understand space/semicolumn separated list', () => {
            this.logzoo('a; b;c');
            expect(this.logzoo.place.A).to.exist;
            expect(this.logzoo.place.B).to.exist;
            expect(this.logzoo.place.C).to.exist;
        });
    });
});
