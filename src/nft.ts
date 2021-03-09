enum MediaType {
    Image,
    Audio,
    Text
}

interface Token {
    type:MediaType,
    hash:Array<number>,
    signature:Array<number>,
    creator:Array<number>,
    url:String,
    price:number
}