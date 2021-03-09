import {Block,newBlock,verifyBlock} from "./src/blockchain"
import {Arr} from "./src/util"

let b = newBlock(0, Arr.empty<number>(32, 0));
let b2 = newBlock(1, b.hash);
console.log(b, b2);
console.log(`Verified: ${verifyBlock(b2, b)}`);