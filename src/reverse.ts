import {Immutate} from './Immutate'

declare module './Immutate' {
    interface Immutate<T> {
        reverse(): any[]
    }
}

Immutate.prototype.reverse = function() {
    let {newObj, target} = this._getMutated()
    target[this.accessors[this.accessors.length - 1]] = [...target[this.accessors[this.accessors.length - 1]]]
    this.current = newObj
    return target.reverse()
}