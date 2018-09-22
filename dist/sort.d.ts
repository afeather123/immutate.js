declare module './Mutator' {
    interface Mutator<T> {
        sort(compare?: (a: any, b: any) => number): any[];
    }
}
export {};
