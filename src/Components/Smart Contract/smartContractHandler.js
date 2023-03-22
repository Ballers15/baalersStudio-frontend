import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

import {
  claimTokenAbi ,
  claimNftAbi,
  standardTokenAbi,
} from './SmartContract/SmartContract_ABI';

import { TransactionActions } from 'ReduxStore/Features/Transactions/TransactionsSlice';

const { ethereum } = window;


let web3 = new Web3(Web3.givenProvider);

const contract = new web3.eth.Contract(smartContractABI);

/** move this to enviroment in future */
let nftClaimContractAddress="0xd8E554EF17FaBfDa316B564518FBcf2071E961E3";
let tokenClaimContractAddress="";

/**
 * @returns  nft claim contract instance

 */
async function getNftContract() {
    let address = web3.utils.toChecksumAddress(nftClaimContractAddress);
    console.log("farm address",nftClaimContractAddress);
    let nftClaimContract = new web3.eth.Contract(claimNftAbi, address);
    return nftClaimContract;
}

async function getTokenContract() {
  let address = web3.utils.toChecksumAddress(tokenClaimContractAddress);
  console.log("farm address",tokenClaimContractAddress);
  let tokenClaimContract = new web3.eth.Contract(claimTokenAbi, address);
  return tokenClaimContract;
}


export const claimLottery=async(data)=>{
 
  let walletAddress = "";
 // get wallet address from localstorage and pass in var

  const claimContract=await getNftContract();


let contractData={
  tokenId:data.tokenId,
  quantity:data.quantity,
  nonce:data.nonce,
  signature:data.signature,
}


let claim=await claimContract.methods.claimNFT(contractData.tokenId,contractData.quantity,contractData.nonce,contractData.signature).send({ from: walletAddress });

console.log(claim);

/** hit api from here  */
} 




export const claimToken=async(data)=>{
  let walletAddress = "";
 // get wallet address from localstorage and pass in var
 
  const claimContract=await getTokenContract();


let contractData={
  token:data.token,
  amount:data.amount,
  nonce:data.nonce,
  signature:data.signature,
}

let claim=await claimContract.methods.claimNFT(contractData.token,contractData.nonce,contractData.amount,contractData.signature).send({ from: walletAddress });

console.log(claim);

/** hit api from here  */
} 