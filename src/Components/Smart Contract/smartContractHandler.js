import Web3 from 'web3';
import { withdrawLottery, withdrawReward } from '../../Pages/Pots/withdrawlLottery';
import {  toast } from 'react-toastify';
import {
  claimTokenAbi ,
  claimNftAbi,
} from './SmartContract_ABI';
import { setIsClaimedTrue } from '../Redux/actions';
import { store } from '../Redux/store';
import { environment } from '../../Environments/environment';
import { useSelector } from 'react-redux';


const { ethereum } = window;
let web3 = new Web3(Web3.givenProvider);
const walletAddress = store.getState().wallet.walletAddress


// const contract = new web3.eth.Contract(smartContractABI);

/** move this to enviroment in future */
let nftClaimContractAddress= environment.nftClaimContractAddress;
let tokenClaimContractAddress=environment.tokenClaimContractAddress;

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
async function getDecimals(){
  return 18;
}

export const claimNft=async(data)=>{
//  console.log('calim nft',data)
  // console.log('wlt',walletAddress)
// get wallet address from localstorage and pass in var
  const claimContract=await getNftContract();
  console.log('claim contract' ,claimContract)
let contractData={
  tokenId:data.tokenId,   //claimData.potDetails.ticker
  quantity:data.quantity, //claimData.potDetails.rewardTokenAmount
  nonce:data.nonce,       //transactionDetails.nonce
  signature:data.signature,  //transactionDetails.signature
}


let withdrawlObject = {
  walletAddress: walletAddress,
  potId:data?.potId,
  withdrawlId: data?.withdrawlId,
}

console.log("withdrawlObject",withdrawlObject)
  
try{
  let nft = claimContract.methods.claimNFT(contractData.tokenId,contractData.quantity,contractData.nonce,contractData.signature).send({ from: walletAddress })
  .once('transactionHash',  function(hash){
    console.log(hash);
   let obj= {transactionHash:hash}
    // txnHash:dataNft?.transactionHash ,
    withdrawlObject.txnHash=hash;
   withdrawLottery(withdrawlObject)
   console.log(obj);

  })
  .once('receipt',async function(receipt){
    console.log('receipt before conf')
    await withdrawLottery(withdrawlObject)
    store.dispatch(setIsClaimedTrue(true));
  })
  toast.dismiss()
  toast.promise(nft, {
  pending: "Transaction sent successfully",
  success: "Transaction is Confirmed",
  error: "Transaction Rejected!"
 })
}

catch(err){
  console.log(err);
}
/** hit api from here  */
} 



export const claimToken=async(data)=>{
 
  const claimContract=await getTokenContract();
  // const getDecimals=await getDecimals();

let contractData={
  token:data.contractAddress,
  amount:(data.amount),
  nonce:data.nonce,
  signature:data.signature,
  
}

let withdrawlObject = {
  walletAddress: walletAddress,
  potId:data?.potId,
  withdrawlId: data?.withdrawlId,
}


try{
  console.log("withdrawlObject",withdrawlObject)
  console.log('contract data',contractData);
  console.log('walll',walletAddress);

 let token=claimContract.methods.claimToken(contractData.token,contractData.nonce,contractData.amount,contractData.signature).send({ from: walletAddress })
 .once('transactionHash',  function(hash){
  console.log(hash);
 let obj= {transactionHash:hash}
  // txnHash:dataNft?.transactionHash ,
  withdrawlObject.txnHash=hash;
  withdrawReward(withdrawlObject)
   console.log(obj);

 
 })
.once('receipt', async function(receipt){
  console.log('receipt before conf')
 await withdrawReward(withdrawlObject)
  store.dispatch(setIsClaimedTrue(true));
 })
 toast.dismiss()
 toast.promise(token, {
  pending: "Transaction sent successfully",
  success: "Transaction is Confirmed",
  error: "Transaction Rejected !"
 })
}
catch(err){
  console.log(err);
}
/** hit api from here  */
} 