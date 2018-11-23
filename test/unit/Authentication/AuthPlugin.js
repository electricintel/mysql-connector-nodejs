'use strict';

/* eslint-env node, mocha */

// npm `test` script was updated to use NODE_PATH=.
const authPlugin = require('lib/Authentication/AuthPlugin');
const expect = require('chai').expect;
const td = require('testdouble');

describe('authPlugin', () => {
    context('getPassword()', () => {
        it('should return an empty string if no schema is provided', () => {
            expect(authPlugin({}).getPassword()).to.equal('');
        });

        it('should return the name of the provided password', () => {
            expect(authPlugin({ dbPassword: 'foo' }).getPassword()).to.equal('foo');
            expect(authPlugin({ password: 'foo' }).getPassword()).to.equal('foo');
        });
    });

    context('getSchema()', () => {
        it('should return an empty string if no schema is provided', () => {
            expect(authPlugin({}).getSchema()).to.equal('');
        });

        it('should return the name of the provided schema', () => {
            expect(authPlugin({ schema: 'foo' }).getSchema()).to.equal('foo');
        });
    });

    context('getUser()', () => {
        it('should return undefined if no user is provided', () => {
            expect(authPlugin({}).getUser()).to.equal(undefined);
        });

        it('should return the name of the provided user', () => {
            expect(authPlugin({ dbUser: 'foo' }).getUser()).to.equal('foo');
            expect(authPlugin({ user: 'foo' }).getUser()).to.equal('foo');
        });
    });

    context('run()', () => {
        let authenticate;

        beforeEach('create fakes', () => {
            authenticate = td.function();
        });

        afterEach('reset fakes', () => {
            td.reset();
        });

        it('should call the authenticate() method of the given client with the given context', () => {
            const plugin = authPlugin({ password: 'foo', schema: 'bar', user: 'baz' });

            td.when(authenticate(plugin), { ignoreExtraArgs: true }).thenReturn('qux');
            expect(plugin.run({ authenticate })).to.equal('qux');
        });
    });
});
