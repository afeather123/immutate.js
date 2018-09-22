import {Mutator} from './Mutator'

declare module './Mutator' {
    interface Mutator<T> {
        shift(): any
    }
}

Mutator.prototype.shift = function() {
    let {newObj, target} = this._getMutated()
    target[this.accessors[this.accessors.length - 1]] = [...target[this.accessors[this.accessors.length - 1]]]
    this.current = newObj
    return target[this.accessors[this.accessors.length - 1]].shift()
}