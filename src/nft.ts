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
    hash:Array<number>,
    signature:Array<number>,
    creator:Array<number>,
    url:String,
    price:number
}

