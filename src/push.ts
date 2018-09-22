import {Mutator} from './Mutator'

declare module './Mutator' {
    interface Mutator<T> {
        push(value: any): void
    }
}

Mutator.prototype.push = function(value: any) {
    let {newObj,target} = this._getMutated()
    target[this.accessors[this.accessors.length - 1]] = [...target[this.accessors[this.accessors.length - 1]]]
    target[this.accessors[this.accessors.length - 1]].push(value)
    this.current = newObj
    return value
}