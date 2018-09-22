import {Mutator} from './Mutator'

declare module './Mutator' {
    interface Mutator<T> {
        reverse(): any[]
    }
}

Mutator.prototype.reverse = function() {
    let {newObj, target} = this._getMutated()
    target[this.accessors[this.accessors.length - 1]] = [...target[this.accessors[this.accessors.length - 1]]]
    this.current = newObj
    return target.reverse()
}