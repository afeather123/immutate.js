import {Immutate} from './Immutate'

declare module './Immutate' {
    interface Immutate<T> {
        pop(): any
    }
}

Immutate.prototype.pop = function(): any {
    let {newObj,target} = this._getMutated()
    target[this.accessors[this.accessors.length - 1]] = [...target[this.accessors[this.accessors.length - 1]]]
    this.current = newObj
    return target[this.accessors[this.accessors.length - 1]].pop()
}