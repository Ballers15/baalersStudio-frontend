import React, { useEffect, useState } from 'react'
import Can from "../../Components/rolesBasedAccessControl/Can";
import { environment } from "../../Environments/environment";
import rewardBox from '../../Assest/img/rewardBox.png'
import rewardBoxOpen from '../../Assest/img/rewardBox4.png'
import activeOverlay from '../../Assest/img/activeOverlay.png'
import { Modal} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setLoadingFalse, setLoadingTrue } from "../../Components/Redux/actions";
import { getActivePot, getGameCash, redeemCashLottery } from '../../Services/User/indexPot';
import {  toast } from 'react-toastify';
import Popup from '../../Components/popup';
import { useNavigate } from 'react-router-dom';
import { getAccountDetails } from '../../Components/Metamask';



const ActiveLotteryPot = (props) => {
    const { countdownTime, reload, setReload, expiryTime, setExpiryTime, setPrevious, setLotteryCurrentRoundDetails, setLotteryRoundIndex } = props
    const [cash, setCash] = useState('')
    const walletAddress = useSelector(state => state.wallet.walletAddress)
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const [redeemModal,setRedeemModal] = useState(false)
    const [showRedeemPopup , setShowRedeemPopup] = useState(false)
    const navigate = useNavigate()
    const [potDetails,setPotDetails] = useState({})

    useEffect(() => {
        getActivePotDetails();
    }, [])

    useEffect(() => {
        if(showRedeemPopup === true){
        const element = document.getElementById("leaderboard");
        setTimeout(() => {
        setShowRedeemPopup(false)
        setLotteryRoundIndex();
        setLotteryCurrentRoundDetails({})
        element?.scrollIntoView();
        }, 2000);
        }
    }, [showRedeemPopup])

    /**
     * Get details of active pot (if any)
     */
        const getActivePotDetails = async () => {
            let dataToSend = {
                potType: 'LOTTERYPOT',
            }
            dispatch(setLoadingTrue());
            try {
              const pot = await getActivePot(dataToSend);
              dispatch(setLoadingFalse());
              if (pot.error) {
                toast.dismiss();
                toast.error(pot?.message||'Something went worng');
            } else {
                // toast.success('Claim Status Updated Succesfully');
                setPotDetails(pot?.data.length?pot.data[0]:'');
                setExpiryTime(pot?.data.length?pot.data[0]?.endDate:'');
                setPrevious(false);
                // console.log('exp',pot?.data.length?pot.data[0]?.endDate:'');
              }
            } catch (error) {
                toast.dismiss();
                toast.error(error?.response?.data?.message||'Something went worng');
                dispatch(setLoadingFalse());
            }
             
        }

    /**
     * fetch cash amount of users account
     */
    const fetchGameCash = async () => {
        let dataToSend = 
            {
                walletAddress: walletAddress,
            }
        dispatch(setLoadingTrue());
        try {
          const cash = await getGameCash(dataToSend);
          dispatch(setLoadingFalse());
          if (cash.error) {
            toast.dismiss();
            toast.error(cash?.message||'Something went worng');
        } else {
            // toast.info('cash fetched Successfully');
            setCash(cash?.data?.amount)
          }
        } catch (error) {
            toast.dismiss();
            toast.error(error?.response?.data?.message||'Something went worng');
            dispatch(setLoadingFalse());
       }
        
    }

    /**
     * redeem cash in active lottery pot
     */
    const addCashLottery = async () => {
        let dataToSend = 
            {
                walletAddress: walletAddress,
                amount:cash,
                potId: potDetails?._id
            }
        dispatch(setLoadingTrue());
        try {
          const redeem = await redeemCashLottery(dataToSend);
          dispatch(setLoadingFalse());
          if (redeem.error) {
            toast.dismiss();
            toast.error(redeem?.message||'Something went worng');
        } else {
            toast.dismiss();
            // toast.info(` Kudos !! Your $ ${cash} amount of in game cash deposited Successfully See Leaderboard !!` );
            setShowRedeemPopup(true)
            setReload(!reload)
          }
        } catch (error) {
            toast.dismiss();
            toast.error(error?.response?.data?.message||'Something went worng');
            dispatch(setLoadingFalse());
        }
         
    }
    
    /**
     * 
     * @returns handle redeem api calls according to pot type
     */
    const handleRedeem = () => {
        if(cash > 0) 
        {
            addCashLottery()
            setRedeemModal(false)
        }
      }

    const handleCloseModal = () => setRedeemModal(false)
    
    const handleRedeemModal = async() => {
        if(!user ){
            navigate('/login')
        }
        else if(user &&  !walletAddress){
            toast.dismiss();
            getAccountDetails();
        }
       else{
        await fetchGameCash()
        setRedeemModal(true)
        }
    }
    

    return(
        <>
               <Modal
            show={redeemModal} 
            onHide={handleCloseModal} 
            size="lg"        
            className='viewWallet'
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
               {cash > 0 ? <>Confirm Your Action</> : <>No Game Cash Found !!</>}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <span>
            <div className='confirm-modal'>
              {cash > 0 ? <>Are you sure to add your game cash $ {cash} ?  
              <br></br>
              <button type='primary' onClick={()=>handleRedeem()}>Yes</button>
              <button type='primary' onClick={()=>handleCloseModal()}>No</button> </>
              : <>Play game to earn cash !
              <br></br>
              <a href={environment?.gameUrl} target='_blank'><button type='primary'>Play Now</button> </a>
              </>
                }
              </div>
            </span>
            </Modal.Body>
          </Modal>
          
        <div className="ht100 pt8">
                <div className="container">
                    <div className="positionRelative mb-5 headWth mx-auto">
                        <h2 className="heading text-center">
                        ACTIVE LOTTERY POT
                        </h2>
                        <h2 className="heading2 text-center">
                        ACTIVE LOTTERY POT
                        </h2>
                    </div>
                    <div className="row">
                        <div className="col-sm-5 my-auto">
                            <div className="text-center">
                                <div className='earnText'>
                                    <div>Earn</div>
                                    <div className='sniff'>
                                        <div>SNIFFDOG</div> 
                                        <div> CARTEL</div>  
                                    </div>
                                    <div> NFT</div>
                                </div>
                                <br></br>
                                <div>
                                    {expiryTime!=='' ?
                                        <>
                                        <span className="countFont">{countdownTime.countdownDays} <sub>D</sub></span>
                                        <span className="countFont pe-2">:</span>
                                        <span className="countFont">{countdownTime.countdownHours} <sub>H</sub></span>
                                        <span className="countFont pe-2">:</span>
                                        <span className="countFont">{countdownTime.countdownMinutes} <sub>M</sub></span>
                                        <span className="countFont pe-2">:</span>
                                        <span className="countFont">{countdownTime.countdownSeconds} <sub>S</sub></span>
                                        </>
                                        :<p>Deal Expired</p>}
                                </div>

                                <p className="undColor">Remaining</p>

                                <div className="poolBtn pt-2">
                                    <div className="playBtn">
                                    {expiryTime!=='' ?  
                                    (<>{walletAddress!==null && (<Can do='redeem now' on='redeem-btn'> <a onClick={handleRedeemModal}><span></span> REDEEM NOW</a> </Can>)}
                                    {walletAddress===null && (<Can do='connect wallet' on='redeem-btn'> <a onClick={handleRedeemModal}><span></span> Connect Wallet</a> </Can>)}
                                    {(<Can do='login' on='redeem-btn'> <a onClick={handleRedeemModal}><span></span> login</a> </Can>)}</>) :
                                    (<a className="disabled"><span></span> POT EXPIRED</a>)}
                                    </div>
                                </div>                        
                            </div>
                        </div>
                        <div className="col-sm-7 text-center position-relative">
                            {expiryTime !=='' && <img className='activeImg' src={activeOverlay} />}
                            <img src={expiryTime!=='' ? rewardBoxOpen : rewardBox} alt="rewardBox" className="rewardBox" id="rewardBoxOpen" />                        
                        </div>
                    </div>
                </div>
             </div>
        {showRedeemPopup ? <Popup potType='LOTTERYPOT' cash={cash}/> : null}
        {/* <Popup potType='LOTTERYPOT' cash="100"/> */}
     </>
    )

}


export default ActiveLotteryPot;