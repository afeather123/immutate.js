import fmap from "./helpers/fmap";
import shallowCopy from "./helpers/shallowCopy";

export class Immutate<T> {
    current: T
    private _accessors: (string | number)[] = []
    constructor(public inital: T) {
        this.current = inital
    }

    a(accessorString: string): Immutate<T> {
        return this.access(accessorString)
    }

    access(accessorString: string): Immutate<T> {
        const unbracketed = fmap<any>(accessorString.split('['), ele => {
        const split = ele.split(']');
        if(split.length > 1) {
            const inBrackets = split[0];
            if(!isNaN(inBrackets)) split[0] = Number(inBrackets);
            else split[0] = [split[0]];
        }
        return split;
        });
    
        this._accessors = fmap<any>(unbracketed, ele => {
            switch(typeof ele) {
                case 'string':
                const split = ele.split('.');
                if(split[0] === '') split.shift();
                return split;
                case 'object':
                return ele;
                case 'number':
                return [ele];
            }
        });
        return this
    }

    set(value: any): T {
        let {newObj, target} = this._getMutated()
        target[this._accessors[this._accessors.length - 1]] = value
        this.current = newObj as T
        return value
    }

    get(): any {
        let target: any = this.current
        for(let i = 0; i < this._accessors.length - 1; i++) {
            const key = this._accessors[i]
            if(typeof target !== 'object') throw new Error(`Cannot access property ${key} of ${target}`)
            target = target[key]
        }
        return target[this._accessors[this._accessors.length - 1]]
    }

    private _getMutated(): {newObj: T, target: any} {
        let target = shallowCopy(this.current)
        let newObj = target
        for(let i = 0; i < this._accessors.length - 1; i++) {
            const key = this._accessors[i]
            if(typeof target !== 'object') throw new Error(`Cannot access property ${key} of ${target}`)
            target[key] = shallowCopy(target[key])
            target = target[key]
        }
        return {newObj, target}
    }

    private _getArray(): {newObj:any, array: any[]} {
        const {newObj, target} = this._getMutated()
        const lastKey = this._accessors[this._accessors.length - 1]
        target[lastKey] = [...target[lastKey]]
        return {newObj, array: target[lastKey]}
    }

    pop(): any {
        let {newObj, array} = this._getArray()
        this.current = newObj
        return array.pop()
    }

    push(value: any): any {
        let {newObj,array} = this._getArray()
        array.push(value)
        this.current = newObj
        return value
    }

    reverse(): any[] {
        let {newObj, array} = this._getArray()
        this.current = newObj
        return array.reverse()
    }

    shift():any {
        let {newObj, array} = this._getArray()
        this.current = newObj
        return array.shift()
    }

    sort(compare?: (a:any, b: any) => number): any[] {
        let {newObj, array} = this._getArray()
        this.current = newObj
        return array.sort(compare)
    }

    splice(start: number, deleteCount: number): any[] {
        let {newObj, array} = this._getArray()
        this.current = newObj
        return array.splice(start, deleteCount)
    }
    
    unshift(value: any): any {
        let {newObj, array} = this._getArray()
        this.current = newObj
        return array.unshift(value)
    }
}