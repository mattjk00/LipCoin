export namespace Arr {
    export function empty<T>(size:number, val:T): Array<T> {
        let a = [];
        for (let i = 0; i < size; i++) {
            a.push(val);
        }
        return a;
    }
}


export interface Some<T> {
    value:T,
    tag:"Option"
}

export interface None {
    tag:"None"
}

export type Option<T> = Some<T> | None;

export function some<T>(val:T):Option<T> {
    return {value:val} as Some<T>
}

export function none<T>():Option<T> {
    return {} as None;
}

export function matchFn<T>(opt:Option<T>, onsome:Function, onnone:Function) {
    if (opt.tag == "None") {
        return onnone();
    } else {
        return onsome();
    }
}
