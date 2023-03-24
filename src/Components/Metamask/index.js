/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./Metamask.css";
import ErrorMessage from "./errorMessage";
import { useNavigate } from 'react-router-dom'

const Metamask = () => {
	const [error, setError] = useState("No Error");
	const [accountDetails, setAccountDetails] = useState('');
  const navigate = useNavigate();
  const [walletAddress, setWalletaddress] = useState();
  const redirectPath = '/';

	const supportedChainList = {
		Polygon: {
			chainId: '0x89',
			urlName: 'polygon',
			chainName: 'Polygon Mainnet',
			rpcUrls: ['https://polygon-rpc.com'],
			blockExplorerUrls: ['https://polygonscan.com/'],
			eventKey: 'Polygon:danger',
			variant: 'danger',
			nativeCurrency: {
			decimals: 18,
			symbol: 'MATIC',
			},
		}
	};

  const saveNewAddress = (address) =>{
    setWalletaddress(address)
    localStorage.setItem('_wallet',address)  
  }
  const getAccountDetails = async ({ networkName, setError }) => {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum
        .request({
          method: "eth_requestAccounts"
        })
        .then((res) => {
          window.ethereum
            .request({
              method: "eth_chainId",
            })
			  .then((chainID) => {
				  getDetailsFromChainId(chainID,res);
          setWalletaddress(res)
          localStorage.setItem('_wallet',res)
            });
        })
		  .catch((err) => {
			setAccountDetails('')
          console.log(err);
        });
	} else {
		setAccountDetails('')
		
      alert("Install MetaMask First");
    }
  };

  const connectWallet = async (networkName) => {
    setError();
    await getAccountDetails({ networkName, setError });
  };
	
  const getDetailsFromChainId = (chainId) => {
	let selectedChain = Object.keys(supportedChainList).map((e) => {
	  if (supportedChainList[e].chainId === chainId) {
		return supportedChainList[e];
    } else {
      return null;
    }
	});
  
	  let filteredSelectedChain = selectedChain.filter((e) => e);
	  setAccountDetails(JSON.stringify(filteredSelectedChain[0]))
	  console.log(filteredSelectedChain[0]	,'-------------------------chain details')
	return filteredSelectedChain[0];
  };

  const switchNetwork = async (chainId) => {
    console.log({ chainId });
    console.log("switched to chainId chain");
    try {
      if (!window.ethereum) throw new Error("No crypto wallet found");
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: `0x${Number(137).toString(16)}`,
            chainName: "Polygon Mainnet",
            nativeCurrency: {
              name: "MATIC",
              symbol: "MATIC",
              decimals: 18,
            },
            rpcUrls: ["https://polygon-rpc.com/"],
            blockExplorerUrls: ["https://polygonscan.com/"],
          },
        ],
      });
    } catch (err) {
      setError(err.message);
    }
  };
	
	const redirectToAuthRute = () => {
		localStorage.setItem('isConnected', true);
        navigate(redirectPath, { replace: true })
		
	}

  useEffect(() => {
    const wallet=localStorage.getItem('_wallet');
    if(wallet){
      setWalletaddress(wallet)
    }
    try {
		// if (typeof window.ethereum == "undefined") {
		//   return alert('Please install MetaMask');
		// }
		window.ethereum?.on('accountsChanged', saveNewAddress);
		window.ethereum?.on('chainChanged', switchNetwork); 
	  } catch (error) {
		console.log(error);
		throw new Error('No ethereum Object');
	  }
	  return () => {
		// window.ethereum?.removeListener('accountsChanged', handleAccountChange);
		window.ethereum?.removeListener('chainChanged', switchNetwork);
	  };
	  // eslint-disable-next-line
  }, []);

}

export default Metamask;
