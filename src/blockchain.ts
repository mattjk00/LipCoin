import {Arr} from "./util"

export interface Block {
    readonly index: number,
    readonly hash:Array<number>,
    readonly previousHash:Array<number>
}

export function newBlock(index: number, previousHash:Array<number>):Block {
    return {
        index:index,
        hash:Arr.empty<number>(32, 0),
        previousHash:previousHash
    } as Block
}
