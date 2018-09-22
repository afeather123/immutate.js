import {Immutate} from './immutate';

describe('mutate', () => {

    test('sets properly', () => {
        let mutator = new Immutate({bob: {age: 4}})
        mutator.a('.bob.age').set(6)
        expect(mutator.nextState).toMatchObject({bob: {age: 6}})
    });

    test('set indexes through arrays', () => {
        let test = {bob:{friends:['greg', 'sally']}}
        let mutator = new Immutate(test)
        mutator.a('bob.friends[1]').set('Martha')
        expect(mutator.nextState.bob.friends[1]).toBe('Martha')
    })

    test('Set changes object references', () => {
        const test = {bob: {age: 4}}
        let mutator = new Immutate(test)
        mutator.a('bob.age').set(6)
        expect(mutator.nextState).not.toBe(test)
        expect(mutator.nextState.bob).not.toBe(test.bob)
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

    test('Throws error on invalid access', () => {
        let test = {bob:{friends:[]}}
        const mutator = new Immutate(test)
        expect(() => {
            mutator.a('bob.age.please').get()
        }).toThrow()
    })

    test('Get returns undefined when accessing property that isn\'t there', () => {
        let test = {bob:{fiends: []}}
        const mutator = new Immutate(test)
        expect(mutator.a('bob.friend').get()).toBe(undefined)
    })

    test('Delete removes the property from the target', () => {
        let test = {bob:{age:25, gender: 'male'}}
        let immutate = new Immutate(test)
        immutate.a('age').delete()
        expect(immutate.nextState).toMatchObject({bob:{gender: 'male'}})
    })

    test('pushs into array', () => {
        let mutator = new Immutate({bob: {friends: ['greg']}})
        mutator.a('bob.friends').push('sally')
        expect(mutator.nextState).toMatchObject({bob: {friends: ['greg','sally']}})
    })

    test('push mutates array', () => {
        let testObj = {bob: {friends: []}}
        let mutator = new Immutate(testObj)
        mutator.a('bob.friends').push('sally')
        expect(mutator.nextState.bob.friends).not.toBe(testObj.bob.friends)
    })

    test('Pop returns right element', () => {
        let mutator = new Immutate({bob: {friends:['greg', 'sally']}})
        expect(mutator.a('bob.friends').pop()).toBe('sally')
    })

    test('Pop mutates array properly', () => {
        let mutator = new Immutate({bob: {friends:['greg', 'sally']}})
        mutator.a('bob.friends').pop()
        expect(mutator.nextState.bob.friends).toMatchObject(['greg'])
    })

    test('Pop changes reference to array', () => {
        let test = {bob: {friends:['greg', 'sally']}}
        let mutator = new Immutate(test)
        mutator.a('bob.friends').pop()
        expect(mutator.nextState.bob.friends).not.toBe(test.bob.friends)       
    })

    test('Unshift adds to beginning array', () => {
        let mutator = new Immutate({bob: {friends: ['greg']}})
        mutator.a('bob.friends').unshift('sally')
        expect(mutator.nextState).toMatchObject({bob: {friends: ['sally', 'greg']}})
    })

    test('Unshift changes array identity', () => {
        let testObj = {bob: {friends: []}}
        let mutator = new Immutate(testObj)
        mutator.a('bob.friends').unshift('sally')
        expect(mutator.nextState.bob.friends).not.toBe(testObj.bob.friends)
    })

    test('Shift returns the right element', () => {
        let mutator = new Immutate({bob: {friends:['greg', 'sally']}})
        expect(mutator.a('bob.friends').shift()).toBe('greg')
    })

    test('Shift changes the array identity', () => {
        let test = {bob: {friends:['greg', 'sally']}}
        let mutator = new Immutate(test)
        mutator.a('bob.friends').shift()
        expect(mutator.nextState.bob.friends).not.toBe(test.bob.friends)
    })

    test('Shift removes first element of the array', () => {
        let test = {bob: {friends:['greg', 'sally']}}
        let mutator = new Immutate(test)
        mutator.a('bob.friends').shift()
        expect(mutator.nextState).toMatchObject({bob: {friends:['sally']}})
    })

    test('Sort sorts the elements', () => {
        let mutator = new Immutate([3,4,2,1])
        expect(mutator.sort()).toMatchObject([1,2,3,4])
    })

    test('Sort changes the array identity', () => {
        let test = [3,4,2,1]
        let mutator = new Immutate(test)
        expect(mutator.sort()).not.toBe(test)
    })

    test('sort does not mutate the original array', () => {
        let test = [3,4,2,1]
        let mutator = new Immutate(test)
        mutator.sort()
        expect(test).not.toMatchObject([1,2,3,4])
    })

    test('Throws error if trying to use array function on non-array', () => {
        let test = {bob:{friends:{}}}
        let mutator = new Immutate(test)
        expect(() => {mutator.a('bob.friends').push('sally')})
        .toThrowError(new Error('Property friends of {"friends":{}} is not an array'))
    })
});