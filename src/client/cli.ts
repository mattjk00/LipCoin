import { Blockchain, newBlockchain, newBlock, lastHash, pushBlock, calcBalance } from "../blockchain";
import { Wallet, loadWallet, newWallet, walletKeyPair } from "./wallet";
import { publicKeyAsArray } from "../transaction";
import { mineRoutine } from "../mine";
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

    state = promptAction(state);
    
}

function promptStartup(state:CState):CState {
    state = prompt(state, "\n[1] New Wallet\n[2] Existing Wallet\n",
        (s) => {
            console.clear();
            let wname = promptString("Wallet Name: ");
            s.wallet.name = wname;
            return s;
        },
        (s) => {
            console.clear();
            let wname = promptString("Load Wallet Name: ");
            // LOAD WALLET
            return s;
        }
    );
    
    return state;
}

function promptConnection(state:CState):CState {
    let endpoint = promptString("Connect to Network Address: ");
    // connect!
    return state;
}

function promptAction(state:CState):CState {
    state = prompt(state, "\n[1] Personal Mode\n[2] Miner Mode\n",
        (s) => {
            state = promptPersonalMode(state);
            return s;
        },
        (s) => {
            return s;
        }
    );
    return state;
}

function promptPersonalMode(state:CState):CState {
    let wb = calcBalance(state.blockchain, publicKeyAsArray(state.wallet.publicKey));
    console.log("Wallet Balance: ", wb);

    return state;
}

function startMine(state:CState):CState {
    let block = newBlock(state.blockchain.chain.length, lastHash(state.blockchain));
    block = mineRoutine(state.blockchain, block, walletKeyPair(state.wallet));
    state.blockchain = pushBlock(state.blockchain, block);
    return state;
}

function prompt(state:CState, msg:string, ...handlers:((s:CState) => CState)[]):CState {
    rl.question(msg, (ans:number) => {
        
        if (ans <= 0 || ans > handlers.length) {
            console.log("Invalid Response.");
            return state;
        } else {
            
            handlers[ans-1](state);
        }
        rl.close();
    });
    return state;
}

function promptString(msg:string):string {
    let answer:string = "";
    rl.question(msg, (ans:string) => {
        answer = ans;
        rl.close();
    });
    return answer;
}