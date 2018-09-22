import {Mutator} from './Mutator'

declare module './Mutator' {
    interface Mutator<T> {
        unshift(value: any): void
    }
}

Mutator.prototype.unshift = function(value) {
    let {newObj, target} = this._getMutated()
    target[this.accessors[this.accessors.length - 1]] = [...target[this.accessors[this.accessors.length - 1]]]
    target[this.accessors[this.accessors.length - 1]].unshift(value)
    this.current = newObj
    return value
}