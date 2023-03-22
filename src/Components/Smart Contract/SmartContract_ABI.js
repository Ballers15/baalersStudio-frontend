const claimTokenAbi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_signerAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "Paused",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "Unpaused",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "signer",
				"type": "address"
			}
		],
		"name": "signerAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "tokenWithdrawn",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "beneficiary",
				"type": "address"
			}
		],
		"name": "transferAmount",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_token",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_nonce",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "_signature",
				"type": "bytes"
			}
		],
		"name": "claimToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "paused",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_signerAddress",
				"type": "address"
			}
		],
		"name": "setSignerAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "togglePause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			}
		],
		"name": "withdrawTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
]

const claimNftAbi=[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_signerAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_nft",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenID",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "currentTime",
				"type": "uint256"
			}
		],
		"name": "nftClaimed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenID",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "currentTime",
				"type": "uint256"
			}
		],
		"name": "nftWithdrawn",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "signer",
				"type": "address"
			}
		],
		"name": "signerAdded",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenID",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_nonce",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "_signature",
				"type": "bytes"
			}
		],
		"name": "claimNFT",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "nft",
		"outputs": [
			{
				"internalType": "contract IERC1155Supply",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"name": "onERC1155BatchReceived",
		"outputs": [
			{
				"internalType": "bytes4",
				"name": "",
				"type": "bytes4"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"name": "onERC1155Received",
		"outputs": [
			{
				"internalType": "bytes4",
				"name": "",
				"type": "bytes4"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_signerAddress",
				"type": "address"
			}
		],
		"name": "setSignerAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenID",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			}
		],
		"name": "withdrawNFT",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

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
