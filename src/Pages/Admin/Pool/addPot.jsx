/* eslint-disable react-hooks/exhaustive-deps */
import './Pool.css';
import React from "react";
import {useState,useEffect} from 'react';
import {Col, Row, Form } from 'react-bootstrap';
import TimePicker from 'react-time-picker';
import {AddRewardPot} from '../../../Services/Admin';
import { useNavigate,useLocation } from 'react-router-dom';
import {getRewardPotById,updateRewardPotDetail} from '../../../Services/Admin'
import ApiLoader from '../../../Components/apiLoader'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../../Components/Redux/actions";


const AddPot = () => {
    const isLoading = useSelector(state => state.loading.isLoading)
    const dispatch = useDispatch()
    const assestTypesArray=[{_id:1,value:'TOKEN',lable:'Token'},{_id:2,value:'NFT',lable:'Nft'}]
    const potTypeArray=[{_id:1,value:'REWARDPOT',lable:'Reward Pot'},{_id:2,value:'LOTTERYPOT',lable:'Lottery Pot'}]
    const [validated, setValidated] = useState(false);
    const [rewadPotDetail, setRewardPotDetail] = useState({
        rewardTokenAmount:'', assetDetails: {
            ticker:'',contractAddress:'',assetName:''
        }, startDate:'',assetType:'',potType:'',claimExpiryDate:{date:'',time:''},isActive:false
    });
    const currentDateTime = new Date().toISOString();
    const currentDate = currentDateTime.split('T')[0];
    const currentTime =  currentDateTime.split('T')[1].slice(0,5);
    const [startDateTime, setStartDateTime] = useState(currentTime);
    const [endDate, setEndDate] = useState();
    const [endDateTime, setEndDateTime] = useState(currentTime);
    const [disable, disableSubmitButton] = useState(false);
       const setDisableSubmitButton = (param) => disableSubmitButton(param);
    const navigate = useNavigate();
    const { state } = useLocation();
    const [potStatusCheck,setPotStatusCheck] = useState(false);



    useEffect(() => {
        if (state?.id) {
            getRewardPotDetailById(state?.id);
            return;
        }
    }, []);

    const getRewardPotDetailById = async (id) => {
        let dataToSend = {
            potId:id
        }
        dispatch(setLoadingTrue());
        toast.dismiss()    
        try {
              const getPotDetailsById = await getRewardPotById(dataToSend);
              dispatch(setLoadingFalse());
              if (getPotDetailsById.error) {
                toast.error(getPotDetailsById?.message||'Something Went Wrong in getting pot details by ID');
                } else {
                  let data = getPotDetailsById?.data[0];

                  const claimExpiryDate=new Date(data?.endDate?.split('T')[0]);
                  claimExpiryDate.setDate(claimExpiryDate.getDate() + 1);
                  if (data) {
                    // console.log(data)

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
                      setEndDate( data?.endDate?.split('T')[0])
                      setStartDateTime(data?.startDate?.split('T')[1]?.slice(0,5))
                    //   console.log("start date",data?.startDate?.split('T')[1]?.slice(0,5))
                    //   setStartDateTime(data?.startDate?.split('T')[1]?.slice(0,5))
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
                toast.error(error?.response?.data?.message||'Something Went Wrong in getting pot details by ID');
                dispatch(setLoadingFalse());
            }
             
        }
    
    const getClaimExpiryTime = (e, data) => {
        const date = new Date(e);
        date.setDate(date.getDate() + 1);
        switch(data) {  
            case 'time':
                setRewardPotDetail({ ...rewadPotDetail, claimExpiryDate: {...rewadPotDetail.claimExpiryDate, time:e } })
              break;
            case 'date':
                // console.log(data)
                setRewardPotDetail({ ...rewadPotDetail, claimExpiryDate: {...rewadPotDetail.claimExpiryDate, date:convert(date)} })
              break;
            default:
                // console.log('default statement run');
          }
    }

    const convert=(str)=> {
        var date = new Date(str),
          mnth = ("0" + (date?.getMonth() + 1))?.slice(-2),
          day = ("0" + date?.getDate())?.slice(-2);
        return [date?.getFullYear(), mnth, day]?.join("-");
    }
    
    const addRewardPot =async (e) => {
        setValidated(true);
        e.preventDefault();
        e.stopPropagation();
        e.preventDefault();
        

        if(potStatusCheck)
        {
            rewadPotDetail.startDate = currentDate;
            setStartDateTime(currentTime);
            rewadPotDetail.isActive=true;
        }
        else
        {
            rewadPotDetail.startDate = rewadPotDetail.startDate.split('T')[0] ;
            setStartDateTime(currentTime);
            rewadPotDetail.isActive=false;

        }

        if (!rewadPotDetail?.rewardTokenAmount || !rewadPotDetail?.assetDetails?.contractAddress || !rewadPotDetail?.assetDetails?.assetName || !rewadPotDetail?.assetDetails?.ticker || !rewadPotDetail?.startDate || !endDate || !rewadPotDetail?.assetType || !rewadPotDetail?.potType || !rewadPotDetail?.claimExpiryDate || !rewadPotDetail?.startDate) {
            console.log(rewadPotDetail)
            console.log('form invalid !!')
            return;
        } else {
            if (endDate) {
                rewadPotDetail.endDate = endDate+' '+endDateTime;
            }
            if (rewadPotDetail?.startDate) {
                rewadPotDetail.startDate = rewadPotDetail?.startDate +' '+ startDateTime;
            }
            if (rewadPotDetail?.claimExpiryDate?.date) {
                // rewadPotDetail.claimExpiryDate = rewadPotDetail?.claimExpiryDate?.date +' '+rewadPotDetail?.claimExpiryDate?.time;
                rewadPotDetail.claimExpiryDate = rewadPotDetail?.claimExpiryDate?.date +' '+endDateTime;
            }
        }
        setDisableSubmitButton(true);
        dispatch(setLoadingTrue());
        toast.dismiss()    
        try {
          const addPot = await AddRewardPot(rewadPotDetail);
          dispatch(setLoadingFalse());
          if (addPot.error) {
            toast.error(addPot?.message||'Something went worng in adding reward pot');
            setDisableSubmitButton(false);
          } else {
            toast.success('Pot Added Succesfully !!');
            setDisableSubmitButton(false);
            navigate('/poolListing');
          }
        } catch (error) {
            setDisableSubmitButton(false);
            toast.error(error?.response?.data?.message||'Something went worng in adding reward pot');
            dispatch(setLoadingFalse());
        }
         
    }

    const updateRewardPot = async (e) => {
        if (!state?.id || rewadPotDetail?.isActive === 'true') {
            return;
        }
        setValidated(true);
        e.preventDefault();
        e.stopPropagation();
        e.preventDefault();

        if(potStatusCheck)
        {
            rewadPotDetail.startDate = currentDate;
            setStartDateTime(currentTime);
            rewadPotDetail.isActive=true;
        }
        else
        {
            rewadPotDetail.startDate = rewadPotDetail.startDate.split('T')[0] ;
            setStartDateTime(currentTime);
            rewadPotDetail.isActive=false;

        }

        if (!rewadPotDetail?.rewardTokenAmount || !rewadPotDetail?.assetDetails?.contractAddress || !rewadPotDetail?.assetDetails?.assetName || !rewadPotDetail?.assetDetails?.ticker || !rewadPotDetail?.startDate || !endDate || !rewadPotDetail?.assetType || !rewadPotDetail?.potType || !rewadPotDetail?.claimExpiryDate || !rewadPotDetail?.startDate) {
            console.log(rewadPotDetail)
            console.log('form invalid !!')
            return;
        } else {
            if (endDate) {
                rewadPotDetail.endDate = endDate+'T'+endDateTime;
            }
            if (rewadPotDetail?.startDate) {
                rewadPotDetail.startDate = rewadPotDetail?.startDate?.split(' ')[0] +'T'+ startDateTime;
            }
            if (rewadPotDetail?.claimExpiryDate?.date) {
                // rewadPotDetail.claimExpiryDate = rewadPotDetail?.claimExpiryDate?.date +' '+rewadPotDetail?.claimExpiryDate?.time;
                rewadPotDetail.claimExpiryDate = rewadPotDetail?.claimExpiryDate?.date +'T'+endDateTime;

            }
            rewadPotDetail.potId = state?.id;
        }
        setDisableSubmitButton(true);
        dispatch(setLoadingTrue());
        // console.log(rewadPotDetail)
        // return
        toast.dismiss()    
        try {
          const updatePot = await updateRewardPotDetail(rewadPotDetail);
          dispatch(setLoadingFalse());
          if (updatePot.error) {
            toast.error(updatePot?.message||'Something went worng in updating reward pot');
            setDisableSubmitButton(false);
              
          } else {
            toast.success('Pot Updated Succesfully !!');
            setDisableSubmitButton(false);
            state.id = '';
            navigate('/poolListing');
          }
        } catch (error) {
            setDisableSubmitButton(false);
            toast.error(error?.response?.data?.message||'Something went worng in updating reward pot');
            dispatch(setLoadingFalse());
        }
         
    }

    return (
        <React.Fragment>
            <div className="addPot">
            <div className="addPot-container">
            <Form noValidate validated={validated} >
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
                                        Token Amount is required (Min:0) !!
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
                                                max={endDate}
                                                value={potStatusCheck ? currentDate : rewadPotDetail?.startDate?.split('T')[0] || ''}
                                                onChange={({ target }) => setRewardPotDetail({...rewadPotDetail,startDate:target.value})}>
                                                </Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                Start Date is required !!
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                
                                        <Form.Group as={Col} md="3">
                                            <Form.Label>Start Time (UTC)</Form.Label><br/>
                                            <TimePicker 
                                             value={potStatusCheck ? currentTime : startDateTime|| ''} 
                                            onChange={(e) => { setStartDateTime(e);}} />
                                        </Form.Group>

                                        <Form.Group as={Col} md="3">
                                            <Form.Label>End Date (UTC)</Form.Label>
                                            <Form.Control
                                            className='dateIcon'
                                            required
                                            type="date"
                                            min={rewadPotDetail?.startDate}
                                            value={endDate|| ''}
                                            onChange={({ target }) => { setEndDate(target.value); getClaimExpiryTime(target.value, 'date');  }}>
                                            </Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                End Date is required !!
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                
                                        <Form.Group as={Col} md="3">
                                            <Form.Label>End Time (UTC)</Form.Label><br/>
                                            <TimePicker 
                                                onChange={(e) => { setEndDateTime(e); getClaimExpiryTime(e,'time'); }}
                                                value={endDateTime|| ''} />

                                            {/* <Timeit onChange={(e) => { setEndDateTime(e);  }}
                                                value={endDateTime|| ''}/> */}
                                            {/* <div className='pickTime'>
                                                {showTimeEnd &&
                                                    <TimeKeeper
                                                        time={endDateTime}
                                                        onChange={(e) => setEndDateTime(e.formatted)}
                                                        onDoneClick={() => setShowTimeEnd(false)}
                                                        switchToMinuteOnHourSelect
                                                    />

                                                }
                                                <span>{endDateTime }</span>
                                                {!showTimeEnd &&
                                                    <span onClick={() => setShowTimeEnd(true)} className="pull-right"><i className="fa fa-clock-o" aria-hidden="true"></i></span>
                                                } 
                                            </div> */}
                                        </Form.Group>
                                    </Row> 
                                </Col>  
                            </Row>
                    
                            <Row className="mb-3">
                                <Form.Group as={Col} md="3">
                                    <Form.Label>Claim Expiry Date</Form.Label>
                                    <Form.Control
                                      type="text"
                                      value={rewadPotDetail?.claimExpiryDate?.date|| ''} disabled={true} >
                                </Form.Control>
                                </Form.Group>
                        
                                <Form.Group as={Col} md="3">
                            
                                    <Form.Label>Claim Expiry Time</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={endDateTime|| ''} disabled={true} >
                                    </Form.Control>
                                </Form.Group>
                                
                                <Form.Group as={Col} md="3">
                                <Form.Label>Asset Type</Form.Label>
                                <Form.Control
                                    required
                                    as="select"
                                    type="select"
                                    onChange={({ target }) => setRewardPotDetail({ ...rewadPotDetail,assetType:target.value})}
                                    value={rewadPotDetail.assetType|| ''}>
                                    <option value="" disabled>Select Assest Type</option>
                                            {assestTypesArray?.map((assest) => (
                                                <option value={assest?.value|| ''} key={assest?._id}>
                                                    {assest.lable}
                                                </option>
                                            ))}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Assest Type is required !!
                                </Form.Control.Feedback>
                                </Form.Group>
                    
                                <Form.Group as={Col} md="3">
                                <Form.Label>Pot Type</Form.Label>
                                <Form.Control
                                    required
                                    as="select"
                                    type="select"
                                    onChange={({ target }) => setRewardPotDetail({ ...rewadPotDetail,potType:target.value})}
                                    value={rewadPotDetail.potType|| ''}>
                                    <option value="" disabled>Select Pot Type</option>
                                            {potTypeArray?.map((pot) => (
                                                <option  value={pot?.value|| ''} key={pot?._id}>
                                                    {pot.lable}
                                                </option>
                                            ))}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Pot Type is required !!
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
                                        value={rewadPotDetail.assetDetails["ticker"]|| ''}>
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Ticker is required !!
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
                                        Contract Address is required !!
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
                                        Assest Name is required !!
                                    </Form.Control.Feedback>
                                </Form.Group>
                                
                                <Form.Group as={Col} md="3" className='d-flex mb-0 mt-auto'>
                               
                                    <Form.Check type="checkbox" checked={potStatusCheck}
                                    onChange={() => setPotStatusCheck(!potStatusCheck)} />
                                     <Form.Label>Active Pot Now</Form.Label>
                                </Form.Group>
                            </Row>
                    
                        <div>
                        <button type="primary" className="add-pot-submit-button" style={{marginLeft:'20px'}} onClick={()=>navigate('/poolListing')}><span></span><span></span><span></span>Close</button>
                        {state?.id && <button type="submit" disabled={disable} className="add-pot-submit-button " onClick={updateRewardPot}><span></span><span></span><span></span>Update Pot</button>}
                        {!state?.id && <button type="submit" disabled={disable} className="add-pot-submit-button " onClick={ addRewardPot}><span></span><span></span><span></span>Add Pot</button>}
                        </div>
                </Form>
                {/* <ToastContainer theme="colored"/> */}
                {isLoading ? <ApiLoader /> : null}
            </div>
        </div>
    </React.Fragment>
    )
}

export default AddPot;