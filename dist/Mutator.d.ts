export declare class Mutator<T> {
    inital: T;
    current: T;
    accessors: (string | number)[];
    constructor(inital: T);
    a(accessorString: string): Mutator<T>;
    access(accessorString: string): Mutator<T>;
    set(value: any): T;
    get(): any;
    _getMutated(): {
        newObj: T;
        target: any;
    };
}
