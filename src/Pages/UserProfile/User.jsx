import React, { useEffect } from "react";
import './User.css' 
import { useState } from "react";
import {  useDispatch, useSelector } from "react-redux";
import ApiLoader from "../../Components/apiLoader";
import viewProfileBg from "../../Assest/img/viewProfileBg.png"
import viewProfileBgMob from "../../Assest/img/viewProfileBgMob.png"
import mafiaBoss from "../../Assest/img/mafiaBoss.png"
import ballerCoin from "../../Assest/img/ballerCoin.webp" 
import userProfile from "../../Assest/img/userProfile.png"   
import { getPoolsParticipated, getTokenBalance, getUserNft } from "../../Services/User";
import { setLoadingFalse, setLoadingTrue } from "../../Components/Redux/actions";
import { toast } from "react-toastify";
import { nftArray } from "../../Environments/environment";


const UserProfile = () => {

    const walletAddress = useSelector(state => state.wallet.walletAddress)
    const isLoading = useSelector(state => state.loading.isLoading)
    let strAuth = useSelector(state => state.user.user);
    let _u = JSON.parse(strAuth);
    const dispatch = useDispatch();
    const [rewardPoolCount, setRewardPoolCount] = useState(0)
    const [lotteryPoolCount, setLotteryPoolCount] = useState(0)
    const [nftData, setNftData] = useState(0)
    const [tokenBal, setTokenBal] = useState(0)
    const [nftCount, setNftCount] = useState(0)
    const [nftExist, setNftExist] = useState([])

    useEffect(() => {
        if(walletAddress){
      poolCount()
      UserNft()
      tokenBalance()
    }
    else{
        setTokenBal(0)
        setLotteryPoolCount(0)
        setRewardPoolCount(0)
        setNftData(0)
        setNftCount(0)
        setNftExist([])
    }
    }, [walletAddress])

    useEffect(()=>{
        if(tokenBal > 0){
            formatNumber(tokenBal)
        }
    },[tokenBal])

    useEffect(()=>{
        if(nftData.length){
            activeNft();
        }
        else{
            setNftCount(0);
            setNftExist([])
        }
    },[nftData])

    useEffect(()=>{
        /** Sort new array on basis of nft exists or not */
        nftExist.sort((a, b) => {
            if (a.exists && !b.exists) {
              return -1; // a comes before b
            } else if (!a.exists && b.exists) {
              return 1; // b comes before a
            } else {
              return 0; // no change in order
            }
          });
    },[nftExist])


    /**
     * Get reward and lottery pool counts
     */
    const poolCount = async () => {
        let dataToSend = {
            walletAddress: walletAddress
        };
        dispatch(setLoadingTrue());
        try {
          const pools = await getPoolsParticipated(dataToSend);
          dispatch(setLoadingFalse());
          if (pools.error) {
            toast.dismiss();
            toast.error(pools?.message||'Something went worng');
        } else {
            setRewardPoolCount(pools?.data?.rewardPools)
            setLotteryPoolCount(pools?.data?.lotteryPools)
          }
        } catch (error) {
            toast.dismiss();
            toast.error(error?.response?.data?.message||'Something went worng');
            dispatch(setLoadingFalse());
        }
    }

    /**
     * Get nft's that exists in users wallet address
     */
    const UserNft = async () => {
        let dataToSend = {
            walletAddress: walletAddress
        };
        
        dispatch(setLoadingTrue());
        try {
          const nft = await getUserNft(dataToSend);
          dispatch(setLoadingFalse());
          if (nft.error) {
            toast.dismiss();
            toast.error(nft?.message||'Something went worng');
        } else {
            setNftData(nft?.data?.data)
          }
        } catch (error) {
            toast.dismiss();
            toast.error(error?.response?.data?.message||'Something went worng');
            dispatch(setLoadingFalse());
        }
    }

    /**
     * get token amount from wallet address
     */
    const tokenBalance = async () => {
        let dataToSend = {
            walletAddress: walletAddress
        };
        
        dispatch(setLoadingTrue());
        try {
          const token = await getTokenBalance(dataToSend);
          dispatch(setLoadingFalse());
          if (token.error) {
            toast.dismiss();
            toast.error(token?.message||'Something went worng');
        } else {
            setTokenBal(token?.data)
          }
        } catch (error) {
            toast.dismiss();
            toast.error(error?.response?.data?.message||'Something went worng');
            dispatch(setLoadingFalse());
        }
    }

    /**
     * format token balance in K for 1000 and M for million
     * @param num Number | token balance
     */
    const formatNumber = (num) => {
        let newNum = 0;

       if(num > 999 && num < 1000000){
          newNum =  (num / 1000).toFixed(1) + 'k'
        }
        else if(num > 999999){
          newNum =  (num / 1000000).toFixed(1) + 'M'
        }
        else{
            newNum = ((num*100)/100).toFixed(2)
        }
        setTokenBal(newNum)
    }

    /**
     * check which nft exists and store it in a new array with exists attirbute for sorting
     */
    const activeNft = () => {
        let count = 0;
        setNftCount(0);
        nftExist.splice(0,nftExist.length)
        dispatch(setLoadingTrue());
        for(let i=0;i<17;i++){
           let checkNFT = nftArray[i];
           let exist = false;

        for(let j=0;j<17;j++){
           let ifExist = nftData[j];
           if( checkNFT.tokenId === ifExist.tokenId && ifExist.exists === true){
                exist = true;   
                count++;
                }
            }
            checkNFT.exists = exist;
            setNftExist(nftExist => [...nftExist, checkNFT])

        }
        setNftCount(count);
        dispatch(setLoadingFalse());
    }

    
      
    return(
        
            <div className="text-center mt-9 profileWth">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="position-relative">
                            <picture aria-hidden="true">
                            <source media="(min-width: 900px)" srcSet={viewProfileBg} />
                            <source media="(max-width: 500px)" srcSet={viewProfileBgMob} />
                            <img src={viewProfileBg} width="382" height="382" alt="background image" className="imgRadius w-100"/>
                            </picture>
                                <div className="profileText">
                                <div className="container">
                                    <div className="row">
                                            <div className="col-sm-8">
                                                <div className="d-flex align-items-center mt-4">
                                                    <img src={userProfile} alt="userProfile" className="profileImage" />
                                                    <div className="text-left">
                                                        <h1>{_u?.user?.userName}</h1>
                                                        <p>{_u?.user?.email}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <img src={mafiaBoss} alt="mafiaBoss" />
                                            </div>
                                        </div>
                                </div>
                                </div>
                        </div>
                    </div>
                </div>  
               <div className="row">
                <div className="col-sm-8 col-xl-9">
                    <div className="profileCard cardHt"> 
                    <h3 className="px-3">NFT’S HELD IN THE WALLET : <span>0{nftCount}</span> </h3>
                     <div className="mt-4">
                        <div className="nftSlider">
                            {nftExist.length ? <>{nftExist.map((nft)=>(
                                    <img key={nft?.tokenId} className={nft?.exists ? "active" : ''}  src={require(`../../Assest/img/nftImages/${nft.imageName}`)} alt={nft?.nftName} />
                            ))}</> : <span className="mx-auto">Connect your wallet !</span>}
                        </div>                    
                     </div>
                    </div>
                </div>
                <div className="col-sm-4 col-xl-3">
                    <div className="profileCard"> 
                    <h3>TOTAL REWARDS ACHEIVED </h3>
                    <div className="d-flex align-items-center mt-3">
                        <img src={ballerCoin} alt="ballerCoin" />
                        <p className="amount">{tokenBal}</p>
                    </div>
                    </div>
                    <div className="profileCard"> 
                    <h3>Pools Participated</h3>
                    <div className="row align-items-center mt-3">
                        <div className="col-8 col-sm-8">
                            <div className="participateName">REWARD POOLS :</div>
                        </div>
                        <div className="col-4 col-sm-4">
                            <div className="participateNum">{rewardPoolCount}</div>
                        </div>
                    </div>
                    <div className="row align-items-center mt-3">
                        <div className="col-8 col-sm-8">
                            <div className="participateName">LOTTERY POOLS :</div>
                        </div>
                        <div className="col-4 col-sm-4">
                            <div  className="participateNum">{lotteryPoolCount}</div>
                        </div>
                    </div>
                    </div>
                </div>
               </div>
               {isLoading ? <ApiLoader /> : null} 
            </div>
        )
}

export default UserProfile;