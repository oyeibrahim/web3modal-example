
// #################################################################
// GET Functions
// #################################################################
//load Token Ticker
export const loadTokenTicker = async (tokenContract) => {
    const result = await tokenContract.symbol();
    return result;
};

//load ETH Balance
export const loadEthBalance = async (formatUnits, provider, account) => {
    const result = await provider.getBalance(account);
    return formatUnits(result, 18);
};

//load Token Balance
export const loadTokenBalance = async (formatUnits, tokenContract, account) => {
    const result = await tokenContract.balanceOf(account);
    return formatUnits(result, 18);
    // return library.utils.fromWei(result, 'ether');
};




// #################################################################
// SET Functions
// #################################################################


// load Send Eth
export const loadSendEth = async (signer, recipientAddress, amountEth) => {
    if (!amountEth || amountEth <= 0) {
        return {
            status: "Please enter a valid amount to transfer.",
        };
    }

    // Set up transaction parameters
    const transactionParameters = {
        to: recipientAddress,
        value: amountEth
    };

    // Sign and send the transaction
    try {
        const tx = await signer.sendTransaction(transactionParameters);
        const receipt = await tx.wait();
        return {
            status: (
                `✅ Transfer Successful. Tx Hash - ${receipt.hash}`
            ),
            smUpdate: (`Smart Contract Updated ${receipt.hash}`)
        };
    } catch (error) {
        return {
            status: error.info.error.message,
        };
    }
};



//load Send Tokens
export const loadSendTokens = async (tokenContract, recipientAddress, amountToken) => {

    if (amountToken.toString().trim() === "" || amountToken <= 0) {
        return {
            status: "Please enter a valid amount to transfer.",
        };
    }

    // sign the transaction
    try {
        const tx = await tokenContract.transfer(recipientAddress, amountToken);
        const receipt = await tx.wait();
        return {
            status: (
                `✅ Transfer Successful. Tx Hash - ${receipt.hash}`
            ),
            smUpdate: (`Smart Contract Updated ${receipt.hash}`)
        };
    } catch (error) {
        return {
            status: error.info.error.message,
        };
    }
};




// The receipt object
// {
//     "_type": "TransactionReceipt",
//     "blockHash": "0x779940dc4c4fc546bdf7812a6d30502883554bec45938afb0ed5ca67632e66e9",
//     "blockNumber": 40270871,
//     "contractAddress": null,
//     "cumulativeGasUsed": "1386771",
//     "from": "0x70745f91ae64e8d83cae762B65F6456bD233347B",
//     "gasPrice": "3000000000",
//     "blobGasUsed": null,
//     "blobGasPrice": null,
//     "gasUsed": "21000",
//     "hash": "0x37e1f692d76f3ca538ed031e4f647ed195787cb17a2d386a7ad85af1daf3b4e7",
//     "index": 30,
//     "logs": [],
//     "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
//     "status": 1,
//     "to": "0x27dbaCfC642ce003048F62a4e7f68A32dF0aA3C7"
// }


