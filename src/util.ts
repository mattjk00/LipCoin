export namespace Arr {
    export function empty<T>(size:number, val:T): Array<T> {
        let a = [];
        for (let i = 0; i < size; i++) {
            a.push(val);
        }
        return a;
    }
}