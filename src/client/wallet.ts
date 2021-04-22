import { KeyObject, KeyPairKeyObjectResult, createPrivateKey, createPublicKey } from "crypto";
import { generateKeys } from "../blockchain";

export interface Wallet {
    privateKey:KeyObject,
    publicKey:KeyObject,
    name:String
}

export function loadWallet(privateKey:string, name="None"):Wallet {
    let privkey = createPrivateKey(privateKey);
    let pubkey = createPublicKey(privkey);
    let wallet = {
        privateKey:privkey,
        publicKey:pubkey,
        name:name   
    } as Wallet;
    return wallet;
}

export function newWallet():Wallet {
    let keys = generateKeys();
    let wallet = {
        privateKey:keys.privateKey,
        publicKey:keys.publicKey,
        name:"None"   
    } as Wallet;
    return wallet;
}