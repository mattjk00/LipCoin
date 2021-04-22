import { Blockchain, newBlockchain } from "../blockchain";
import { Wallet, loadWallet, newWallet } from "./wallet";
import { publicKeyAsArray } from "../transaction";
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

console.log("*~* LIPCOIN CLI *~*");
main();

interface CState {
    blockchain:Blockchain,
    wallet:Wallet
}

function main() {
    let state = {
        blockchain:newBlockchain(),
        wallet:newWallet()
    } as CState;
    state = promptStartup(state);
}

function promptStartup(state:CState):CState {
    rl.question("\n[1] New Wallet\n[2] Existing Wallet\n", (ans:Number) => {
        if (ans == 1) {
            console.clear();
            console.log("Wallet name: ");
            //let keyarray= publicKeyAsArray(state.wallet.publicKey);
            console.log();
            return state;
        }
        rl.close();
    });
    return state;
}