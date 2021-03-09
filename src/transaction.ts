type TValue = number|Token;

interface Transaction {
    sender:Array<number>,
    recipient:Array<number>,
    signature:Array<number>,
    value:TValue
}
