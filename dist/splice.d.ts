declare module './Mutator' {
    interface Mutator<T> {
        splice(start: number, deleteCount: number): any[];
    }
}
export {};
