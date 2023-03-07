/* eslint-disable react-hooks/exhaustive-deps */
import './Pool.css';
import React from "react";
import {useState,useEffect} from 'react';
import {Col, Row, Form } from 'react-bootstrap';
import TimePicker from 'react-time-picker';
import {AddRewardPot} from '../../../Services/Admin';
import { useNavigate,useLocation } from 'react-router-dom';
import Loader from "../../../Components/Loader";
import Toaster from "../../../Components/Toaster";
import {getRewardPotById,updateRewardPotDetail} from '../../../Services/Admin'

const AddPot = () => {
    const assestTypesArray=[{_id:1,value:'TOKEN',lable:'Token'},{_id:2,value:'NFT',lable:'Nft'}]
    const potTypeArray=[{_id:1,value:'REWARDPOT',lable:'Reward Pot'},{_id:2,value:'LOTTERYPOT',lable:'Lottery Pot'}]
    const [validated, setValidated] = useState(false);
    const [rewadPotDetail, setRewardPotDetail] = useState({
        rewardTokenAmount:'', assetDetails: {
            ticker:'',contractAddress:'',assetName:''
        }, startDate:'',assetType:'',potType:'',claimExpiryDate:{date:'',time:'12:00'},isActive:false
    });
    const [startDateTime, setStartDateTime] = useState('12:00');
    const [endDate, setEndDate] = useState();
    const [endDateTime, setEndDateTime] = useState('12:00');
    const [loading, setLoading] = useState(false);
    const [toasterMessage, setToasterMessage] = useState("");
    const [disable, disableSubmitButton] = useState(false);
    const [toaster, showToaster] = useState(false);
    const setShowToaster = (param) => showToaster(param);
    const setDisableSubmitButton = (param) => disableSubmitButton(param);
    const navigate = useNavigate();
    const { state } = useLocation();

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
        setLoading(true);
            try {
              const getPotDetailsById = await getRewardPotById(dataToSend);
              setLoading(false);
              if (getPotDetailsById.error) {
                setToasterMessage(getPotDetailsById?.message||'Something Went Wrong');
                setShowToaster(true);
              } else {
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
                          claimExpiryDate: {
                              ...rewadPotDetail.claimExpiryDate,
                              time: data?.endDate?.split('T')[1]?.slice(0,5),
                              date:convert(claimExpiryDate)  ,
                          }
                      })
                      setEndDate( data?.endDate?.split('T')[0])
                      setStartDateTime(data?.startDate?.split('T')[1]?.slice(0,5))
                      setStartDateTime(data?.startDate?.split('T')[1]?.slice(0,5))
                      setEndDateTime(data?.endDate?.split('T')[1]?.slice(0,5))
                  }
               
              }
             
            } catch (error) {
                setToasterMessage(error?.response?.data?.message||'Something Went Wrong');
                setShowToaster(true);
                setLoading(false);
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
                console.log(data)
                setRewardPotDetail({ ...rewadPotDetail, claimExpiryDate: {...rewadPotDetail.claimExpiryDate, date:convert(date)} })
              break;
            default:
                console.log('default statement run');
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

        if (!rewadPotDetail?.rewardTokenAmount || !rewadPotDetail?.assetDetails?.contractAddress || !rewadPotDetail?.startDate || !endDate || !rewadPotDetail?.assetType || !rewadPotDetail?.potType || !rewadPotDetail?.claimExpiryDate) {
            console.log(rewadPotDetail)
            console.log('form invalid !!')
            return;
        } else {
            if (endDate) {
                rewadPotDetail.endDate = endDate+' '+endDateTime;
            }
            if (rewadPotDetail?.startDate) {
                rewadPotDetail.startDate = rewadPotDetail?.startDate?.split(' ')[0] +' '+startDateTime;
            }
            if (rewadPotDetail?.claimExpiryDate?.date) {
                rewadPotDetail.claimExpiryDate = rewadPotDetail?.claimExpiryDate?.date +' '+rewadPotDetail?.claimExpiryDate?.time;
            }
        }
        setDisableSubmitButton(true);
        setLoading(true);
        try {
          const addPot = await AddRewardPot(rewadPotDetail);
          setLoading(false);
          if (addPot.error) {
            setToasterMessage(addPot?.message||'Something Went Worng');
            setShowToaster(true);
            setDisableSubmitButton(false);
              
          } else {
            setToasterMessage('Pot Added Succesfully !!');
            setShowToaster(true);
            setDisableSubmitButton(false);
            navigate('/poolListing');
          }
        } catch (error) {
            setDisableSubmitButton(false);
            setToasterMessage(error?.response?.data?.message||'Something Went Worng');
            setShowToaster(true);
            setLoading(false);
        }
    }

    const updateRewardPot = async (e) => {
        if (!state?.id) {
            return;
        }

        setValidated(true);
        e.preventDefault();
        e.stopPropagation();
        e.preventDefault();
   
        if (!rewadPotDetail?.rewardTokenAmount || !rewadPotDetail?.assetDetails?.contractAddress || !rewadPotDetail?.startDate || !rewadPotDetail?.assetType || !rewadPotDetail?.potType || !rewadPotDetail?.claimExpiryDate) {
            console.log(rewadPotDetail)
            console.log('form invalid !!')
            return;
        } else {
            if (endDate) {
                rewadPotDetail.endDate = endDate+' '+endDateTime;
            }
            if (rewadPotDetail?.startDate) {
                rewadPotDetail.startDate = rewadPotDetail?.startDate?.split(' ')[0] +' '+startDateTime;
            }
            if (rewadPotDetail?.claimExpiryDate?.date) {
                rewadPotDetail.claimExpiryDate = rewadPotDetail?.claimExpiryDate?.date +' '+rewadPotDetail?.claimExpiryDate?.time;
            }
            rewadPotDetail.potId = state?.id;
        }
        setDisableSubmitButton(true);
        setLoading(true);
        try {
          const updatePot = await updateRewardPotDetail(rewadPotDetail);
          setLoading(false);
          if (updatePot.error) {
            setToasterMessage(updatePot?.message||'Something Went Worng');
            setShowToaster(true);
            setDisableSubmitButton(false);
              
          } else {
            setToasterMessage('Pot Updated Succesfully !!');
            setShowToaster(true);
            setDisableSubmitButton(false);
            state.id = '';
            navigate('/poolListing');
            
              
          }
        } catch (error) {
            setDisableSubmitButton(false);
            setToasterMessage(error?.response?.data?.message||'Something Went Worng');
            setShowToaster(true);
            setLoading(false);
        }
    }

    return (
        <React.Fragment>
            <div className="addPot">
            <div className="addPot-container">
            <Form noValidate validated={validated} onSubmit={addRewardPot}>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="3">
                                    <Form.Label>Reward Amount</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        pattern="[0-9]*"
                                        min={0}
                                        inputMode="numeric"
                                        value={rewadPotDetail.rewardTokenAmount|| ''}
                                        onChange={({ target }) => setRewardPotDetail({ ...rewadPotDetail,rewardTokenAmount:target.value})}
                                       >
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Token Amount is required (Min:0) !!
                                    </Form.Control.Feedback>
                                </Form.Group>
                            
                                <Col lg={9}>
                                    <Row>
                                    <Form.Group as={Col} md="3">
                                        <Form.Label>Start Date</Form.Label>
                                            <Form.Control
                                                required
                                                type="date"
                                                min={new Date().toISOString().split("T")[0]}
                                                max={endDate}
                                                value={rewadPotDetail.startDate|| ''}
                                                onChange={({ target }) => setRewardPotDetail({...rewadPotDetail,startDate:target.value})}>
                                            </Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                Start Date is required !!
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                
                                        <Form.Group as={Col} md="3">
                                            <Form.Label>Start Time</Form.Label><br/>
                                            <TimePicker onChange={setStartDateTime}
                                                value={startDateTime|| ''} />
                                        </Form.Group>
                                
                                        <Form.Group as={Col} md="3">
                                            <Form.Label>End Date</Form.Label>
                                            <Form.Control
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
                                            <Form.Label>End Time</Form.Label><br/>
                                            <TimePicker onChange={(e) => { setEndDateTime(e); getClaimExpiryTime(e,'time'); }}
                                                value={endDateTime|| ''} />
                                        </Form.Group>
                                    </Row>


                                
                                </Col>
                             
                        
                                
                            </Row>
                    
                            <Row className="mb-3">
                                {/* <Form.Label>Claim Expiry</Form.Label><br /> */}
                        
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
                                        value={rewadPotDetail?.claimExpiryDate?.time|| ''} disabled={true} >
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
                               
                                    <Form.Check type="checkbox" checked={rewadPotDetail.isActive}
                                    onChange={() => setRewardPotDetail({ ...rewadPotDetail,isActive:!rewadPotDetail.isActive})} />
                                     <Form.Label>Active Pot</Form.Label>
                                </Form.Group>
                            </Row>
                    
                        <div>
                        {state?.id && <button type="submit" disabled={disable} className="add-pot-submit-button " onClick={updateRewardPot}><span></span><span></span><span></span>Update Pot</button>}
                        {!state?.id && <button type="submit" disabled={disable} className="add-pot-submit-button " onClick={ addRewardPot}><span></span><span></span><span></span>Add Pot</button>}
                        </div>
                </Form>
                {loading ? <Loader /> : null}
                {toaster && <Toaster
                    message={toasterMessage}
                    show={toaster}
                    close={() => showToaster(false)} />
                }
            </div>
        </div>
    </React.Fragment>
    )
}

export default AddPot;