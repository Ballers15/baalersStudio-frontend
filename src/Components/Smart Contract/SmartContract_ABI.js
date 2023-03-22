const smartContract = [{"inputs":[{"internalType":"address[]","name":"_signers","type":"address[]"},{"internalType":"uint256","name":"_numOfSigners","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"}],"name":"ownerAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"}],"name":"ownerRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transactionDone","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_isValidSigner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"address","name":"token","type":"address"}],"internalType":"struct MultiSigSafe.WithdrawalInfo","name":"_txn","type":"tuple"},{"internalType":"uint256","name":"_nonce","type":"uint256"},{"internalType":"bytes[]","name":"_multiSignature","type":"bytes[]"}],"name":"_verifyMultiSignature","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"bytes[]","name":"_multiSignature","type":"bytes[]"},{"internalType":"uint256","name":"_ownerNo","type":"uint256"}],"name":"addOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"nonce","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ownerNo","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"removalOwnerNonce","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"bytes[]","name":"_removeSignatures","type":"bytes[]"},{"internalType":"uint256","name":"_removalOwnerNonce","type":"uint256"}],"name":"removeOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"address","name":"token","type":"address"}],"internalType":"struct MultiSigSafe.WithdrawalInfo","name":"_txn","type":"tuple"},{"internalType":"uint256","name":"_nonce","type":"uint256"},{"internalType":"bytes[]","name":"_multiSignature","type":"bytes[]"}],"name":"withdrawETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]


const standardTokenAbi=[{
  "constant": true,
  "inputs": [],
  "name": "name",
  "outputs": [
  {
  "name": "",
  "type": "string"
  }
  ],
  "payable": false,
  "type": "function"
  },
  {
  "constant": true,
  "inputs": [],
  "name": "symbol",
  "outputs": [
  {
  "name": "",
  "type": "string"
  }
  ],
  "payable": false,
  "type": "function"
  },
  {
  "constant": true,
  "inputs": [],
  "name": "decimals",
  "outputs": [
  {
  "name": "",
  "type": "uint8"
  }
  ],
  "payable": false,
  "type": "function"
  },
  {
  "constant": true,
  "inputs": [],
  "name": "totalSupply",
  "outputs": [
  {
  "name": "",
  "type": "uint256"
  }
  ],
  "payable": false,
  "type": "function"
  },
  {
  "constant": true,
  "inputs": [
  {
  "name": "_owner",
  "type": "address"
  }
  ],
  "name": "balanceOf",
  "outputs": [
  {
  "name": "balance",
  "type": "uint256"
  }
  ],
  "payable": false,
  "type": "function"
  },
  {
  "constant": false,
  "inputs": [
  {
  "name": "_to",
  "type": "address"
  },
  {
  "name": "_value",
  "type": "uint256"
  }
  ],
  "name": "transfer",
  "outputs": [
  {
  "name": "success",
  "type": "bool"
  }
  ],
  "payable": false,
  "type": "function"
  },
  {
  "constant": false,
  "inputs": [
  {
  "name": "_from",
  "type": "address"
  },
  {
  "name": "_to",
  "type": "address"
  },
  {
  "name": "_value",
  "type": "uint256"
  }
  ],
  "name": "transferFrom",
  "outputs": [
  {
  "name": "success",
  "type": "bool"
  }
  ],
  "payable": false,
  "type": "function"
  },
  {
  "constant": false,
  "inputs": [
  {
  "name": "_spender",
  "type": "address"
  },
  {
  "name": "_value",
  "type": "uint256"
  }
  ],
  "name": "approve",
  "outputs": [
  {
  "name": "success",
  "type": "bool"
  }
  ],
  "payable": false,
  "type": "function"
  },
  {
  "constant": true,
  "inputs": [
  {
  "name": "_owner",
  "type": "address"
  },
  {
  "name": "_spender",
  "type": "address"
  }
  ],
  "name": "allowance",
  "outputs": [
  {
  "name": "remaining",
  "type": "uint256"
  }
  ],
  "payable": false,
  "type": "function"
  },
  {
  "anonymous": false,
  "inputs": [
  {
  "indexed": true,
  "name": "_from",
  "type": "address"
  },
  {
  "indexed": true,
  "name": "_to",
  "type": "address"
  },
  {
  "indexed": false,
  "name": "_value",
  "type": "uint256"
  }
  ],
  "name": "Transfer",
  "type": "event"
  },
  {
  "anonymous": false,
  "inputs": [
  {
  "indexed": true,
  "name": "_owner",
  "type": "address"
  },
  {
  "indexed": true,
  "name": "_spender",
  "type": "address"
  },
  {
  "indexed": false,
  "name": "_value",
  "type": "uint256"
  }
  ],
  "name": "Approval",
  "type": "event"
  },
  {
  "inputs": [
  {
  "name": "_initialAmount",
  "type": "uint256"
  },
  {
  "name": "_tokenName",
  "type": "string"
  },
  {
  "name": "_decimalUnits",
  "type": "uint8"
  },
  {
  "name": "_tokenSymbol",
  "type": "string"
  }
  ],
  "payable": false,
  "type": "constructor"
  },
  {
  "constant": false,
  "inputs": [
  {
  "name": "_spender",
  "type": "address"
  },
  {
  "name": "_value",
  "type": "uint256"
  },
  {
  "name": "_extraData",
  "type": "bytes"
  }
  ],
  "name": "approveAndCall",
  "outputs": [
  {
  "name": "success",
  "type": "bool"
  }
  ],
  "payable": false,
  "type": "function"
  },
  {
  "constant": true,
  "inputs": [],
  "name": "version",
  "outputs": [
  {
  "name": "",
  "type": "string"
  }
  ],
  "payable": false,
  "type": "function"
  }
]




// export default standardTokenAbi;

export { smartContract,standardTokenAbi};
