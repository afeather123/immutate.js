import {Immutate} from './Immutate'

declare module './Immutate' {
    interface Immutate<T> {
        push(value: any): void
    }
}

Immutate.prototype.push = function(value: any) {
    let {newObj,target} = this._getMutated()
    target[this.accessors[this.accessors.length - 1]] = [...target[this.accessors[this.accessors.length - 1]]]
    target[this.accessors[this.accessors.length - 1]].push(value)
    this.current = newObj
    return value
}