"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mutator_1 = require("./Mutator");
require("./push");
require("./pop");
require("./unshift");
require("./shift");
describe('mutate', function () {
    test('sets properly', function () {
        var mutator = new Mutator_1.Mutator({ bob: { age: 4 } });
        mutator.a('.bob.age').set(6);
        expect(mutator.current).toMatchObject({ bob: { age: 6 } });
    });
    test('set indexes through arrays', function () {
        var test = { bob: { friends: ['greg', 'sally'] } };
        var mutator = new Mutator_1.Mutator(test);
        mutator.a('bob.friends[1]').set('Martha');
        expect(mutator.current.bob.friends[1]).toBe('Martha');
    });
    test('Set changes object references', function () {
        var test = { bob: { age: 4 } };
        var mutator = new Mutator_1.Mutator(test);
        mutator.a('bob.age').set(6);
        expect(mutator.current).not.toBe(test);
        expect(mutator.current.bob).not.toBe(test.bob);
    });
    test('Get indexes through objects', function () {
        var test = { bob: { age: 4 } };
        var mutator = new Mutator_1.Mutator(test);
        expect(mutator.a('bob.age').get()).toBe(4);
    });
    test('Get indexes through arrays', function () {
        var test = [[], [1]];
        var mutator = new Mutator_1.Mutator(test);
        expect(mutator.a('[1][0]').get()).toBe(1);
    });
    test('pushs into array', function () {
        var mutator = new Mutator_1.Mutator({ bob: { friends: ['greg'] } });
        mutator.a('bob.friends').push('sally');
        expect(mutator.current).toMatchObject({ bob: { friends: ['greg', 'sally'] } });
    });
    test('push mutates array', function () {
        var testObj = { bob: { friends: [] } };
        var mutator = new Mutator_1.Mutator(testObj);
        mutator.a('bob.friends').push('sally');
        expect(mutator.current.bob.friends).not.toBe(testObj.bob.friends);
    });
    test('Pop returns right element', function () {
        var mutator = new Mutator_1.Mutator({ bob: { friends: ['greg', 'sally'] } });
        expect(mutator.a('bob.friends').pop()).toBe('sally');
    });
    test('Pop mutates array properly', function () {
        var mutator = new Mutator_1.Mutator({ bob: { friends: ['greg', 'sally'] } });
        mutator.a('bob.friends').pop();
        expect(mutator.current.bob.friends).toMatchObject(['greg']);
    });
    test('Pop changes reference to array', function () {
        var test = { bob: { friends: ['greg', 'sally'] } };
        var mutator = new Mutator_1.Mutator(test);
        mutator.a('bob.friends').pop();
        expect(mutator.current.bob.friends).not.toBe(test.bob.friends);
    });
    test('Unshift adds to beginning array', function () {
        var mutator = new Mutator_1.Mutator({ bob: { friends: ['greg'] } });
        mutator.a('bob.friends').unshift('sally');
        expect(mutator.current).toMatchObject({ bob: { friends: ['sally', 'greg'] } });
    });
    test('Unshift changes array identity', function () {
        var testObj = { bob: { friends: [] } };
        var mutator = new Mutator_1.Mutator(testObj);
        mutator.a('bob.friends').unshift('sally');
        expect(mutator.current.bob.friends).not.toBe(testObj.bob.friends);
    });
    test('Shift returns the right element', function () {
        var mutator = new Mutator_1.Mutator({ bob: { friends: ['greg', 'sally'] } });
        expect(mutator.a('bob.friends').shift()).toBe('greg');
    });
    test('Shift changes the array identity', function () {
        var test = { bob: { friends: ['greg', 'sally'] } };
        var mutator = new Mutator_1.Mutator(test);
        mutator.a('bob.friends').shift();
        expect(mutator.current.bob.friends).not.toBe(test.bob.friends);
    });
    test('Shift removes first element of the array', function () {
        var test = { bob: { friends: ['greg', 'sally'] } };
        var mutator = new Mutator_1.Mutator(test);
        mutator.a('bob.friends').shift();
        expect(mutator.current).toMatchObject({ bob: { friends: ['sally'] } });
    });
});
