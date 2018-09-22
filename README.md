# Immutate

Immutate is a helper library for changing objects immutably. 

```javascript
import {Immutate} from 'immutate.js'

let obj = {bob: {friends:['sally'], gender: 'male'}}
const mutator = new Immutate(obj)
mutator.a('bob.age').set(25)
mutator.access('bob.friends').push('greg') // a is shorthand for access
mutator.a('bob.friends[0]').set('martha')
mutator.a('bob.gender').delete()
mutator.nextState // {bob:{age:25,friends:['martha', 'greg']}}
obj // {bob: {friends:['sally'], gender: 'male'}}
```

Whenever you set or delete a value or perform an array operation, immutate goes through
and changes every object reference as it indexes through to change the value, without
modifying the original object. In other words

```javascript
let state = {
    bob:{
        credentials:[
            {
                website: 'github.com',
                password: '12345'
            }
        ]
    }
}
let action = {
    type: 'CHANGE PASSWORD',
    credentialIndex: 0,
    newPassword: 'more secure (kinda)'
}

const updatedCredential = {...state.bob.credentials[action.credentialIndex], password: action.newPassword}
const credentials = [...state.bob.credentials]
credentials[action.credentialIndex] = updatedCredential
let newState = {
    ...state,
    bob: {
        ...state.bob,
        credentials
    }
}
```
becomes

```javascript
const mutator = new Immutate(state)
mutator.a(`bob.credentials[${action.credentialId}].password`).set(action.newPassword)
mutator.nextState
```

In addition, immutate also implements every mutating Array method: push, pop, shift, 
unshift, sort, reverse, fill and copyWithin.

*Note: copyWithin and fill use their native browser implementations, so you might have to pollyfill them for IE.*

