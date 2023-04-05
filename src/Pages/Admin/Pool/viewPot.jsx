/* eslint-disable react-hooks/exhaustive-deps */
import './Pool.css';
import React from "react";
import {useState,useEffect} from 'react';
import {Col, Row, Form } from 'react-bootstrap';
import TimePicker from 'react-time-picker';
import { useNavigate,useLocation } from 'react-router-dom';
import {getRewardPotById} from '../../../Services/Admin'
import ApiLoader from '../../../Components/apiLoader'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../../Components/Redux/actions";


const ViewPot = () => {
    const isLoading = useSelector(state => state.loading.isLoading)
    const dispatch = useDispatch()
    const assestTypesArray=[{_id:1,value:'TOKEN',lable:'Token'},{_id:2,value:'NFT',lable:'Nft'}]
    const potTypeArray=[{_id:1,value:'REWARDPOT',lable:'Reward Pot'},{_id:2,value:'LOTTERYPOT',lable:'Lottery Pot'}]
    const [rewadPotDetail, setRewardPotDetail] = useState({
        rewardTokenAmount:'', assetDetails: {
            ticker:'',contractAddress:'',assetName:''
        }, startDate:'',assetType:'',potType:'',claimExpiryDate:{date:'',time:'12:00'},isActive:false 
    });
    const [startDateTime, setStartDateTime] = useState('12:00');
    const [endDate, setEndDate] = useState();
    const [endDateTime, setEndDateTime] = useState('12:00');
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
        dispatch(setLoadingTrue());
            try {
              const getPotDetailsById = await getRewardPotById(dataToSend);
              dispatch(setLoadingFalse());
              if (getPotDetailsById.error) {
                toast.error(getPotDetailsById?.message||'Something Went Wrong in getting pot detail by ID');
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
                toast.error(error?.response?.data?.message||'Something Went Wrong in getting pot detail by ID');
                dispatch(setLoadingFalse());
            }
             
}
    

    const convert=(str)=> {
        var date = new Date(str),
          mnth = ("0" + (date?.getMonth() + 1))?.slice(-2),
          day = ("0" + date?.getDate())?.slice(-2);
        return [date?.getFullYear(), mnth, day]?.join("-");
    }
    

    

    return (
        <React.Fragment>
            <div className="addPot">
            <div className="addPot-container">
            <Form >
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
                                        disabled={true}
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
                                                disabled={true}>
                                            </Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                Start Date is required !!
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                
                                        <Form.Group as={Col} md="3">
                                            <Form.Label>Start Time</Form.Label><br/>
                                            <TimePicker 
                                                value={startDateTime|| ''} disabled={true}/>
                                        </Form.Group>
                                
                                        <Form.Group as={Col} md="3">
                                            <Form.Label>End Date</Form.Label>
                                            <Form.Control
                                            required
                                            type="date"
                                            min={rewadPotDetail?.startDate}
                                            value={endDate|| ''}
                                            disabled={true}>
                                            </Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                End Date is required !!
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                
                                        <Form.Group as={Col} md="3">
                                            <Form.Label>End Time</Form.Label><br/>
                                            <TimePicker 
                                                value={endDateTime|| ''} 
                                                disabled={true}/>
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
                                        value={rewadPotDetail?.claimExpiryDate?.time|| ''} disabled={true} >
                                    </Form.Control>
                                </Form.Group>
                                
                                <Form.Group as={Col} md="3">
                                <Form.Label>Asset Type</Form.Label>
                                <Form.Control
                                    required
                                    as="select"
                                    type="select"
                                    value={rewadPotDetail.assetType|| ''}
                                    disabled={true}>
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
                                    value={rewadPotDetail.potType|| ''}
                                    disabled={true}>
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
                                        value={rewadPotDetail.assetDetails["ticker"]|| ''}
                                        disabled={true}>
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
                                        value={rewadPotDetail.assetDetails["contractAddress"]|| ''}
                                        disabled={true}>
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
                                        value={rewadPotDetail.assetDetails["assetName"]|| ''}
                                        disabled={true}>
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Assest Name is required !!
                                    </Form.Control.Feedback>
                                </Form.Group>
                                
                                <Form.Group as={Col} md="3" className='d-flex mb-0 mt-auto'>
                               
                                    <Form.Check type="checkbox" checked={rewadPotDetail.isActive} disabled={true}/>
                                     <Form.Label>Active Pot</Form.Label>
                                </Form.Group>
                            </Row>
                    
                        <div>
                        <button type="primary" className="add-pot-submit-button" onClick={()=>navigate('/poolListing')}><span></span><span></span><span></span>Close</button>
                        </div>
                </Form>
                {/* <ToastContainer theme="colored"/> */}
                {isLoading ? <ApiLoader /> : null}
            </div>
        </div>
    </React.Fragment>
    )
}

export default ViewPot;