import {Block,newBlock,verifyBlock, Blockchain, newBlockchain,pushBlock,lastHash, generateKeys} from "./src/blockchain"
import {Arr} from "./src/util"
import {Transaction, signTransaction, newTransaction, verifyTransaction} from "./src/transaction"

let bc = newBlockchain();

let b = newBlock(bc.chain.length, lastHash(bc));
let t = newTransaction(Arr.empty<number>(32, 1), Arr.empty<number>(32, 2), 5);
let keys = generateKeys();
t = signTransaction(t, keys);
b.transactions.push(t);
bc = pushBlock(bc,b);

let b2 = newBlock(bc.chain.length, lastHash(bc));
bc = pushBlock(bc,b2);

console.log(bc.chain);
console.log(`Verified: ${verifyBlock(b2, b)}`);