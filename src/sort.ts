import {Immutate} from './Immutate'

declare module './Immutate' {
    interface Immutate<T> {
        sort(compare?: (a:any, b: any) => number): any[]
    }
}

Immutate.prototype.sort = function(...args) {
    let {newObj, target} = this._getMutated()
    target[this.accessors[this.accessors.length - 1]] = [...target[this.accessors[this.accessors.length - 1]]]
    this.current = newObj
    return target.sort(...args)
}