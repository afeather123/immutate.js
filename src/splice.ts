import {Mutator} from './Mutator'

declare module './Mutator' {
    interface Mutator<T> {
        splice(start: number, deleteCount: number): any[]
    }
}

Mutator.prototype.splice = function(start, deleteCount) {
    let {newObj, target} = this._getMutated()
    target[this.accessors[this.accessors.length - 1]] = [...target[this.accessors[this.accessors.length - 1]]]
    this.current = newObj
    return target.splice(start, deleteCount)
}