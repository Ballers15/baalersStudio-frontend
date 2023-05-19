import React, { useEffect, useState } from 'react'
import Can from "../../Components/rolesBasedAccessControl/Can";
import { environment } from "../../Environments/environment";
import rewardBox from '../../Assest/img/rewardBox.png'
import rewardBoxOpen from '../../Assest/img/rewardBox4.png'
import rewardBoxExp from '../../Assest/img/rewardBox1.png'
import Token from '../../Assest/img/Token.png'
import { Button, Form, Modal} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setLoadingFalse, setLoadingTrue } from "../../Components/Redux/actions";
import { getActivePot, getGameCash, redeemCashReward } from '../../Services/User/indexPot';
import {  toast } from 'react-toastify';
import Popup from '../../Components/popup';
import { useNavigate } from 'react-router-dom';
import { getAccountDetails } from '../../Components/Metamask';
import { subscribeMailJet } from '../../Services/User';
import { formatNumberDecimal } from '../../Components/functions';


const ActiveRewardPot = (props) => {
    const { countdownTime, reload, setReload, expiryTime, setExpiryTime, setPrevious, setRewardRoundIndex,setActiveRewardId } = props
    const [cash, setCash] = useState('')
    const walletAddress = useSelector(state => state.wallet.walletAddress)
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const [redeemModal,setRedeemModal] = useState(false)
    const [showRedeemPopup , setShowRedeemPopup] = useState(false)
    const navigate = useNavigate()
    const [potDetails,setPotDetails] = useState({})
    const [rewardAmount, setRewardAmount] = useState(0)
    const currentDateTime = new Date().toISOString()
    const [potStatus, setPotStatus] = useState('')
    const [showPotStatus, setShowPotStatus] = useState('')
    const [email, setEmail] = useState("");
    const [playModalShow, setPlayModalShow] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        getActivePotDetails();
    }, [expiryTime])

    useEffect(() => {
        const element = document.getElementById("leaderboard");
        if(showRedeemPopup === true){
            setRewardRoundIndex(-1)
            setTimeout(() => {
                setShowRedeemPopup(false)
                element?.scrollIntoView();
        }, 2000);
        }
    }, [showRedeemPopup])

    useEffect(()=>{
        setValues()

    },[potStatus])

    useEffect(()=>{
        emailValidation()
        dispatch(setLoadingFalse()); 
      },[email])
        /**
     * Get details of active pot (if any)
     */
        const getActivePotDetails = async () => {
            let startDateTime=''
            let dateTime=''

            let dataToSend = {
                potType: 'REWARDPOT',
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

                setPotDetails((pot?.data[0]!==undefined && pot?.data[0]!==null) ?pot.data[0]:'');
                let amount = (pot?.data[0]!==undefined && pot?.data[0]!==null) ? pot?.data[0]?.rewardTokenQuantity : '';
                setRewardAmount(amount)
                dateTime = (pot?.data[0]!==undefined && pot?.data[0]!==null) ? pot.data[0]?.endDate:'';
                startDateTime = (pot?.data[0]!==undefined && pot?.data[0]!==null) ? pot.data[0]?.startDate:'';
                console.log('current',currentDateTime,'satrt ',startDateTime, 'end',dateTime)
                if(startDateTime!=='' && currentDateTime < startDateTime){
                    dateTime=startDateTime;
                    console.log('if')
                }
                console.log('expiry',dateTime)
                setPotStatus((pot?.data[0]!==undefined && pot?.data[0]!==null) ? pot?.data[0]?.potStatus : '')
                setExpiryTime(dateTime);
                setPrevious(false);
                setActiveRewardId((pot?.data[0]!==undefined && pot?.data[0]!==null) ? pot?.data[0]?._id : '')
                // console.log('exp',pot?.data.length?pot.data[0]?.endDate:'');
              }
            } catch (error) {
                toast.dismiss();
                toast.error(error?.response?.data?.message||'Something went worng');
                dispatch(setLoadingFalse());
            }
             
        }

        const setValues = () => {
            console.log(potStatus)
                if(potStatus==='ONGOING')
                    setShowPotStatus('ACTIVE REWARD POT')
                else if (potStatus === 'UPCOMING')
                    setShowPotStatus('UPCOMING REWARD POT')
                else
                    setShowPotStatus('REWARD POT EXPIRED')
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
     * redeem cash in active reward pot
     */
    const addCashReward = async () => {
        let dataToSend = 
            {
                walletAddress: walletAddress,
                amount:cash,
                potId: potDetails?._id
            }
        dispatch(setLoadingTrue());
        try {
          const redeem = await redeemCashReward(dataToSend);
          dispatch(setLoadingFalse());
          if (redeem.error) {
            toast.dismiss();
            toast.error(redeem?.message||'Something went worng');
            setRedeemModal(false)
            
          } else {
            toast.dismiss();
            setShowRedeemPopup(true)
            setReload(!reload)
        }
        } catch (error) {
            setRedeemModal(false);
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
            addCashReward()
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
    

        /**
     * Validate email address received from input
     * @returns boolean
     */
        const emailValidation = () => {
            const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,3})+$/;
            const tld=email?.split('.')[1]?.length;
            if (!email || regex.test(email) === false || tld<=1) {
                setErrorMsg('Enter a Valid Email !');
                return false;
            }
            setErrorMsg(null)
            return true;
        }


    /**
     * Submits email from subricption form
     * @param e Event
     */
    const handleSubmit = async (e) => {
        // console.log(email,'-----------email value');
        setValidated(true);
        e.preventDefault();
        e.stopPropagation();
        e.preventDefault();


        if (email && !errorMsg) {
            let dataToSend = {
                email: email
            }
            // auth.login(dataToSend)
            dispatch(setLoadingTrue());
            try {
                const subscribe = await subscribeMailJet(dataToSend);
                dispatch(setLoadingFalse());
                if (subscribe.error) {
                toast.dismiss();
                toast.error(subscribe?.error?.message || 'Something went worng');
                  } else {
                toast.dismiss();
                toast.success(' THANK YOU FOR SUBSCRIBING!');
                setPlayModalShow(false);
                setErrorMsg(null);
                }
            } catch (error) {
                //   console.log(error)
                toast.dismiss();
                toast.error(error?.response?.data?.message || 'Something went worng');
                dispatch(setLoadingFalse());
            }
        } else {
            console.log('Form is invalid ------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
        }
        dispatch(setLoadingFalse());
      }

      /**
       * Show notify me modal
       */
      const showModal = () => {
        setEmail('')
        setValidated(false)
        setPlayModalShow(true);
      }

      /**
       * Hide notify me modal
       */
      const hideModal = () => { 
        setPlayModalShow(false) 
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
              {cash > 0 ? <>Are you sure to add your game cash $ {formatNumberDecimal(cash)} ?  
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
          

          <Modal
          show={playModalShow}
          onHide={hideModal}
          backdrop="static"
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>stay tuned</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Stay tuned for our Testnet competition to win $BALR token</h4>

            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              className="formFlex"
            >
              <Form.Group>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={({ target }) => {
                    setEmail(target.value)
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  <span> {email && errorMsg && 'Valid E-mail is required!'} </span>
                  <span> {!email && 'E-mail is required!'} </span>
                </Form.Control.Feedback>
              </Form.Group>
              <div>
                <Button
                  className="subscribeBtn"
                  variant="primary"
                  onClick={handleSubmit}
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

        <div className="ht100 pt8">
                <div className="container">
                    <div className="positionRelative mb-5 headWth mx-auto">
                        <h2 className="heading text-center">
                        {showPotStatus}
                        </h2>
                        <h2 className="heading2 text-center">
                        {showPotStatus}
                        </h2>
                    </div>
                    <div className="row">
                        <div className="col-sm-5 order-sm-last my-auto">
                            <div className="text-center">
                                <div>
                              { (potStatus === 'ONGOING' || potStatus === 'UPCOMING') && <> <div className='earnText'>
                                    <div>Earn</div>
                                    <div className='sniff'>
                                        <div>{rewardAmount} BALR</div>  
                                        <div></div>
                                    </div>
                                    <div> Tokens  </div>
                                </div>
                                <div className='earnText'>in rewards</div> </> }
                                </div>
                              
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
                                        :<p className='expDeal'>Deal Expired</p>}
                                </div>

                                {potStatus === 'ONGOING' && <p className="undColor">Remaining</p>}
                                {potStatus === 'UPCOMING' && <p className="undColor">Until Next Draw</p>}
                                {potStatus !== 'UPCOMING' && potStatus!== 'ONGOING' && <p className="undColor">Wait Until Next Draw</p>}


                                <div className="poolBtn pt-2">
                                    <div className="playBtn">
                                    {potStatus === 'ONGOING'  ?  
                                    (<>{walletAddress!==null && (<Can do='redeem now' on='redeem-btn'> <a onClick={handleRedeemModal}><span></span> REDEEM NOW</a> </Can>)}
                                    {walletAddress===null && (<Can do='connect wallet' on='redeem-btn'> <a onClick={handleRedeemModal}><span></span> Connect Wallet</a> </Can>)}
                                    {(<Can do='login' on='redeem-btn'> <a onClick={handleRedeemModal}><span></span> Register Now</a> </Can>)}</>) :
                                    (<a onClick={()=>{showModal();}}><span></span> NOTIFY ME</a>)}
                                    </div>
                                </div>                        
                            </div>
                        </div>
                        <div className="col-sm-7 order-sm-first text-center  position-relative">
                        {potStatus === 'ONGOING' && 
                         <> <img className='activeImgReward' src={Token} />
                            <img src={rewardBoxOpen} alt="rewardBox" className="rewardBox" id="rewardBoxOpen" /></>}
                            {potStatus === 'UPCOMING' && <img src={rewardBox} alt="rewardBox" className="rewardBox" id="rewardBoxOpen" />}
                            {potStatus !== 'UPCOMING' && potStatus!== 'ONGOING' && <img src={rewardBoxExp} alt="rewardBox" className="rewardBox" id="rewardBoxOpen" />}
                        </div>
                    </div>
                </div>
             </div>
        {showRedeemPopup ? <Popup potType='LOTTERYPOT' cash={cash}/> : null}
     </>
    )

}


export default ActiveRewardPot;