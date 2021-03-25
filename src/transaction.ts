import {Token} from "./nft"
import {Arr} from "./util"
import { KeyPairKeyObjectResult, createSign, KeyObject, createVerify, KeyExportOptions } from "crypto";
import { REWARD } from "./mine";
type TValue = number|Token;

/**
 * Represents a transaction that can be saved in the blockchain
 */
export interface Transaction {
    sender:Array<number>,
    recipient:Array<number>,
    signature:Array<number>,
    value:TValue,
    timestamp:number,
    signerkey:KeyObject
}

/**
 * Constructs an UNSIGNED transaction with given information.
 * @param send Sender of the transaction
 * @param recipient Recipient of the transaction
 * @param value Value being transferred
 */
export function newTransaction(send:Array<number>, recipient:Array<number>, value:TValue):Transaction {
    return {
        sender:send,
        recipient:recipient,
        signature:Arr.empty<number>(32, 0),
        value:value,
        timestamp:Date.now()
    } as Transaction;
}

export function isNum(val:TValue):boolean {
    return (val as Token).price == null;
}

/**
 * Constructs a signed transaction with given information.
 * @param send Sender of the transaction
 * @param recipient Recipient of the transaction
 * @param value Value being transferred
 * @param kp Keypair to sign the transaction with
 */
export function newSignedTransaction(send:Array<number>, recipient:Array<number>, value:TValue, kp:KeyPairKeyObjectResult):Transaction {
    let t = newTransaction(send, recipient, value);
    t = signTransaction(t, kp);
    return t;
}

export function rewardTransaction(genHash:Array<number>, kp:KeyPairKeyObjectResult):Transaction {
    let t = newTransaction(genHash, publicKeyAsArray(kp.publicKey), REWARD);
    t = signTransaction(t, kp);
    return t;
}

/**
 * Creates a string representation of the transaction.
 * @param t
 */
export function transactionToString(t:Transaction):string {
    return `${t.sender}${t.recipient}${t.value}${t.timestamp}`;
}

export function publicKeyAsArray(k:KeyObject):number[] {
    let arr:number[] = [];
    arr.push(...k.export({format:'pem', type:'pkcs1'} as KeyExportOptions<'pem'>) as Buffer);
    return arr;
}

/**
 * Signs a transaction. Transaction's signature and signerkey will be updated.
 * @param t Transaction to sign
 * @param kp Keypair to sign with
 */
export function signTransaction(t:Transaction, kp:KeyPairKeyObjectResult):Transaction {
    const sign = createSign('SHA256');
    let stringRep = transactionToString(t);
    sign.update(stringRep);
    sign.end();
    const signature = sign.sign(kp.privateKey);
    t.signature = [];
    t.signature.push(...signature);
    t.signerkey = kp.publicKey;
    
    return t;
}

/**
 * Verifies the signature on a transaction.
 * @param t Transaction to verify
 */
export function verifyTransaction(t:Transaction):boolean {
    const verify = createVerify('SHA256');
    verify.update(transactionToString(t));
    verify.end();
    return verify.verify(t.signerkey, Buffer.from(t.signature));
}