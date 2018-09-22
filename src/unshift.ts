import {Immutate} from './Immutate'

declare module './Immutate' {
    interface Immutate<T> {
        unshift(value: any): void
    }
}

Immutate.prototype.unshift = function(value) {
    let {newObj, target} = this._getMutated()
    target[this.accessors[this.accessors.length - 1]] = [...target[this.accessors[this.accessors.length - 1]]]
    target[this.accessors[this.accessors.length - 1]].unshift(value)
    this.current = newObj
    return value
}