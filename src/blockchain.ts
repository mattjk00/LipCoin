import {Arr, Option, None, some, none} from "./util"
import {createHash} from "crypto"

export interface Block {
    index: number,
    timestamp:number,
    hash:Array<number>,
    previousHash:Array<number>
}

export function newBlock(index: number, previousHash:Array<number>): Block {
    let block =  {
        index:index,
        timestamp:Date.now(),
        hash:Arr.empty<number>(32, 0),
        previousHash:previousHash
    } as Block;

    block.hash = calcHash(block);
    return block;
}

function calcHash(block:Block): Array<number> {
    let a: Array<number> = [];
    let stringRep = `${block.index}${block.timestamp}${block.previousHash}`;
    let hash = createHash('sha256').update(stringRep).digest();
    a.push(...hash);
    return a;
}