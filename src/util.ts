/**
 * Contains utility functions related to arrays.
 */
export namespace Arr {
    /**
     * Creates an empty array of given size with a default value.
     * @param size Array size
     * @param val Fill value
     */
    export function empty<T>(size:number, val:T): Array<T> {
        let a = [];
        for (let i = 0; i < size; i++) {
            a.push(val);
        }
        return a;
    }

    /**
     * Returns true if the contents of a match b. Order matters.
     * @param a Array A
     * @param b Array B
     */
    export function equal<T>(a:Array<T>, b:Array<T>): boolean {
        if (a.length != b.length) {
            return false;
        }
        for (let i = 0; i < a.length; i++) {
            if (a[i] != b[i]) {
                return false;
            }
        }
        return true;
    }
}

/**
 * Contains a rough prototype of the Rust style Option<T> enum.
 */
export namespace Rusty {
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
            return onnone(opt);
        } else {
            return onsome(opt);
        }
    }
}

