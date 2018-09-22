import {Immutate} from './Immutate';
import './push'
import './pop'
import './unshift'
import './shift'

describe('mutate', () => {

    test('sets properly', () => {
        let mutator = new Immutate({bob: {age: 4}})
        mutator.a('.bob.age').set(6)
        expect(mutator.current).toMatchObject({bob: {age: 6}})
    });

    test('set indexes through arrays', () => {
        let test = {bob:{friends:['greg', 'sally']}}
        let mutator = new Immutate(test)
        mutator.a('bob.friends[1]').set('Martha')
        expect(mutator.current.bob.friends[1]).toBe('Martha')
    })

    test('Set changes object references', () => {
        const test = {bob: {age: 4}}
        let mutator = new Immutate(test)
        mutator.a('bob.age').set(6)
        expect(mutator.current).not.toBe(test)
        expect(mutator.current.bob).not.toBe(test.bob)
    })

    test('Get indexes through objects', () => {
        const test = {bob: {age: 4}}
        let mutator = new Immutate(test)
        expect(mutator.a('bob.age').get()).toBe(4)
    })

    test('Get indexes through arrays', () => {
        let test = [[],[1]]
        let mutator = new Immutate(test)
        expect(mutator.a('[1][0]').get()).toBe(1)
    })

    test('pushs into array', () => {
        let mutator = new Immutate({bob: {friends: ['greg']}})
        mutator.a('bob.friends').push('sally')
        expect(mutator.current).toMatchObject({bob: {friends: ['greg','sally']}})
    })

    test('push mutates array', () => {
        let testObj = {bob: {friends: []}}
        let mutator = new Immutate(testObj)
        mutator.a('bob.friends').push('sally')
        expect(mutator.current.bob.friends).not.toBe(testObj.bob.friends)
    })

    test('Pop returns right element', () => {
        let mutator = new Immutate({bob: {friends:['greg', 'sally']}})
        expect(mutator.a('bob.friends').pop()).toBe('sally')
    })

    test('Pop mutates array properly', () => {
        let mutator = new Immutate({bob: {friends:['greg', 'sally']}})
        mutator.a('bob.friends').pop()
        expect(mutator.current.bob.friends).toMatchObject(['greg'])
    })

    test('Pop changes reference to array', () => {
        let test = {bob: {friends:['greg', 'sally']}}
        let mutator = new Immutate(test)
        mutator.a('bob.friends').pop()
        expect(mutator.current.bob.friends).not.toBe(test.bob.friends)       
    })

    test('Unshift adds to beginning array', () => {
        let mutator = new Immutate({bob: {friends: ['greg']}})
        mutator.a('bob.friends').unshift('sally')
        expect(mutator.current).toMatchObject({bob: {friends: ['sally', 'greg']}})
    })

    test('Unshift changes array identity', () => {
        let testObj = {bob: {friends: []}}
        let mutator = new Immutate(testObj)
        mutator.a('bob.friends').unshift('sally')
        expect(mutator.current.bob.friends).not.toBe(testObj.bob.friends)
    })

    test('Shift returns the right element', () => {
        let mutator = new Immutate({bob: {friends:['greg', 'sally']}})
        expect(mutator.a('bob.friends').shift()).toBe('greg')
    })

    test('Shift changes the array identity', () => {
        let test = {bob: {friends:['greg', 'sally']}}
        let mutator = new Immutate(test)
        mutator.a('bob.friends').shift()
        expect(mutator.current.bob.friends).not.toBe(test.bob.friends)
    })

    test('Shift removes first element of the array', () => {
        let test = {bob: {friends:['greg', 'sally']}}
        let mutator = new Immutate(test)
        mutator.a('bob.friends').shift()
        expect(mutator.current).toMatchObject({bob: {friends:['sally']}})
    })

    
});