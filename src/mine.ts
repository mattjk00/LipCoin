import { Block, calcHash, Blockchain } from "./blockchain";
import { randomInt, KeyPairKeyObjectResult } from "crypto";
import { rewardTransaction } from "./transaction";

export const NPROOF = 1;
export const REWARD = 5;

/**
 * Randomizes the nonce of the block and tries to mine again.
 * @param b Block to mine a hash for
 */
export function tryMineHash(b:Block): Block {
    b.nonce++;// NAIVE MINER = randomInt(2^10);
    b.hash = calcHash(b);
    return b;
}

/**
 * Checks to see if leading zeroes of given block's hash has sufficient proof.
 * Number of leading zeroes defined in NPROOF.
 * @param b Block to check the work of.
 */
export function hasProofOfWork(b:Block):boolean {
    for (let i = 0; i < NPROOF; i++) {
        if (b.hash[i] != 0) {
            return false;
        }
    }
    return true;
}

/**
 * Will mine until a sufficient hash is found.
 * @param b Block to mine a hash for
 */
export function mineRoutine(bc:Blockchain, b:Block, kp:KeyPairKeyObjectResult): Block {
    b.transactions.push(rewardTransaction(bc.chain[0].hash, kp));
    do {
        b = tryMineHash(b);
        console.log(b.hash[0]);
    } while (hasProofOfWork(b) == false);
    return b;
}