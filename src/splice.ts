import {Immutate} from './Immutate'

declare module './Immutate' {
    interface Immutate<T> {
        splice(start: number, deleteCount: number): any[]
    }
}

Immutate.prototype.splice = function(start, deleteCount) {
    let {newObj, target} = this._getMutated()
    target[this.accessors[this.accessors.length - 1]] = [...target[this.accessors[this.accessors.length - 1]]]
    this.current = newObj
    return target.splice(start, deleteCount)
}