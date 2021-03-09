import {Block,newBlock} from "./src/blockchain"
import {Arr} from "./src/util"

let b = newBlock(0, Arr.empty<number>(32, 0));
console.log(b);