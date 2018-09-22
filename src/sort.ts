import {Mutator} from './Mutator'

declare module './Mutator' {
    interface Mutator<T> {
        sort(compare?: (a:any, b: any) => number): any[]
    }
}

Mutator.prototype.sort = function(...args) {
    let {newObj, target} = this._getMutated()
    target[this.accessors[this.accessors.length - 1]] = [...target[this.accessors[this.accessors.length - 1]]]
    this.current = newObj
    return target.sort(...args)
}