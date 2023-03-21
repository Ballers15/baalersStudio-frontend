import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

import { useDispatch, useSelector } from 'react-redux';
import { getDetailsFromChainId } from './supportedChains';
import {
  smartContract as smartContractABI,
  standardTokenAbi,
} from './SmartContract/SmartContract_ABI';
import SmartContractByteCode from './SmartContract/bytecode';
import {
  addNewSafeOwner,
  approveNewSafeOwner,
  createSafeTransaction,
  fetchAddressBook,
  getTransactionNonceFromBE,
  getSafeWalletFromMetaMaskWallet,
  initiateRemoveOwner,
  removeOwner,
  updateSafeTransaction,
  getNonceForAddingOwnerFromBE,
  getNonceForRemovingOwnerFromBE,
} from 'API/backendAPI';
import {
  getWalletDetailsFromBE,
  updateCurrentWalletChain,
  updateCurrentWalletState,
} from 'ReduxStore/Dispatchers/CurrentWalletDispatchers';
import {
  getSafeWalletAssets,
  udpateSafeWalletAssets,
  updateSafeWalletState,
} from 'ReduxStore/Dispatchers/SafeWalletDispatchers';
import { getSafeTransactionDetailsFromBE } from 'ReduxStore/Dispatchers/TransactionDispatchers';
import { showToaster } from 'ReduxStore/Dispatchers/ToasterDispatchers';
import { SafeWalletActions } from 'ReduxStore/Features/SafeWallet/SafeWalletSlice';
import { TransactionActions } from 'ReduxStore/Features/Transactions/TransactionsSlice';

const { ethereum } = window;

export const SmartContractContext = React.createContext();

