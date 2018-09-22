import fmap from "./helpers/fmap";
import shallowCopy from "./helpers/shallowCopy";

export class Mutator<T> {
    current: T
    accessors: (string | number)[] = []
    constructor(public inital: T) {
        this.current = inital
    }

    a(accessorString: string): Mutator<T> {
        return this.access(accessorString)
    }

    access(accessorString: string): Mutator<T> {
        const unbracketed = fmap<any>(accessorString.split('['), ele => {
        const split = ele.split(']');
        if(split.length > 1) {
            const inBrackets = split[0];
            if(!isNaN(inBrackets)) split[0] = Number(inBrackets);
            else split[0] = [split[0]];
        }
        return split;
        });
    
        this.accessors = fmap<any>(unbracketed, ele => {
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
        target[this.accessors[this.accessors.length - 1]] = value
        this.current = newObj as T
        return value
    }

    get(): any {
        let target: any = this.current
        for(let i = 0; i < this.accessors.length - 1; i++) {
            const key = this.accessors[i]
            if(typeof target !== 'object') throw new Error(`Cannot access property ${key} of ${target}`)
            target = target[key]
        }
        return target[this.accessors[this.accessors.length - 1]]
    }

    _getMutated(): {newObj: T, target: any} {
        let target = shallowCopy(this.current)
        let newObj = target
        for(let i = 0; i < this.accessors.length - 1; i++) {
            const key = this.accessors[i]
            if(typeof target !== 'object') throw new Error(`Cannot access property ${key} of ${target}`)
            target[key] = shallowCopy(target[key])
            target = target[key]
        }
        return {newObj, target}
    }
}