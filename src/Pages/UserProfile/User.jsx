import React, { useEffect } from "react";
import './User.css' 
import { useState } from "react";
import { useAuth } from '../../Auth/authProvider';
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import {  useDispatch, useSelector } from "react-redux";
import ApiLoader from "../../Components/apiLoader";
import viewProfileBg from "../../Assest/img/viewProfileBg.png"
import viewProfileBgMob from "../../Assest/img/viewProfileBgMob.png"
import mafiaBoss from "../../Assest/img/mafiaBoss.png"
import ballerCoin from "../../Assest/img/ballerCoin.webp" 
import userProfile from "../../Assest/img/userProfile.png"  
import Aaron_Grossbaum from "../../Assest/img/nftImages/Aaron_Grossbaum.png" 
import Dennis_Deep from "../../Assest/img/nftImages/Dennis_Deep.png" 
import Estella_Queen from "../../Assest/img/nftImages/Estella_Queen.png" 
import Frederic_Crenium from "../../Assest/img/nftImages/Frederic_Crenium.png" 
import Grigory_Chekhov from "../../Assest/img/nftImages/Grigory_Chekhov.png" 
import Hao_Niubi from "../../Assest/img/nftImages/Hao_Niubi.png" 
import Harry_Varan from "../../Assest/img/nftImages/Harry_Varan.png" 
import IeronimMask from "../../Assest/img/nftImages/Ieronim_Mask.png" 
import Jesus_Escobar from "../../Assest/img/nftImages/Jesus_Escobar.png" 
import Joe_Zealot from "../../Assest/img/nftImages/Joe_Zealot.png" 
import Pepe_Chester from "../../Assest/img/nftImages/Pepe_Chester.png" 
import Rocinha from "../../Assest/img/nftImages/Rocinha.png" 
import Steven_Void from "../../Assest/img/nftImages/Steven_Void.png" 
import sinoda_cloud from "../../Assest/img/nftImages/sinoda_cloud.png" 
import Vito_kasso from "../../Assest/img/nftImages/Vito_kasso.png" 
import Vanilla from "../../Assest/img/nftImages/Vanilla.png" 
import { getPoolsParticipated, getTokenBalance, getUserNft } from "../../Services/User";
import { setLoadingFalse, setLoadingTrue } from "../../Components/Redux/actions";
import { toast } from "react-toastify";


const UserProfile = () => {

    const walletAddress = useSelector(state => state.wallet.walletAddress)
    let strAuth = useSelector(state => state.user.user);
    let _u = JSON.parse(strAuth);
    const dispatch = useDispatch();
    const [poolsCount, setPoolsCount] = useState({})
    const [nftCount, setNftCount] = useState({})
    const [tokenBal, setTokenBal] = useState(0)

    useEffect(() => {
        console.log(_u?.user)
        if(walletAddress){
      poolCount()
      UserNftCount()
      tokenBalance()
    }
    }, [walletAddress])

    useEffect(()=>{
        if(tokenBal > 0){
            formatNumber(tokenBal)
        }
    },[tokenBal])

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
            setPoolsCount(pools?.data)
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
    const UserNftCount = async () => {
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
            setNftCount(nft?.data?.data)
          }
        } catch (error) {
            toast.dismiss();
            toast.error(error?.response?.data?.message||'Something went worng');
            dispatch(setLoadingFalse());
        }
    }


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


    const formatNumber = (num) => {
        let newNum = 0;

       if(num > 999 && num < 1000000){
          newNum =  (num / 1000).toFixed(1) + 'k'
        }
        else if(num > 999999){
          newNum =  (num / 1000000).toFixed(1) + 'M'
        }
        else{
            newNum = ((num*100)/100).toFixed(3)
        }
        setTokenBal(newNum)
    }
     
    return(
        <>
            <div className="text-center mt-9 profileWth">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="position-relative">
                            <picture aria-hidden="true">
                            <source media="(min-width: 900px)" srcSet={viewProfileBg} />
                            <source media="(max-width: 500px)" srcSet={viewProfileBgMob} />
                            <img src={viewProfileBg} width="382" height="382" alt="background image" className="imgRadius w-100"/>
                            </picture>
                            {/* <img src={viewProfileBg} alt="" className="w-100" /> */}
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
                    <div className="profileCard"> 
                    <h3 className="px-3">NFT’S HELD IN THE WALLET : <span>02</span> </h3>
                    <div className="mt-4">
                        <div className="nftSlider">
                            <img className="active" src={Jesus_Escobar} alt="" />
                            <img className="active" src={Aaron_Grossbaum} alt="" />
                            <img src={Dennis_Deep} alt="" />
                            <img src={Estella_Queen} alt="" />
                            <img src={Frederic_Crenium} alt="" />
                            <img src={Grigory_Chekhov} alt="" />
                            <img src={Hao_Niubi} alt="" />
                            <img src={Harry_Varan} alt="" />
                            <img src={IeronimMask} alt="" />
                            <img src={Joe_Zealot} alt="" />
                            <img src={Pepe_Chester} alt="" />
                            <img src={Rocinha} alt="" />
                            <img src={Steven_Void} alt="" />
                            <img src={sinoda_cloud} alt="" />
                            <img src={Vito_kasso} alt="" />
                            <img src={Vanilla} alt="" />

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
                            <div className="participateNum">{poolsCount?.rewardPools}</div>
                        </div>
                    </div>
                    <div className="row align-items-center mt-3">
                        <div className="col-8 col-sm-8">
                            <div className="participateName">LOTTERY POOLS :</div>
                        </div>
                        <div className="col-4 col-sm-4">
                            <div  className="participateNum">{poolsCount?.lotteryPools}</div>
                        </div>
                    </div>
                    </div>
                </div>
               </div>

            </div>
            </>
        )
}

export default UserProfile;