import {Arr, Rusty} from "./util"
import {createHash, generateKeyPairSync, createSign, createVerify, KeyPairKeyObjectResult, KeyObject} from "crypto"
import { Transaction, verifyTransaction } from "./transaction";

/**
 * Represents a block on the chain.
 */
export interface Block {
    index: number,                      // The index of the block in the chain
    timestamp:number,                   // The creation time
    hash:Array<number>,                 // The block hash
    previousHash:Array<number>,         // The hash of the previous block
    transactions:Array<Transaction>     // The list of transactions on the block
}

/**
 * Represents the blockchain.
 */
export interface Blockchain {
    chain:Array<Block>,
}

/**
 * Constructs an empty block.
 * @param index Index for the new block on the chain.
 * @param previousHash Hash of the previous block.
 */
export function newBlock(index: number, previousHash:Array<number>): Block {
    let block =  {
        index:index,
        timestamp:Date.now(),
        hash:Arr.empty<number>(32, 0),
        transactions:new Array(),
        previousHash:previousHash
    } as Block;

    block.hash = calcHash(block);
    return block;
}

/**
 * Constructs a new blockchain with genesis block.
 */
export function newBlockchain(): Blockchain {
    let genesis = newBlock(0, Arr.empty<number>(32, 0));
    let bc = {chain:new Array()} as Blockchain;
    bc.chain.push(genesis);
    return bc;
}

/**
 * Verifies a block then pushes it to the blockchain if it is verified.
 * @param bc The blockchain to push to
 * @param block The block to push
 * ```
 * // Use this kinda notation!
 * blockchain = pushBlock(blockchain, block);
 * ```
 */
export function pushBlock(bc:Blockchain, block:Block):Blockchain {
    let verified = verifyBlock(block, bc.chain[bc.chain.length-1]);
    if (verified) {
        bc.chain.push(block);
    }
    return bc;
}

/**
 * Returns the hash of the last block of a given blockchain.
 * @param bc Blockchain to retrieve hash from
 * @returns The last hash if found, otherwise an empty array.
 */
export function lastHash(bc:Blockchain):Array<number> {
    if (bc.chain.length > 0) {
        return bc.chain[bc.chain.length-1].hash;
    } else {
        return Arr.empty<number>(0,0);
    }
}

/**
 * Calculates a sha256 hash for a given block.
 * @param block Block to generate hash for.
 */
export function calcHash(block:Block): Array<number> {
    let a: Array<number> = [];
    let stringRep = `${block.index}${block.timestamp}${block.previousHash}`;
    let hash = createHash('sha256').update(stringRep).digest();
    a.push(...hash);
    return a;
}

/**
 * Verifies if a new block is valid.
 * Checks relationship between given block and previous and verifies the block's hash.
 * Also checks if transactions on the block are okay.
 * @param block Block to verify
 * @param prevBlock Supposed previous block to given
 */
export function verifyBlock(block:Block, prevBlock:Block): boolean {
    if (block.index == 0) {
        return true;
    }
    // confirm the relationship between the two blocks
    let linkOkay:boolean = block.previousHash == prevBlock.hash && block.index == prevBlock.index + 1;
    // confirm the block's hash
    let calcNew = calcHash(block);
    let hashOkay = Arr.equal<number>(block.hash, calcNew);

    let transactionsOkay = true;
    for (let t of block.transactions) {
        let verified = verifyTransaction(t);
        if (!verified) {
            transactionsOkay = false;
            break;
        }
    }
    return linkOkay && hashOkay && transactionsOkay;
}

/**
 * Replaces blockchain if given one is found to have more work.
 * @param bc Blockchain that may get replaced
 * @param chain The new chain to check against.
 */
export function replaceChain(bc:Blockchain, chain:Array<Block>): Blockchain {
    if (bc.chain.length < chain.length) {
        bc.chain = chain;
    }
    return bc;
}

/**
 * Generates an rsa keypair.
 */
export function generateKeys():KeyPairKeyObjectResult {
    const keypair = generateKeyPairSync('rsa', {
        modulusLength:2048
    });
    return keypair;
}