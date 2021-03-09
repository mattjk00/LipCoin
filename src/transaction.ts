import {Token} from "./nft"
import {Arr} from "./util"
type TValue = number|Token;

/**
 * Represents a transaction that can be saved in the blockchain
 */
export interface Transaction {
    sender:Array<number>,
    recipient:Array<number>,
    signature:Array<number>,
    value:TValue
}

/**
 * Constructs an UNSIGNED transaction with given information.
 * @param send Sender of the transaction
 * @param recipient Recipient of the transaction
 * @param value Value being transferred
 */
export function newTransaction(send:Array<number>, recipient:Array<number>, value:TValue) {
    return {
        sender:send,
        recipient:recipient,
        signature:Arr.empty<number>(32, 0),
        value:value
    } as Transaction;
}


//export function signTransaction(t:Transaction, )
