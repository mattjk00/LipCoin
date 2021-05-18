import { Blockchain, newBlockchain, newBlock, lastHash, pushBlock, calcBalance } from "../blockchain";
import { Wallet, loadWallet, newWallet, walletKeyPair } from "./wallet";
import { publicKeyAsArray } from "../transaction";
import { mineRoutine } from "../mine";
const readline = require('readline');
const prompt = require('prompt-sync')({sigint:true});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

console.log("*~* LIPCOIN CLI *~*");
let mutex:boolean = false;
main();



interface CState {
    blockchain:Blockchain,
    wallet:Wallet,
    miningMode:boolean
}

function unlock() {
    if (mutex) {
        mutex = false;
    }
}

function acquireLock() {
    while (mutex);
    mutex = true;
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
    state = promptQuestion(state, "[1] New Wallet\n[2] Existing Wallet",
        (s) => {
            console.clear();
            let wname = prompt("Wallet Name: ");
            s.wallet.name = wname;
            return s;
        },
        (s) => {
            console.clear();
            let wname = prompt("Load Wallet Name: ");
            // LOAD WALLET
            return s;
        }
    );
    
    return state;
}

function promptConnection(state:CState):CState {
    let endpoint = prompt("Connect to Network Address: ");
    // connect!
    return state;
}

function promptAction(state:CState):CState {
    state = promptQuestion(state, "\n[1] Personal Mode\n[2] Miner Mode\n",
        (s) => {
            acquireLock();
            state = promptPersonalMode(state);
            unlock();

            return s;
        },
        (s) => {
            state = startMine(state);
            unlock();
            console.log("\nNew Block!\n", state.blockchain.chain);
            return s;
        }
    );
    return state;
}

function promptPersonalMode(state:CState):CState {
    let wb = calcBalance(state.blockchain, publicKeyAsArray(state.wallet.publicKey));
    console.clear();
    
    let quit = false;
    do {
        console.log("Wallet Balance: ", wb);
        state = promptQuestion(state, "\n[1] Make Transaction\n[2] Transaction History\n[3] Mint NFT");
    } while(!quit);

    return state;
}

function startMine(state:CState):CState {
    let block = newBlock(state.blockchain.chain.length, lastHash(state.blockchain));
    block = mineRoutine(state.blockchain, block, walletKeyPair(state.wallet));
    
    acquireLock();
    state.blockchain = pushBlock(state.blockchain, block);
    return state;
}

function promptQuestion(state:CState, msg:string, ...handlers:((s:CState) => CState)[]):CState {
    //rl.question(msg, (ans:number) => {
    const msgs = msg.split('\n');
    msgs.forEach(m => {
        console.log(m);
    })
    let answerOkay = false;
    do {
        const ans = prompt("") as number;    
        
        if (isNaN(ans) || ans <= 0 || ans > handlers.length) {
            console.log("Invalid Response.");    
        } else {
            answerOkay = true;
            handlers[ans-1](state);
        }
    } while (answerOkay == false);
        //rl.close();
    //});
    return state;
}

/*function promptString(msg:string):string {
    let answer:string = "";
    rl.question(msg, (ans:string) => {
        answer = ans;
        rl.close();
    });
    return answer;
}*/