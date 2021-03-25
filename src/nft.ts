import { KeyPairKeyObjectResult, KeyObject, createSign, createVerify } from "crypto";

/**
 * The type of media a token could have
 */
export enum MediaType {
    Image,
    Audio,
    Text
}

/**
 * A token that can be created and then traded on the blockchain.
 */
export interface Token {
    type:MediaType,
    serial:number,
    timestamp:number,
    signature:Array<number>,
    creator:KeyObject,
    src:String,
    price:number,
    forsale:boolean
}

export function newSignedToken(type:MediaType, serial:number, price:number, src:String, creatorkey:KeyPairKeyObjectResult) {
    let token = {
        type:type,
        serial:serial,
        signature:new Array(),
        creator:creatorkey.publicKey,
        price:price,   
        src:src,
        timestamp:Date.now(),
        forsale:false
    } as Token;
    token = signToken(token, creatorkey);
    return token;
}

function tokenToString(t:Token):string {
    return `${t.type}${t.serial}${t.timestamp}${t.src}${t.price}`;
}

function signToken(t:Token, kp:KeyPairKeyObjectResult):Token {
    const sign = createSign('SHA256');
    let stringRep = tokenToString(t);
    sign.update(stringRep);
    sign.end();
    const signature = sign.sign(kp.privateKey);
    t.signature = [];
    t.signature.push(...signature);
    t.creator = kp.publicKey;
    return t;
}

export function verifyToken(t:Token):boolean {
    const verify = createVerify('SHA256');
    verify.update(tokenToString(t));
    verify.end();
    return verify.verify(t.creator, Buffer.from(t.signature));
}