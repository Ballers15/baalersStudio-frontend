/* eslint-disable react-hooks/exhaustive-deps */
import './Pool.css';
import React from "react";
import {useState,useEffect} from 'react';
import {Col, Row, Form } from 'react-bootstrap';
import TimePicker from 'react-time-picker';
import {AddRewardPot} from '../../../Services/Admin';
import { useNavigate, useParams } from 'react-router-dom';
import {getRewardPotById,updateRewardPotDetail} from '../../../Services/Admin'
import ApiLoader from '../../../Components/apiLoader'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../../Components/Redux/actions";
import { checkNftClaim } from '../../../Services/User/indexPot'


const AddPot = () => {
    const params = useParams()
    const {id} = params;
    const isLoading = useSelector(state => state.loading.isLoading)
    const dispatch = useDispatch()
    const [validated, setValidated] = useState(false);
    const [rewadPotDetail, setRewardPotDetail] = useState({
        rewardTokenAmount:'', assetDetails: {
            ticker:'',contractAddress:'',assetName:''
        }, startDate:'',assetType:'',potType:'',claimExpiryDate:{date:'',time:''},isActive:false
    });
    const currentDateTime = new Date().toISOString();
    const currentDate = currentDateTime.split('T')[0];
    const currentTime =  currentDateTime.split('T')[1].slice(0,5);
    const [startDate, setStartDate] = useState('');
    const [startDateTime, setStartDateTime] = useState(currentTime);
    const [endDate, setEndDate] = useState('');
    const [endDateTime, setEndDateTime] = useState(currentTime);
    const [disable, disableSubmitButton] = useState(false);
    const setDisableSubmitButton = (param) => disableSubmitButton(param);
    const navigate = useNavigate();
    const [potStatusCheck,setPotStatusCheck] = useState(false);
    const [nftExists, setNftExists] = useState(false)
    const [endDateError, setEndDateError] = useState('')
    const [endTimeError, setEndTimeError] = useState('')
    const decimalPattern = /^[-+]?([0-9]+(\.[0-9]*)?|\.[0-9]+)$/;


    useEffect(() => {
        if (id) {
            getRewardPotDetailById(id);
        }
    }, [id]);

    useEffect(()=>{
        if(endDate === startDate && endDateTime <= startDateTime){
            setEndTimeError('End time must be greater than start time!')
       }
       else{
           setEndDateError('')
           setEndTimeError('')
       }

    },[startDate,endDate,startDateTime,endDateTime])

    /**
     * Get pot details by pot id
     * @param id String | Pot Id
     */
    const getRewardPotDetailById = async (id) => {
        let dataToSend = {
            potId:id
        }
        dispatch(setLoadingTrue());
        try {
              const getPotDetailsById = await getRewardPotById(dataToSend);
              dispatch(setLoadingFalse());
              if (getPotDetailsById.error) {
                toast.dismiss()    
                toast.error(getPotDetailsById?.message||'Something Went Wrong in getting pot details by ID');
                } 
              else {
                  let data = getPotDetailsById?.data[0];
                  const claimExpiryDate=new Date(data?.endDate?.split('T')[0]);
                  claimExpiryDate.setDate(claimExpiryDate.getDate() + 1);
               if (data) {
                      setRewardPotDetail({
                          ...rewadPotDetail,
                          rewardTokenAmount: data?.rewardTokenAmount,
                          startDate: data?.startDate?.split('T')[0],
                          assetType:data?.assetType,
                          potType: data?.potType,
                          assetDetails: {
                              ...rewadPotDetail.assetDetails,
                              ticker: data?.assetDetails?.ticker,
                              assetName: data?.assetDetails?.assetName,
                              contractAddress: data?.assetDetails?.contractAddress,
                          },
                          isActive: data?.isActive,
                          potStatus: data?.potStatus,
                          claimExpiryDate: {
                              ...rewadPotDetail.claimExpiryDate,
                              time: data?.endDate?.split('T')[1]?.slice(0,5),
                              date:convert(claimExpiryDate)  ,
                          }
                      })
                      if(data?.potType === 'REWARDPOT')
                        setNftExists(true)
                      setEndDate(data?.endDate?.split('T')[0])
                      setStartDate(data?.startDate?.split('T')[0])
                      setStartDateTime(data?.startDate?.split('T')[1]?.slice(0,5))
                      setEndDateTime(data?.endDate?.split('T')[1]?.slice(0,5))
                    }
                    if(data?.potStatus === 'ONGOING'){
                        // console.log('if',data?.potStatus)
                        setPotStatusCheck(true);
                        // console.log(potStatusCheck) 
                        // console.log(rewadPotDetail)
                      }
              }
             
            } catch (error) {
                toast.dismiss()    
                toast.error(error?.response?.data?.message||'Something Went Wrong in getting pot details by ID');
                dispatch(setLoadingFalse());
            }
             
        }
    
    /**
     * Get claim expiry date and time from input and set the value in rewadPotDetails
     * @param e String (date) | input value
     * @param data String | date and time from respective input fields
     */
    const getClaimExpiryTime = (e, data) => {
        const date = new Date(e);
        date.setDate(date.getDate() + 1);
        let dataTime = {
            ...rewadPotDetail.claimExpiryDate, time:e
        }
        let dataDate = {
            ...rewadPotDetail.claimExpiryDate, date:convert(date)
        }
        switch(data) {  
            case 'time':
                setRewardPotDetail({ ...rewadPotDetail, claimExpiryDate: dataTime })
              break;
            case 'date':
                // console.log(data)
                setRewardPotDetail({ ...rewadPotDetail, claimExpiryDate: dataDate })
              break;
            default:
                // console.log('default statement run');
          }
    }

    /**
     * Coverts String to Date yyyy-mm-dd format
     * @param str String(Date) 
     * @returns returns date in yyy-mm-dd format
     */
    const convert=(str)=> {
        var date = new Date(str),
          mnth = ("0" + (date?.getMonth() + 1))?.slice(-2),
          day = ("0" + date?.getDate())?.slice(-2);
        return [date?.getFullYear(), mnth, day]?.join("-");
    }
    
    /**
     * if form is valid reward pot will be added by calling AddRewardPot API with pot details obejct passed as param
     * @param e Event | event from Form  submission
     */
    const addRewardPot =async (e) => {
        setValidated(true);
        e.preventDefault();
        e.stopPropagation();
        e.preventDefault();
        const form = e.currentTarget;

            
        if(potStatusCheck)
        {
            setStartDate(currentDate);
            setStartDateTime(currentTime);
            rewadPotDetail.isActive=true;
        }
        else
        {
            rewadPotDetail.isActive=false;
        }

    
        if (form.checkValidity() === false || ((nftExists === false) && (rewadPotDetail?.potType === 'LOTTERYPOT')) || (endDateError!=='') || (endTimeError!=='')) {
            console.log(rewadPotDetail)
            console.log('form invalid!')
            return;
        } 
        else {
            if (endDate) {
                rewadPotDetail.endDate = endDate+' '+endDateTime;
            }
            if (startDate) {
                rewadPotDetail.startDate = startDate +' '+ startDateTime;
            }
            if (rewadPotDetail?.claimExpiryDate?.date) {
                // rewadPotDetail.claimExpiryDate = rewadPotDetail?.claimExpiryDate?.date +' '+rewadPotDetail?.claimExpiryDate?.time;
                rewadPotDetail.claimExpiryDate = rewadPotDetail?.claimExpiryDate?.date +' '+endDateTime;
            }
        }
        setDisableSubmitButton(true);
        dispatch(setLoadingTrue());
        try {
          const addPot = await AddRewardPot(rewadPotDetail);
          dispatch(setLoadingFalse());
          if (addPot.error) {
        toast.dismiss()    
        toast.error(addPot?.message||'Something went worng in adding reward pot');
            setDisableSubmitButton(false);
          } else {
        toast.dismiss()    
        toast.success('Pot Added Succesfully!');
            setDisableSubmitButton(false);
            navigate('/pool-listing');
          }
        } catch (error) {
            setDisableSubmitButton(false);
        toast.dismiss()    
        toast.error(error?.response?.data?.message||'Something went worng in adding reward pot');
            dispatch(setLoadingFalse());
        }
         
    }

    /**
     * Update existing pot details 
     * @param  e Event | Event from From submission
     */
    const updateRewardPot = async (e) => {
        if (!id) {
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        e.preventDefault();
        const form = e.currentTarget;

        if(endDate === startDate && endDateTime <= startDateTime){
            setEndTimeError('End time must be greater than start time!')
       }
       else{
           setEndDateError('')
           setEndTimeError('')
       }

       setValidated(true);

        if(potStatusCheck)
        {
            setStartDate(currentDate);
            setStartDateTime(currentTime);
            rewadPotDetail.isActive=true;
        }
        else
        {
            rewadPotDetail.isActive=false;
        }

    if (
        form.checkValidity() === false || 
        ((nftExists === false) && (rewadPotDetail?.potType === 'LOTTERYPOT')) || 
        (endDateError!=='') || (endTimeError!=='')
        ) {

            console.log(rewadPotDetail)
            console.log('form invalid!')
            return;
        } else {
            if (endDate) {
                rewadPotDetail.endDate = endDate+'T'+endDateTime;
            }
            if (startDate) {
                rewadPotDetail.startDate = startDate+'T'+ startDateTime;
            }
            if (rewadPotDetail?.claimExpiryDate?.date) {
                // rewadPotDetail.claimExpiryDate = rewadPotDetail?.claimExpiryDate?.date +' '+rewadPotDetail?.claimExpiryDate?.time;
                rewadPotDetail.claimExpiryDate = rewadPotDetail?.claimExpiryDate?.date +'T'+endDateTime;
            }
            rewadPotDetail.potId = id;
        }
        setDisableSubmitButton(true);
        dispatch(setLoadingTrue());
        // console.log(rewadPotDetail)
        // return
        try {
          const updatePot = await updateRewardPotDetail(rewadPotDetail);
          dispatch(setLoadingFalse());
          if (updatePot.error) {
            toast.dismiss()
            toast.error(updatePot?.message||'Something went worng in updating reward pot');
            setDisableSubmitButton(false);
              
          } else {
            toast.dismiss()
            toast.success('Pot Updated Succesfully!!');
            setDisableSubmitButton(false);
            navigate('/pool-listing');
          }
        } catch (error) {
            setDisableSubmitButton(false);
            toast.dismiss()
            toast.error(error?.response?.data?.message||'Something went worng in updating reward pot');
            dispatch(setLoadingFalse());
        }
         
    }

    /**
     * Upon form submission upate or add pot function will be called according to conditions
     * @param  e Event | Event from From submission
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        if(id){
            if(nftExists)
               updateRewardPot(e);
            else
                checkNftOnContract(rewadPotDetail?.assetDetails?.ticker)
        }
        else{
            addRewardPot(e);
        }
    }

    /**
     * Check if NFt (token) is present on the contract address by passing the token ID
     * @param  e Event | Event from From submission
     */
    const checkNftOnContract = async(e) => {
        let ticker = ''
        if(typeof(e)==='string'){
            ticker = e;
        }
        else{
        e.preventDefault();
        e.stopPropagation();
        e.preventDefault();
        ticker = e.target.value;
    }
        let dataToSend = {};
        let quantity = rewadPotDetail?.rewardTokenAmount;
        if(rewadPotDetail?.potType === 'LOTTERYPOT' || rewadPotDetail?.assetType==='NFT'){
            if(quantity > 0) {
                dataToSend = {
                tokenId: ticker,
                quantity: quantity
                }
            }
            else{
                toast.dismiss();
                toast.error('Please enter nft quantity')
                return;
            }
        }
        else{
            return;
        }
        dispatch(setLoadingTrue());
        try {
        const checkNFT = await checkNftClaim(dataToSend);
        dispatch(setLoadingFalse());
        if (checkNFT.error) {
            toast.dismiss()    
            toast.error(checkNFT?.message||'Something went worng while checking nft');
        } else {
            setNftExists(checkNFT?.data?.exists)    
            if(checkNFT?.data?.exists){
                toast.dismiss()    
                toast.success(checkNFT?.message);
            }
            else{
                toast.dismiss()    
                toast.error(checkNFT?.message)
            }            
        }
        } catch (error) {
                toast.dismiss()    
                toast.error(error?.response?.data?.message||'Something went worng while checking nft');
            }
        dispatch(setLoadingFalse());

    }

    return (
        <React.Fragment>
            <div className="addPot">
            <div className="addPot-container">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="3">
                                    <Form.Label>Reward Amount $ / Quantity for NFT</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        pattern="[0-9]*"
                                        min={0}
                                        inputMode="numeric"
                                        value={rewadPotDetail.rewardTokenAmount|| ''}
                                        onChange={({ target }) => setRewardPotDetail({ ...rewadPotDetail,rewardTokenAmount:target.value})} >
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {decimalPattern.test(rewadPotDetail.rewardTokenAmount) ? <>Decimal value is not allowed!</> : <>Token Amount is required (Min:0)!</> }
                                    </Form.Control.Feedback>
                                </Form.Group>
                            
                                <Col lg={9}>
                                    <Row>
                                    <Form.Group as={Col} md="3">
                                        <Form.Label>Start Date (UTC)</Form.Label>
                                            <Form.Control className='dateIcon'
                                                required
                                                type="date"
                                                format="mm/dd/yyyy"
                                                min={currentDate}
                                                value={potStatusCheck ? currentDate : startDate || ''}
                                                onChange={({ target }) => setStartDate(target.value)}
                                                disabled={id && (rewadPotDetail?.potStatus !=='UPCOMING') }
                                                >
                                                </Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                Start Date is required!
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                
                                        <Form.Group as={Col} md="3" >
                                            <Form.Label>Start Time (UTC)</Form.Label><br/>
                                            <TimePicker 
                                            value={potStatusCheck ? currentTime : startDateTime|| ''} 
                                            onChange={(e) => { setStartDateTime(e);console.log(e)}} 
                                            disabled={id && (rewadPotDetail?.potStatus !=='UPCOMING') }
                                            />
                                        </Form.Group>

                                        <Form.Group as={Col} md="3">
                                            <Form.Label>End Date (UTC)</Form.Label>
                                            <Form.Control
                                            className='dateIcon'
                                            required
                                            type="date"
                                            min={startDate}
                                            value={endDate|| ''}
                                            onChange={({ target }) => { setEndDate(target.value); getClaimExpiryTime(target.value, 'date');  }}
                                            isInvalid={endDateError!=='' ? true : false}
                                            >
                                            </Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                {endDateError!=='' ? endDateError :<> End Date is required!</>}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                
                                        <Form.Group as={Col} md="3">
                                            <Form.Label>End Time (UTC)</Form.Label><br/>
                                            <TimePicker 
                                                onChange={(e) => { setEndDateTime(e); getClaimExpiryTime(e,'time'); }}
                                                value={endDateTime|| ''} 
                                            />
                                            <Form.Control
                                             type='hidden'
                                             isInvalid = {(endTimeError!=='') || (endDateTime!=='') ? true: false}
                                             />
                                             <Form.Control.Feedback type="invalid">
                                                {endTimeError!=='' && endDate && endTimeError}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Row> 
                                </Col>  
                            </Row>
                    
                            <Row className="mb-3">
                                <Form.Group as={Col} md="3">
                                    <Form.Label>Claim Expiry Date</Form.Label>
                                    <Form.Control
                                      type="text"
                                      value={rewadPotDetail?.claimExpiryDate?.date|| ''} disabled={true} 
                                      required>
                                </Form.Control>
                                </Form.Group>
                        
                                <Form.Group as={Col} md="3">
                            
                                    <Form.Label>Claim Expiry Time</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={endDateTime|| ''} disabled={true} 
                                        required>
                                    </Form.Control>
                                </Form.Group>
                                
                                <Form.Group as={Col} md="3">
                                <Form.Label>Asset Type</Form.Label>
                                <Form.Control
                                    required
                                    as="select"
                                    type="select"
                                    onChange={(e) => {
                                        let potType = 'LOTTERYPOT'
                                        if (e.target.value === 'TOKEN') {
                                            potType = 'REWARDPOT'
                                        } 
                                        setRewardPotDetail({ ...rewadPotDetail, potType: potType,assetType:e.target.value });
                                      }}
                                    value={rewadPotDetail.assetType}
                                    disabled={id && (rewadPotDetail?.potStatus !=='UPCOMING') }
                                    >
                                        <option value="" disabled>Select Assest Type</option>
                                        <option value="NFT">NFT</option>
                                        <option value="TOKEN">Token</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Assest Type is required!
                                </Form.Control.Feedback>
                                </Form.Group>
                    
                                <Form.Group as={Col} md="3">
                                <Form.Label>Pot Type</Form.Label>
                                <Form.Control
                                    required
                                    as="select"
                                    type="select"
                                    onChange={(e) => {
                                        let assetType = 'NFT'
                                        if (e.target.value === 'REWARDPOT') {
                                         assetType = 'TOKEN'
                                        }
                                        setRewardPotDetail({ ...rewadPotDetail, assetType:assetType ,potType:e.target.value });
                                      }}
                                    value={rewadPotDetail.potType || ''}
                                    disabled={id && (rewadPotDetail?.potStatus !=='UPCOMING') }
                                    >
                                    <option value="" disabled>Select Pot Type</option>
                                    <option value="LOTTERYPOT">Lottery pot</option>
                                    <option value="REWARDPOT">Reward Pot</option>
                                    
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Pot Type is required!
                                </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                    
                            <Row className="mb-3">
                                {/* <Form.Label>Asset Details</Form.Label> */}
                        
                                <Form.Group as={Col} md="3">
                                    <Form.Label>Ticker / TokenId </Form.Label>
                                    <Form.Control
                                    required
                                    type="text"
                                    onChange={({ target }) => setRewardPotDetail({ ...rewadPotDetail, assetDetails: {...rewadPotDetail.assetDetails, ticker: target.value } })}
                                    onBlur={(e)=>checkNftOnContract(e)}
                                    value={rewadPotDetail.assetDetails["ticker"] || ''}>
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Ticker is required!
                                    </Form.Control.Feedback>
                                </Form.Group>
                        
                                <Form.Group as={Col} md="3">
                                    <Form.Label>Contract Address</Form.Label>
                                    <Form.Control
                                    required
                                    type="text"
                                    onChange={({ target }) => setRewardPotDetail({ ...rewadPotDetail, assetDetails: {...rewadPotDetail.assetDetails, contractAddress: target.value } })}
                                    value={rewadPotDetail.assetDetails["contractAddress"]|| ''}>
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Contract Address is required!
                                    </Form.Control.Feedback>
                                </Form.Group>
                        
                                <Form.Group as={Col} md="3">
                                    <Form.Label>Asset Name</Form.Label>
                                    <Form.Control
                                    required
                                    type="text"
                                    onChange={({ target }) => setRewardPotDetail({ ...rewadPotDetail, assetDetails: {...rewadPotDetail.assetDetails, assetName: target.value } })}
                                        value={rewadPotDetail.assetDetails["assetName"]|| ''}>
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Assest Name is required!
                                    </Form.Control.Feedback>
                                </Form.Group>
                                
                                <Form.Group as={Col} md="3" className='d-flex mb-0 mt-auto'>
                               
                                    <Form.Check type="checkbox" checked={potStatusCheck}
                                    onChange={() => setPotStatusCheck(!potStatusCheck)} />
                                     <Form.Label>Active Pot Now</Form.Label>
                                </Form.Group>
                            </Row>
                    
                        <div>
                        <button type="primary" className="add-pot-submit-button" style={{marginLeft:'20px'}} onClick={()=>navigate('/pool-listing')}><span></span><span></span><span></span>Close</button>
                        {id && nftExists && <button type="submit" disabled={disable} className="add-pot-submit-button" ><span></span><span></span><span></span>Update Pot</button>}
                        {id && !nftExists && <button type="submit" disabled={disable} className="add-pot-submit-button" ><span></span><span></span><span></span>Check Nft</button>}
                        {!id && <button type="submit" disabled={disable} className="add-pot-submit-button" ><span></span><span></span><span></span>Add Pot</button>}
                        </div>
                </Form>
                
                {isLoading ? <ApiLoader /> : null}
            </div>
        </div>
    </React.Fragment>
    )
}

export default AddPot;