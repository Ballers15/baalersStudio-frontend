/* eslint-disable no-unused-vars */
import "./Metamask.css";
import { toast } from "react-toastify";

export const globalWalletAddress = '';

export const disconnectWallet = () => {
    toast.dismiss()
    localStorage.removeItem('_wallet')
    toast.error('Wallet Disconnected')
  }

export const supportedChainList = {

  Mumbai:{
    chainId: `0x13881`,
    chainName: "Mumbai Testnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
    blockExplorerUrls: ["https://explorer-mumbai.maticvigil.com/"],
  },
    // Polygon: {
    //   chainId: '0x89',
    //   urlName: 'polygon',
    //   chainName: 'Polygon Mainnet',
    //   rpcUrls: ['https://polygon-rpc.com'],
    //   blockExplorerUrls: ['https://polygonscan.com/'],
    //   eventKey: 'Polygon:danger',
    //   variant: 'danger',
    //   nativeCurrency: {
    //   decimals: 18,
    //   symbol: 'MATIC',
    //   },
    // }
  };


export const getAccountDetails = async () => {
  if(ethereum.isMetaMask){
    toast.dismiss()
    // console.log("get account details");
 
  let wallet = await window.ethereum.request({
            method: "eth_requestAccounts"
          })
          let chainID = await window.ethereum .request({ method: "eth_chainId", })
          getDetailsFromChainId(chainID,wallet);
         localStorage.setItem('_wallet',wallet[0])
        toast.dismiss()
        toast.info('Wallet Connected')
            return wallet[0];
    } else {
    // setAccountDetails('')
    toast.info("Install MetaMask First");
  }
};

export  const connectWallet = async ( navigate) => {
  console.log('inside connect wallet')
  let _u = JSON.parse(localStorage.getItem('_u'));
  if(_u !== null){
  return await getAccountDetails();
  }
  else{
    navigate('/login');
  }
};

export const getDetailsFromChainId = async(chainId) => {
  let selectedChain = Object.keys(supportedChainList).map(async(e) => {
    if (supportedChainList[e].chainId === chainId) {
    return supportedChainList[e];
    } else {
      await switchNetwork();
      // return null;
    }
  });
  
    let filteredSelectedChain = selectedChain.filter((e) => e);
    // return(JSON.stringify(filteredSelectedChain[0]))
    console.log(filteredSelectedChain[0]	,'-------------------------chain details')
  return filteredSelectedChain[0];
  };


  export const switchNetwork = async (chainId) => {
    console.log(`switched to ${chainId} chain`);
    try {
      if (!window.ethereum) throw new Error("No crypto wallet found");
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          // {
          //   chainId: `0x${Number(137).toString(16)}`,
          //   chainName: "Polygon Mainnet",
          //   nativeCurrency: {
          //     name: "MATIC",
          //     symbol: "MATIC",
          //     decimals: 18,
          //   },
          //   rpcUrls: ["https://polygon-rpc.com/"],
          //   blockExplorerUrls: ["https://polygonscan.com/"],
          // },
          {
            chainId: `0x${Number(80001).toString(16)}`,
            chainName: "Mumbai Testnet",
            nativeCurrency: {
              name: "MATIC",
              symbol: "MATIC",
              decimals: 18,
            },
            rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
            blockExplorerUrls: ["https://explorer-mumbai.maticvigil.com/"],
          },
        ],
      });
    } catch (err) {
      console.log(err.message);
    }
  };