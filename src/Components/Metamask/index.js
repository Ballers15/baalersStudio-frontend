import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import './Metamask.css';
import ErrorMessage from './errorMessage'
const Metamask = () => {
    const [error, setError] = useState('No Error');


      
      const changeNetwork = async ({ networkName, setError }) => {
        // try {
        //   if (!window.ethereum) throw new Error("No crypto wallet found");
        //   await window.ethereum.request({
        //     method: "wallet_addEthereumChain",
        //     params: [
        //       {
        //         ...networks[networkName]
        //       }
        //     ]
        //   });
        // } catch (err) {
        //   setError(err.message);
        // }
        if (typeof window.ethereum !== 'undefined') {
            window.ethereum
              .request({ method: 'eth_requestAccounts', params: [{   chainId: `0x${Number(137).toString(16)}`,
              chainName: "Polygon Mainnet",
              nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC",
                decimals: 18
              },
              rpcUrls: ["https://polygon-rpc.com/"],
              blockExplorerUrls: ["https://polygonscan.com/"]}] })
              .then((res) => {
                const address = res[0];
                  window.ethereum.request({
                      method: 'eth_chainId'
                  }).then((chainID) => {
                    console.log({ address: address, isConnected: true, chainId: chainID });
                });
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            alert('Install MetaMask First');
          }
      };
      
      
        const handleNetworkSwitch = async (networkName) => {
          setError();
          await changeNetwork({ networkName, setError });
        };
      
        const networkChanged =async (chainId) => {
          console.log({ chainId });
            console.log('switched to chainId chain');
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
                  decimals: 18
                },
                rpcUrls: ["https://polygon-rpc.com/"],
                blockExplorerUrls: ["https://polygonscan.com/"]
              }
            ]
          });
        } catch (err) {
          setError(err.message);
        }
        };
      
        useEffect(() => {
          window.ethereum.on("chainChanged", networkChanged);
      
          return () => {
            window.ethereum.removeListener("chainChanged", networkChanged);
          };
        }, []);
      

    return (
        <React.Fragment>
            <div className="metamask">
                <div className="metamask-connect-container">
                    <h2 className="meta-h2">Connect your Wallet</h2>

                    <h4 className="meta-h4">At lacus vitae nulla sagittis scelerisque nisl. Pellentesque duis cursus vestibulum, facilisi ac, sed faucibus.</h4>
                </div>
                <div className="metamask-connect-container">
                    <button className="meta-btn metamask-connect-container"  onClick={() => handleNetworkSwitch("polygon")}>Connect Metamask Wallet</button>
                    {/* {account ? (
                        <p>
                          Account: <code style={{ display: "inline" }}>{account}</code>
                        </p>
                    ) : (
                            
                      )}
                      {provider && account && (
                        <>
                          <Balance provider={provider} account={account} />
                        </>
                      )} */}
                    {/* <button className="meta-btn metamask-connect-container">Disconnect Wallet</button> */}
                </div>
                <div className="metamask-connect-container">
                    <ErrorMessage message={error} />
                </div>
                <div className="metamask-connect-container">
                  <span className="meta-logo"></span>
                </div>
            </div>
        </React.Fragment>
    )

}

export default Metamask;