export const SmartContractProvider = ({ children }) => {
  const dispatch = useDispatch();

  const web3 = new Web3(Web3.givenProvider);
  const contract = new web3.eth.Contract(smartContractABI);

  const currentWalletState = useSelector((state) => state.currentWallet);
  const safeWallet = useSelector((state) => state.safeWallet);
  const transactionDetails = useSelector((state) => state.transactionDetails);
  // const { pageNo } = transactionDetails;
  const pageNo = 1;

  const [contractAddress, setContractAddress] = useState('');
  const [connectedWallet, setConnectedWallet] = useState('');
  const [selectedChain, setSelectedChain] = useState(null);
  const convertBalanceToETH = (e) => {
    return `${web3.utils.fromWei(`${e}`, 'ether')} ${selectedChain.nativeCurrency.symbol}`;
  };

  const getEstimatedGas = async (safeOwners, minNoOfApprovals) => {
    const safeOwersArray = safeOwners.map((e) => e.walletAddress);

    return contract
      .deploy({
        data: SmartContractByteCode,
        arguments: [safeOwersArray, minNoOfApprovals],
      })
      .estimateGas();
    //
  };
  /* const getNonce = async () => {
    const contractInstance = new web3.eth.Contract(smartContractABI, contractAddress);
    const nonce = await contractInstance.methods.nonce().call();
    return nonce;
  }; */
  const getDecimals = async (tokenAddress) => {
    const contractInstance = new web3.eth.Contract(standardTokenAbi, tokenAddress);
    const decimals = await contractInstance.methods.decimals().call();
    return decimals;
  };
  const sendFunds = async (data) => {
    if (
      data.safeWalletOwners &&
      data.recepientAddress &&
      data.amount &&
      data.token &&
      data.currentWalletAddress &&
      data.transactionId
    ) {
      try {
        const {
          safeWalletOwners,
          recepientAddress,
          amount,
          token,
          currentWalletAddress,
          transactionId,
        } = data;
        const contractInstance = new web3.eth.Contract(smartContractABI, contractAddress);

        const signatureArray = safeWalletOwners.map((e) => {
          return e.signature;
        });
        let nonce = data.transactionNonce;
        const payment = await contractInstance.methods
          .withdrawETH([amount, recepientAddress, token], nonce, signatureArray)
          .send({ from: currentWalletAddress }); //metamask
        const params = {
          txnHash: payment.transactionHash,
          transactionId: transactionId,
        };
        await updateSafeTransaction(params)
          .then((res) => {
            getSafeTransactionDetailsFromBE(dispatch, safeWallet._id, pageNo);
            showToaster(dispatch, `Successful Payment`);
            getSafeWalletAssets(dispatch, safeWallet.contractAddress, selectedChain);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
        showToaster(dispatch, error.message);
      }
    } else {
      console.log('missing params');
    }
  };
  const signTransaction = async (data) => {
    try {
      let to = data.recepientAddress;
      let amount =
        data.token === '0x0000000000000000000000000000000000000000'
          ? Web3.utils.toWei(data.amount)
          : (data.amount * Math.pow(10, await getDecimals(data.token))).toString();

      let address = data.token;
      let _id = data.transactionId;
      let txn = {
        to,
        amount,
        address,
      };

      let web3encoded = web3.eth.abi.encodeParameters(
        ['uint256', 'address', 'address'],
        [txn.amount, txn.to, txn.address],
      );
      let nonce = '';
      if (!data.transactionId) {
        nonce = parseFloat(await getTransactionNonceFromBE(safeWallet._id)) + 1;
      } else {
        nonce = data.transactionNonce;
      }

      let web3encodedWithNonce = web3.utils.soliditySha3(
        { t: 'bytes', v: web3encoded },
        { t: 'uint256', v: nonce },
      );
      if (web3encodedWithNonce) {
        const signature = await window.ethereum.request({
          method: 'personal_sign',
          params: [connectedWallet, web3encodedWithNonce],
        });
        if (signature) {
          const params = {
            safeBackendId: safeWallet._id,
            tokenAddress: address,
            amount: data.amount,
            metaMaskWalletAddress: currentWalletState.address,
            signature,
            tokenName: data.tokenName,
            tokenSymbol: data.tokenSymbol,
            recepientAddress: to,
            transactionId: _id,
            transactionNonce: nonce,
          };
          await createSafeTransaction(params);
          getSafeTransactionDetailsFromBE(dispatch, safeWallet._id, pageNo);
        }
      }
    } catch (error) {
      throw error;
    }
  };
  const deployContract = async (params) => {
    const { safeOwners, minNoOfApprovals } = params;

    const safeOwersArrayNormalCase = safeOwners.map((e) => e.walletAddress);
    try {
      const gas = await contract
        .deploy({
          data: SmartContractByteCode,
          arguments: [safeOwersArrayNormalCase, minNoOfApprovals],
        })
        .estimateGas();
      return contract
        .deploy({
          data: SmartContractByteCode,
          arguments: [safeOwersArrayNormalCase, minNoOfApprovals],
        })
        .send({
          from: connectedWallet, // metamask wallet
          gas,
        });
    } catch (error) {
      console.log(error);
    }
  };

  const addOwner = async (data) => {
    try {
      const address = data.ownerAddress;
      let val = 'add';
      let txn = { address, val };
      let web3encoded = web3.eth.abi.encodeParameters(
        ['address', 'string'],
        [txn.address, txn.val],
      );
      let ownerNumber = '';
      if (!data.transactionId) {
        ownerNumber = parseFloat(await getNonceForAddingOwnerFromBE(safeWallet._id)) + 1;
      } else {
        ownerNumber = data.transactionNonce;
      }
      let web3encodedWithNonce = web3.utils.soliditySha3(
        { t: 'bytes', v: web3encoded },
        { t: 'uint256', v: ownerNumber },
      );
      if (web3encodedWithNonce) {
        const signature = await window.ethereum.request({
          method: 'personal_sign',
          params: [connectedWallet, web3encodedWithNonce],
        });
        if (signature) {
          const params = {
            safeId: safeWallet._id,
            newSafeOwnerAddress: data.ownerAddress,
            newSafeOwnerName: data.ownerName,
            currentWalletAddress: currentWalletState.address,
            signature,
            transactionId: data.transactionId,
            transactionNonce: ownerNumber,
          };
          const res = addNewSafeOwner(params)
            .then(async (res) => {
              await getSafeTransactionDetailsFromBE(dispatch, safeWallet._id, pageNo);
              let msg = `Request have been shared with other owners`;
              showToaster(dispatch, msg);
              return res.data.data;
            })
            .catch(console.log);
          return res;
          // construct params call api , update safe Details
        }
      }
    } catch (error) {
      showToaster(dispatch, error.message);
      return error;
    }
  };

  const approveOwner = async (data) => {
    if (data.address && data.signatureArray) {
      try {
        const contractInstance = new web3.eth.Contract(smartContractABI, contractAddress);
        const ownerNo = data.transactionNonce;
        const addedOwnerDetails = await contractInstance.methods
          .addOwner(data.address, data.signatureArray, ownerNo)
          .send({ from: currentWalletState.address }); //metamask

        if (addedOwnerDetails) {
          const params = {
            transactionId: data.transactionId,
            txnHash: addedOwnerDetails.transactionHash,
            newSafeOwnerAddress: data.address,
            safeId: safeWallet._id,
          };
          const success = await approveNewSafeOwner(params)
            .then((res) => {
              showToaster(dispatch, `Owner Added Successfully`);
              return res.data;
            })
            .catch((err) => {
              console.log(err);
            });
          await getSafeTransactionDetailsFromBE(dispatch, safeWallet._id, pageNo);
          const p = {
            walletAddress: currentWalletState.address,
            chain: selectedChain.urlName,
          };
          dispatch(getSafeWalletFromMetaMaskWallet(p));
          return success;
        }
      } catch (error) {
        console.log(error);
        showToaster(dispatch, error.message);
      }
    }
  };

  const updateSelectedChain = (chainId) => {
    const selectedChain = getDetailsFromChainId(chainId);
    setSelectedChain(selectedChain);
  };

  const switchMetaMaskChain = () => {
    window.ethereum
      .request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: selectedChain.chainId }],
      })
      .then(() => {
        showToaster(dispatch, 'Chain Successfully Switched');
      })
      .catch((err) => {
        if (err.code === 4902) {
          const chainDetails = {
            chainId: selectedChain.chainId,
            chainName: selectedChain.chainName,
            rpcUrls: selectedChain.rpcUrls,
            blockExplorerUrls: selectedChain?.blockExplorerUrls,
            nativeCurrency: {
              symbol: selectedChain.nativeCurrency.symbol,
              decimals: selectedChain.nativeCurrency.decimals,
            },
          };
          window.ethereum
            .request({
              method: 'wallet_addEthereumChain',
              params: [chainDetails],
            })
            .then(() => {
              showToaster(dispatch, 'Chain Added Successfully');
            })
            .catch((err) => {
              showToaster(dispatch, err.message);
            });
        }
      });
  };

  const signDeleteUser = async (data) => {
    try {
      const address = data.removedSafeOwnerAddress;
      let val = 'remove';
      let txn = { address, val };

      const { removedSafeOwnerName } = data;
      let web3encoded = web3.eth.abi.encodeParameters(
        ['address', 'string'],
        [txn.address, txn.val],
      );

      let removeOwnerNumber = '';
      if (!data.transactionNonce) {
        removeOwnerNumber = (await getNonceForRemovingOwnerFromBE(safeWallet._id)) + 1;
      } else {
        removeOwnerNumber = data.transactionNonce;
      }

      let web3encodedWithNonce = web3.utils.soliditySha3(
        { t: 'bytes', v: web3encoded },
        { t: 'uint256', v: removeOwnerNumber },
      );
      if (web3encodedWithNonce) {
        const signature = await window.ethereum.request({
          method: 'personal_sign',
          params: [connectedWallet, web3encodedWithNonce],
        });
        if (signature) {
          const params = {
            removedSafeOwnerAddress: address,
            removedSafeOwnerName: removedSafeOwnerName,
            safeId: safeWallet._id,
            currentWalletAddress: currentWalletState.address,
            signature,
            transactionId: data.transactionId,
            transactionNonce: removeOwnerNumber,
          };

          initiateRemoveOwner(params)
            .then((res) => {
              getSafeTransactionDetailsFromBE(dispatch, safeWallet._id, pageNo);
              showToaster(dispatch, 'Request has been forwareded to other Owners');
            })
            .catch(console.log);
        }
      }
    } catch (error) {
      console.log(error);
      showToaster(dispatch, error.message);
    }
  };
  const approveRemoveOwner = async (data) => {
    if (data.address && data.signatureArray) {
      try {
        const contractInstance = new web3.eth.Contract(smartContractABI, contractAddress);

        const removeOwnerNonce = data.transactionNonce;

        const removedOwnerDetails = await contractInstance.methods
          .removeOwner(data.address, data.signatureArray, removeOwnerNonce)
          .send({ from: currentWalletState.address });

        if (removedOwnerDetails) {
          const params = {
            transactionId: data.transactionId,
            txnHash: removedOwnerDetails.transactionHash,
            newSafeOwnerAddress: data.address,
            safeId: safeWallet._id,
          };
          const success = await removeOwner(params)
            .then((res) => {
              showToaster(dispatch, `Owner Removed Successfully`);
              return res.data;
            })
            .catch((err) => {
              console.log(err);
            });
          await getSafeTransactionDetailsFromBE(dispatch, safeWallet._id, pageNo);
          dispatch(
            getSafeWalletFromMetaMaskWallet({
              walletAddress: currentWalletState.address,
              chain: selectedChain.urlName,
            }),
          );

          return success;
        }
      } catch (error) {
        console.log(error);
        showToaster(dispatch, error.message);
      }
    }
  };

  /* ----------DND BLOCK------------ */
  const initializeWallet = async () => {
    try {
      let accounts = await ethereum.request({ method: 'eth_accounts' });
      if (!accounts.length) {
        accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      }
      if (accounts.length) {
        const chainID = await ethereum.request({ method: 'eth_chainId' });
        setConnectedWallet(accounts[0]);
        let chain = getDetailsFromChainId(chainID);
        if (!chain) {
          chain = getDetailsFromChainId('0x1');
        }
        setSelectedChain(chain);
        updateCurrentWalletState(dispatch, {
          address: accounts[0],
          isConnected: true,
          chainId: chainID,
          chainName: chain.chainName,
        });

        getWalletDetailsFromBE(dispatch, accounts[0], chain);
      } else {
        console.log('No accounts found');
      }
    } catch (err) {
      if (err.code === -32002) {
        showToaster(dispatch, `Please confirm the previous pending request on metamask`);
      } else showToaster(dispatch, `${err.message}`);
    }
  };
  const connectToMetaMaskWallet = async () => {
    try {
      if (!ethereum) {
        return alert('Please install MetaMask');
      }
      initializeWallet();
    } catch (err) {
      console.log(err);
      showToaster(dispatch, `${err.message}`);

      throw new Error('No ethereum Object');
    }
  };
  const disconnectFromMetaMask = () => {
    updateCurrentWalletState(dispatch);
    updateSafeWalletState(dispatch);
  };
  const handleAccountChange = (accounts) => {
    const currentAddress = currentWalletState.address;
    if (accounts && accounts.length === 0) {
      console.log('Please connect to metamask');
      updateCurrentWalletState(dispatch);
      showToaster(dispatch, 'Please connect to MetaMask');
      udpateSafeWalletAssets(dispatch, []);
    } else if (accounts[0] !== currentAddress) {
      initializeWallet();
    }
  };
  const handleChainChange = (chainId) => {
    const chain = getDetailsFromChainId(chainId);
    updateCurrentWalletChain(dispatch, chain);
  };
  useEffect(() => {
    if (selectedChain?.urlName) {
      dispatch(
        getSafeWalletFromMetaMaskWallet({
          walletAddress: currentWalletState.address,
          chain: selectedChain.urlName,
        }),
      );
    }
  }, [currentWalletState.metaMaskSelectedChainID, currentWalletState.address]);

  useEffect(() => {
    if (safeWallet?._id?.length) {
      dispatch(fetchAddressBook(safeWallet._id));
      getSafeTransactionDetailsFromBE(dispatch, safeWallet._id, pageNo);
    } else {
      dispatch(SafeWalletActions.updateAssets([]));
      dispatch(TransactionActions.updateTransactionDetails([]));
    }
  }, [safeWallet._id]);

  useEffect(() => {
    try {
      if (!ethereum) {
        return alert('Please install MetaMask');
      }
      initializeWallet();
      window.ethereum?.on('accountsChanged', handleAccountChange);
      window.ethereum?.on('chainChanged', handleChainChange);
    } catch (error) {
      console.log(error);
      throw new Error('No ethereum Object');
    }
    return () => {
      window.ethereum?.removeListener('accountsChanged', handleAccountChange);
      window.ethereum?.removeListener('chainChanged', handleChainChange);
    };
    // eslint-disable-next-line
  }, []);
  /* ----------------------------------------------- */
  useEffect(() => {
    if (safeWallet.contractAddress && selectedChain) {
      setContractAddress(safeWallet.contractAddress);
      getSafeWalletAssets(dispatch, safeWallet.contractAddress, selectedChain);
    }
  }, [selectedChain, safeWallet.contractAddress]);

  return (
    <SmartContractContext.Provider
      value={{
        connectToMetaMaskWallet,
        disconnectFromMetaMask,
        selectedChain,
        updateSelectedChain,
        deployContract,
        contractAddress,
        signTransaction,
        setContractAddress,
        switchMetaMaskChain,
        contractAddress,
        convertBalanceToETH,
        getEstimatedGas,
        sendFunds,
        addOwner,
        getDecimals,
        approveOwner,
        approveRemoveOwner,
        signDeleteUser,
      }}
    >
      {children}
    </SmartContractContext.Provider>
  );
};
