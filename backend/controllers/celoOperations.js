const { Web3 } = require('web3');
const ContractKit = require('@celo/contractkit')

// Connect to the Celo network
let web3 = new Web3('https://alfajores-forno.celo-testnet.org');
let kit = ContractKit.newKitFromWeb3(web3);


// Function to create a new account
async function createAccount() {
    const account = web3.eth.accounts.create();
    kit.connection.addAccount(account.privateKey);
    return account;
}




// This is the first Account Created
//Query database for account details using the loggedin user Id
const senderAccount = {
    address: '0xD263C466E6aA620DF49495A6B6A4a8e49496F06C',
    privateKey: '0x18424a8c4a250461b3a6b43b9619f6f32ce3dddc70e68746bf6fa25fa86c2b64'
}
// let account = firstAccount;

//Query database of user Id to be awarded database and extract these information
// Second Account Created
const recieverAccount = {
    address: '0x22FF4c57Eec278D37a1D9B95E4232F699Cdc2184',
    privateKey: '0xb390bdd0b41772049126e36fd0478d60332242c22245037da06a7d534e789afd'
}

    // This is an object gotten from a file hashed after form was filled
    const datafromDB = {
        "certificateId": 1697889994160,
        "fileHash": "9edd956d2b7b3087406b7109ef21fe385675edb6feb6b76bc5d1d5a055b15e0b"
    }
 

// // Function to sign a transaction
async function signAndSendTransaction(_senderPrivateKey, _senderAddress , _recieverAddress){
    
// To use ContractKit to sign the transaction, you need to add your private key to the kit
    kit.connection.addAccount(_senderPrivateKey)
    kit.defaultAccount = _senderAddress

    // Connect to the network and get the current tx count
    let nonce = await kit.web3.eth.getTransactionCount(kit.defaultAccount)

    // Send 0.1 CELO
    let amount = kit.web3.utils.toWei("0.001", "ether")


    // This is an object gotten from a file hashed after form was filled
    let datafromDB = {
        "certificateId": 1697889994160,
        "fileHash": "9edd956d2b7b3087406b7109ef21fe385675edb6feb6b76bc5d1d5a055b15e0b"
    }
        // Encode the certificateID and hashCode into a string
    let data = web3.utils.asciiToHex(datafromDB.certificateId + ':' + datafromDB.fileHash);

    
    let CeloTx = {
        to: _recieverAddress, // omit recipient for a contract deployment
        from: _senderAddress,
        gas: 200000,               // surplus gas will be returned to the sender
        nonce: nonce,
        chainId: "44787",          // Alfajores chainId
        data: data,               // data to send for smart contract execution
        value: amount,
        
        // The following fields can be omitted and will be filled by ContractKit, if required 

        // gasPrice: "",    
        // gatewayFee: 0,       
        // gatewayFeeRecipient: "",
        // feeCurrency: ""
    }

    let tx = await kit.sendTransaction(CeloTx)
    let receipt = await tx.waitReceipt()

    console.log(`CELO tx: https://alfajores-blockscout.celo-testnet.org/tx/${receipt.transactionHash}`)

    return receipt
}

// sendCELOTx()


// Function to get transaction details
async function getTransactionDetails(txHash) {
    const tx = await web3.eth.getTransaction(txHash);
    const block = await web3.eth.getBlock(tx.blockNumber);
    
    // To extract the certificateId and hashCode from a transaction on the blockchain
    // Decode the data field
    const data = web3.utils.hexToAscii(tx.input);
    const [certificateId, hashCode] = data.split(':');
    
    return {
        timestamp: new Date(Number(block.timestamp) * 1000),
        hash: tx.hash,
        certificateId: certificateId,
        hashCode: hashCode
    };
}



// Sign a transaction and get transaction details
// signAndSendTransaction(senderAccount.privateKey, senderAccount.address , recieverAccount.address).then((signedTx) => {
//     console.log('Signed transaction:', signedTx);
    
//     getTransactionDetails(signedTx.transactionHash).then((details) => {
//         console.log('Transaction details:', details);
        
//         // Store the details in your database here
        
//     }).catch((error) => {
//         console.error('Error getting transaction details:', error);
//     });
// }).catch((error) => {
//     console.error('Error signing and sending transaction:', error);
// });


// let addressaddress = '0xD86518b29BB52a5DAC5991eACf09481CE4B0710d'

async function getBalances(address){

    // Get the token contracts
    let goldtoken = await kit.contracts.getGoldToken()
    let stabletoken = await kit.contracts.getStableToken()

    // Get token balances of anAddress
    let celoBalance = await goldtoken.balanceOf(address)
    let cUSDBalance = await stabletoken.balanceOf(address)

    // Print balances
    console.log(`${address} CELO balance: ${kit.web3.utils.fromWei(celoBalance.toString(), "ether")}`)
    console.log(`${address} cUSD balance: ${kit.web3.utils.fromWei(cUSDBalance.toString(), "ether")}`)
}
// getBalances('0xD263C466E6aA620DF49495A6B6A4a8e49496F06C')




// // To Call the function getTransactionDetails
// getTransactionDetails('0xc66eee59e2c57a54dc13a96a831ca049ed2da52794685985f7794cffed2dfbd6').then((details) => {
//     console.log('Transaction details:', details);
// }).catch((error) => {
//     console.error('Error getting transaction details:', error);
// });
       


module.exports = {
    createAccount,
    signAndSendTransaction,
    getBalances,
    getTransactionDetails
    
};