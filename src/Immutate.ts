import fmap from "./helpers/fmap";
import shallowCopy from "./helpers/shallowCopy";

export class Immutate<T> {
    
    /** The next state with all changes you have applied. */
    nextState: T

    private _accessors: (string | number)[] = []

    constructor(public inital: T) {
        this.nextState = inital
    }

    /** Access a property from the state object provided,  using'.value' 
     * to index objects and '[integer]' to index through arrays. The shorthand
     * version of 'access'.
     */
    a(accessorString: string): Immutate<T> {
        return this.access(accessorString)
    }

    /** Access a property from the state object provided,  using'.value' 
     * to index objects and '[integer]' to index through arrays. The longhand
     * version of 'a'.
     */
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
    
        const newAccessors = fmap<any>(unbracketed, ele => {
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
        this._accessors = [...this._accessors, ...newAccessors]
        return this
    }

    /**Because of the way 'a' and 'access' parse their input strings,
     * special characters '.', '[', and ']' cannot be used with these
     * methods. If you need to access an object property that contains
     * these characters, you can use 'asc', which is the shorthand version
     * of 'accessWithSpecialCharacters'.
     */
    asc(accessorString: string): Immutate<T> {
        return this.accessWithSpecialCharacters(accessorString)
    }

    /**Because of the way 'a' and 'access' parse their input strings,
     * special characters '.', '[', and ']' cannot be used with these
     * methods. If you need to access an object property that contains
     * these characters, you can use 'accessWithSpecialCharacters', or
     * the shorthand version, 'asc'.
     */
    accessWithSpecialCharacters(accessorString: string): Immutate<T> {
        this._accessors.push(accessorString)
        return this
    }

    private _clearAccessors() {
        this._accessors = []
    }

    /**Set the value at the current accessor path, and returns the
     * assigned value like normal assignment.
     */
    set(value: any): T {
        let {newObj, target} = this._getMutated()
        if(this._accessors.length > 1) {
            target[this._accessors[this._accessors.length - 1]] = value
            this.nextState = newObj as T
        } else {
            this.nextState = value
        }
        this._clearAccessors()
        return value
    }

    /**Return the value at the given accessor path. */
    get(): any {
        let target: any = this.nextState
        for(let i = 0; i < this._accessors.length - 1; i++) {
            const key = this._accessors[i]
            if(typeof target !== 'object') throw new Error(`Cannot access property ${key} of ${JSON.stringify(target)}`)
            target = target[key]
        }
        let final = target[this._accessors[this._accessors.length - 1]]
        this._clearAccessors()
        return final
    }

    /**Deletes the property at the current accessor path. */
    delete() {
        const {newObj, target} = this._getMutated()
        if(this._accessors.length === 0) return false
        delete target[this._accessors[this._accessors.length - 1]]
        this.nextState = newObj
        return true
    }

    /*
    * Returns the complete mutated state object and the object 
    * which is the  target of the final accessor key, a.k.a. the object
    * or array to be modified.
    */
    private _getMutated(): {newObj: T, target: any} {
        let target = shallowCopy(this.nextState)
        let newObj = target
        for(let i = 0; i < this._accessors.length - 1; i++) {
            const key = this._accessors[i]
            if(typeof target !== 'object') throw new Error(`Cannot access property ${key} of ${JSON.stringify(target)}`)
            target[key] = shallowCopy(target[key])
            target = target[key]
        }
        return {newObj, target}
    }

    /*  
    * Returns the complete mutated state object and the array
    * nested inside of it which will be operated on.
    */
    private _getArray(): any[] {
        const {newObj, target} = this._getMutated()
        if(this._accessors.length > 0) {
            const lastKey = this._accessors[this._accessors.length - 1]
            if(!Array.isArray(target[lastKey])) throw new Error(`Property ${lastKey} of ${JSON.stringify(target)} is not an array`)
            target[lastKey] = [...target[lastKey]]
            this.nextState = newObj
            this._clearAccessors()
            return target[lastKey]
        }
        this.nextState = newObj
        this._clearAccessors()
        return target
    }

    /**Removes the last element of the array at the current accessor path
     * and returns it.
     */
    pop(): any {
        let  array = this._getArray()
        return array.pop()
    }

    /**Adds the given element at the end of the array at the current
     * accessor path, and returns the value added.
     */
    push(value: any): any {
        let array = this._getArray()
        return array.push(value)
    }

    /**Reverses the array at the current accessor path. */
    reverse(): any[] {
        let array = this._getArray()
        return array.reverse()
    }

    /**Removes the first element from the array at the given accessor path
     * and returns it.
     */
    shift():any {
        let array = this._getArray()
        return array.shift()
    }

    /**Sorts the array at the current accessor path and returns it. */
    sort(...args: [((a:any, b: any) => number)?]): any[] {
        let array = this._getArray()
        return array.sort(...args)
    }

    /**Performs the slice operation on the array at the given accessor
     * path and returns the removed elements.
    */
    splice(...args: [number, number | undefined]): any[] {
        let array = this._getArray()
        return array.splice(...args)
    }
    
    /**Adds the given element to the array at the current accessor path
     * and returns the added element.
     */
    unshift(value: any): any {
        let array = this._getArray()
        return array.unshift(value)
    }

    fill(...args: [any, number?, number?]): any[] {
        let array = this._getArray()
        return (array as any).fill(...args)
    }

    copyWithin(...args: [number, number, number | undefined]): any[] {
        let array = this._getArray()
        return (array as any).copyWithin(...args)
    }
}