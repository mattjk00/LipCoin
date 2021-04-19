import { KeyObject, KeyPairKeyObjectResult, createPrivateKey, createPublicKey } from "crypto";

export interface Wallet {
    privateKey:KeyObject,
    publicKey:KeyObject
}

export function loadWallet(privateKey:string):Wallet {
    let privkey = createPrivateKey(privateKey);
    let pubkey = createPublicKey(privkey);
    let wallet = {
        privateKey:privkey,
        publicKey:pubkey   
    } as Wallet;
    return wallet;
}