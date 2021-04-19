import {Block,newBlock,verifyBlock, Blockchain, newBlockchain,pushBlock,lastHash, generateKeys, blockSpenders, calcBalance, exportKey} from "./src/blockchain"
import {Arr} from "./src/util"
import {Transaction, signTransaction, newTransaction, verifyTransaction, publicKeyAsArray} from "./src/transaction"
import { mineRoutine } from "./src/mine";
import { KeyObject, createPublicKey, createPrivateKey, KeyExportOptions } from "crypto";

let bc = newBlockchain();

let b = newBlock(bc.chain.length, lastHash(bc));

let keys = generateKeys();
let t = newTransaction(publicKeyAsArray(keys.publicKey), Arr.empty<number>(32, 2), 5);
t = signTransaction(t, keys);
b.transactions.push(t);
b = mineRoutine(bc, b, keys);
bc = pushBlock(bc,b);
//console.log(bc.chain[1].transactions);


let b2 = newBlock(bc.chain.length, b.hash);
b2 = mineRoutine(bc, b2, keys);
bc = pushBlock(bc,b2);

//console.log(bc.chain);
//onsole.log(`Verified: ${verifyBlock(bc, b2, b)}`);

console.log(
    //Array.from( blockSpenders(bc.chain[1]).keys() )
    calcBalance(bc, publicKeyAsArray(keys.publicKey))
)
