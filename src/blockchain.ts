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

export function verifyBlock(block:Block, prevBlock:Block): boolean {
    if (block.index == 0) {
        return true;
    }
    let linkOkay:boolean = block.previousHash == prevBlock.hash && block.index == prevBlock.index + 1;
    let calcNew = calcHash(block);
    let hashOkay = Arr.equal<number>(block.hash, calcNew);
    return linkOkay && hashOkay;
}