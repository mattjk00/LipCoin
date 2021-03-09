import {Block,newBlock,verifyBlock, Blockchain, newBlockchain,pushBlock,lastHash} from "./src/blockchain"
import {Arr} from "./src/util"

let bc = newBlockchain();

let b = newBlock(bc.chain.length, lastHash(bc));
bc = pushBlock(bc,b);

let b2 = newBlock(bc.chain.length, lastHash(bc));
bc = pushBlock(bc,b2);

console.log(bc.chain);
console.log(`Verified: ${verifyBlock(b2, b)}`);