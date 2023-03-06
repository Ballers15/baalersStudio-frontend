/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect,useState} from "react";
import './Pool.css';
import { useNavigate } from 'react-router-dom'
import {getAllRewardPot,updateRewardPotStatus} from '../../../Services/Admin'
import Loader from "../../../Components/Loader";
import Toaster from "../../../Components/Toaster";
import { MDBSwitch } from 'mdb-react-ui-kit';
import {Form, Button} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
const PoolListing = () => {
    useEffect(() => {
        onInit();
    }, []);

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [toaster, showToaster] = useState(false);
    const [toasterMessage, setToasterMessage] = useState("");
    const [rewardPotDetailsArray, setRewardPotDetailsArray] = useState([]);
    const setShowToaster = (param) => showToaster(param);
    
    const onInit=()=>{
        getAllRewardPotDetails();
    }

    const toTitleCase = (str) => {
        var string = str?.toLowerCase().split(" ");
        console.log("string",string);
        for(var i = 0; i< string?.length; i++){
           string[i] = string[i][0].toUpperCase() + string[i].slice(1);
        }
        return string;
    }

    const getAllRewardPotDetails = async () => {
        setLoading(true);
        try {
          const getPotDetails = await getAllRewardPot();
          setLoading(false);
          if (getPotDetails.error) {
            setToasterMessage(getPotDetails?.message||'Something Went Worng');
            setShowToaster(true);
          } else {
              setRewardPotDetailsArray(getPotDetails?.data);
          }
        } catch (error) {
            setToasterMessage(error?.response?.data?.message||'Something Went Worng');
            setShowToaster(true);
            setLoading(false);
        }
    }

    const editRewardPot = (id) => {
        navigate('/addPot',{state:{id:id}});
    }

    const activeDeactiveRewardPot = async (data) => {
        let dataToSend = {
            potId:data._id,
            isActive:!data.isActive
        }
        setLoading(true);
        try {
          const potSatus = await updateRewardPotStatus(dataToSend);
          setLoading(false);
          if (potSatus.error) {
            setToasterMessage(potSatus?.message||'Something Went Worng');
            setShowToaster(true);
          } else {
            setToasterMessage('Pot Status Updated Succesfully');
              setShowToaster(true); 
              getAllRewardPotDetails();
          }
        } catch (error) {
            setToasterMessage(error?.response?.data?.message||'Something Went Worng');
            setShowToaster(true);
            setLoading(false);
        }
    }
    const [viewUser, viewUserShow] = React.useState(false);

    const handleClose = () => viewUserShow(false);
    const handleShow = () => viewUserShow(true);
  
    return (
        
        <React.Fragment>
            <Modal
                show={viewUser} 
                onHide={handleClose} 
                keyboard={false}             
                size="lg"
                className="viewPopup"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    user listing table
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                 <div className="searchTag">
                    <Form className="d-flex">
                        <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        />
                        <Button className="">Search</Button>
                    </Form>
                 </div>
                <Table responsive className="pool-view-table">
                    <thead>
                        <tr>
                            <th className="sNoWth">Sr. No.</th>
                            <th>name</th>
                            <th>email</th> 
                            <th>wallet address</th>
                            {/* <th>game cash burned</th> */}
                            <th>nft Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td  className="sNoWth"> 1</td>
                            <td> mishba zuber barkati</td>           
                            <td>misha@gmail.com</td>             
                            <td>jdjdjd</td>  
                            <td>76868</td>
                        </tr>   
                        <tr>
                            <td  className="sNoWth"> 1</td>
                            <td> mishba</td>           
                            <td>misha@gmail.com</td>         
                            <td>jdjdjd</td>  
                            <td>76868</td>
                        </tr>  
                        <tr>
                            <td  className="sNoWth"> 1</td>
                            <td> mishba</td>           
                            <td>misha@gmail.com</td>           
                            <td>jdjdjd</td>  
                            <td>76868</td>
                        </tr>   
                        <tr>
                            <td  className="sNoWth"> 1</td>
                            <td> mishba</td>           
                            <td>misha@gmail.com</td>               
                            <td>jdjdjd</td>  
                            <td>76868</td>
                        </tr>  
                        <tr>
                            <td  className="sNoWth"> 1</td>
                            <td> mishba</td>           
                            <td>misha@gmail.com</td>              
                            <td>jdjdjd</td>  
                            <td>76868</td>
                        </tr>  
                      
                    </tbody>
                </Table>
                 
                </Modal.Body>
               
                </Modal>
            <div className="pool-listing">
                <div className="pool-list-container">
                <a className="btnPool" href="#" style={{ float: 'right' }} onClick={() => navigate('/addPot')}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Add Pot
                </a>
                <div>
                    <h2 className="tableHead">Active Pots </h2>
                    <div className="pool-listing-table">
                    <table>
                    <thead className="pool-listing-table-head">
                    <tr>
                        <th>Sr. No.</th>
                        <th>Pot Type</th>
                        {/* <th>Assest Type</th> */}
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Claim Expiry Date</th>
                        <th>Reward Token Amount/ Quantity in case of NFT</th>
                        {/* <th>Ticker</th> */}
                        <th>Users Count </th>
                        <th>Game Cash Burned</th>                     
                        <th>Contract Address</th>
                        <th>Assest Name</th>
                        <th>stop claim</th>
                        <th>Actions</th>
                    </tr>
                    </thead><hr/>
                    <tbody className="pool-listing-table-body">
                        {rewardPotDetailsArray.length!==0?rewardPotDetailsArray.map((pot, index) => {
                            return (
                                <tr key={pot?._id}>
                                <td>{index+1}</td>
                                <td>{pot?.potType}</td>
                                {/* <td>{pot?.assetType}</td> */}
                                <td>{pot?.startDate?.split('T')[0]}</td>
                                <td>{pot?.endDate?.split('T')[0]}</td>
                                <td>{pot?.claimExpiryDate?.split('T')[0]}</td>
                                <td>{pot?.rewardTokenAmount}</td>
                                {/* <td>
                                    <span title= {toTitleCase(pot?.assetDetails?.ticker)}>
                                        {pot?.assetDetails?.ticker?.length>12 && toTitleCase(pot?.assetDetails?.ticker.slice(0,12)+'...')}
                                        {pot?.assetDetails?.ticker?.length<=12 && toTitleCase(pot?.assetDetails?.ticker)}
                                    </span>
                                </td> */}
                                <td> 6<span className="eyeIcon" title="View User" onClick={() => viewUserShow(true)}>
                                            <i className="fa fa-eye " />
                                        </span></td>
                                <td>654</td>
                               
                                <td>
                                    <span title= {pot?.assetDetails?.contractAddress}>
                                        {pot?.assetDetails?.contractAddress.length>12 && toTitleCase(pot?.assetDetails?.contractAddress.slice(0,12)+'...')}
                                        {pot?.assetDetails?.contractAddress.length<=12 && toTitleCase(pot?.assetDetails?.contractAddress)}
                                    </span>
                                </td>
                                <td>
                                    <span title= {pot?.assetDetails?.assetName}>
                                        {pot?.assetDetails?.assetName.length>12 && toTitleCase(pot?.assetDetails?.assetName.slice(0,12)+'...')}
                                        {pot?.assetDetails?.assetName.length<=12 && toTitleCase(pot?.assetDetails?.assetName)}
                                    </span>
                                </td>
                                <td>
                                <MDBSwitch defaultChecked />
                                </td>
                                <td className="action-tab-pool-list">
                                        <span title="Edit Pot Details" onClick={() => editRewardPot(pot?._id)}>
                                            <i className="fa fa-edit " />
                                        </span>
                                        <span>
                                            {pot?.isActive && <MDBSwitch style={{ marginLeft: '5px' }} onChange={()=>activeDeactiveRewardPot(pot)} checked={pot?.isActive} title="De-Active"/>}
                                            {!pot?.isActive && <MDBSwitch style={{ marginLeft: '5px' }} onChange={()=>activeDeactiveRewardPot(pot)} checked={pot?.isActive}   title="Active"/>}
                                        </span>
                                </td>
                                </tr>
                            )
                        }):null}
                        {rewardPotDetailsArray.length===0?<tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                 No Record Found
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>:null}
                    </tbody>
                    </table>
                    <Pagination>
                        <Pagination.First />
                        <Pagination.Prev />
                        <Pagination.Item active>{1}</Pagination.Item>                     

                        <Pagination.Ellipsis />
                        <Pagination.Item>{20}</Pagination.Item>
                        <Pagination.Next />
                        <Pagination.Last />
                    </Pagination>
                        </div>
                </div>
                <div>
                    <h2 className="tableHead">Upcoming Pots </h2>
                    <div className="pool-listing-table">
                        <table>
                        <thead className="pool-listing-table-head">
                        <tr>
                            <th>Sr. No.</th>
                            <th>Pot Type</th>
                            {/* <th>Assest Type</th> */}
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Claim Expiry Date</th>
                            <th>Reward Token Amount/ Quantity in case of NFT</th>
                            {/* <th>Ticker</th> */}
                            <th>Users Count </th>
                            <th>Game Cash Burned</th>
                        
                            <th>Contract Address</th>
                            <th>Assest Name</th>
                            <th>stop claim</th>
                            <th>Actions</th>
                        </tr>
                        </thead><hr/>
                        <tbody className="pool-listing-table-body">
                            {rewardPotDetailsArray.length!==0?rewardPotDetailsArray.map((pot, index) => {
                                return (
                                    <tr key={pot?._id}>
                                    <td>{index+1}</td>
                                    <td>{pot?.potType}</td>
                                    {/* <td>{pot?.assetType}</td> */}
                                    <td>{pot?.startDate?.split('T')[0]}</td>
                                    <td>{pot?.endDate?.split('T')[0]}</td>
                                    <td>{pot?.claimExpiryDate?.split('T')[0]}</td>
                                    <td>{pot?.rewardTokenAmount}</td>
                                    {/* <td>
                                        <span title= {toTitleCase(pot?.assetDetails?.ticker)}>
                                            {pot?.assetDetails?.ticker?.length>12 && toTitleCase(pot?.assetDetails?.ticker.slice(0,12)+'...')}
                                            {pot?.assetDetails?.ticker?.length<=12 && toTitleCase(pot?.assetDetails?.ticker)}
                                        </span>
                                    </td> */}
                                    <td> 8 <span title="View User" className="eyeIcon" onClick={() => viewUserShow(true)}>
                                                <i className="fa fa-eye " />
                                            </span></td>
                                    <td>656</td>
                                    
                                    <td>
                                        <span title= {pot?.assetDetails?.contractAddress}>
                                            {pot?.assetDetails?.contractAddress.length>12 && toTitleCase(pot?.assetDetails?.contractAddress.slice(0,12)+'...')}
                                            {pot?.assetDetails?.contractAddress.length<=12 && toTitleCase(pot?.assetDetails?.contractAddress)}
                                        </span>
                                    </td>
                                    <td>
                                        <span title= {pot?.assetDetails?.assetName}>
                                            {pot?.assetDetails?.assetName.length>12 && toTitleCase(pot?.assetDetails?.assetName.slice(0,12)+'...')}
                                            {pot?.assetDetails?.assetName.length<=12 && toTitleCase(pot?.assetDetails?.assetName)}
                                        </span>
                                    </td>
                                    <td>
                                    <MDBSwitch defaultChecked />
                                    </td>
                                    <td className="action-tab-pool-list">
                                            <span title="Edit Pot Details" onClick={() => editRewardPot(pot?._id)}>
                                                <i className="fa fa-edit " />
                                            </span>
                                            <span>
                                                {pot?.isActive && <MDBSwitch style={{ marginLeft: '5px' }} onChange={()=>activeDeactiveRewardPot(pot)} checked={pot?.isActive} title="De-Active"/>}
                                                {!pot?.isActive && <MDBSwitch style={{ marginLeft: '5px' }} onChange={()=>activeDeactiveRewardPot(pot)} checked={pot?.isActive}   title="Active"/>}
                                            </span>
                                    </td>
                                    </tr>
                                )
                            }):null}
                            {rewardPotDetailsArray.length===0?<tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    No Record Found
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>:null}
                        </tbody>
                        </table>
                        <Pagination>
                            <Pagination.First />
                            <Pagination.Prev />
                            <Pagination.Item active>{1}</Pagination.Item>                     

                            <Pagination.Ellipsis />
                            <Pagination.Item>{20}</Pagination.Item>
                            <Pagination.Next />
                            <Pagination.Last />
                        </Pagination>
                    </div>
                </div>
                <div>
                    <h2 className="tableHead">Archives Pots</h2>
                    <div className="pool-listing-table">
                        <table>
                        <thead className="pool-listing-table-head">
                        <tr>
                            <th>Sr. No.</th>
                            <th>Pot Type</th>
                            {/* <th>Assest Type</th> */}
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Claim Expiry Date</th>
                            <th>Reward Token Amount/ Quantity in case of NFT</th>
                            {/* <th>Ticker</th> */}
                            <th>Users Count </th>
                            <th>Game Cash Burned</th>                        
                            <th>Contract Address</th>
                            <th>Assest Name</th>
                            <th>stop claim</th>
                            <th>Actions</th>
                        </tr>
                        </thead><hr/>
                        <tbody className="pool-listing-table-body">
                            {rewardPotDetailsArray.length!==0?rewardPotDetailsArray.map((pot, index) => {
                                return (
                                    <tr key={pot?._id}>
                                    <td>{index+1}</td>
                                    <td>{pot?.potType}</td>
                                    {/* <td>{pot?.assetType}</td> */}
                                    <td>{pot?.startDate?.split('T')[0]}</td>
                                    <td>{pot?.endDate?.split('T')[0]}</td>
                                    <td>{pot?.claimExpiryDate?.split('T')[0]}</td>
                                    <td>{pot?.rewardTokenAmount}</td>
                                    {/* <td>
                                        <span title= {toTitleCase(pot?.assetDetails?.ticker)}>
                                            {pot?.assetDetails?.ticker?.length>12 && toTitleCase(pot?.assetDetails?.ticker.slice(0,12)+'...')}
                                            {pot?.assetDetails?.ticker?.length<=12 && toTitleCase(pot?.assetDetails?.ticker)}
                                        </span>
                                    </td> */}
                                    <td> 7 <span title="View User" className="eyeIcon" onClick={() => viewUserShow(true)}>
                                                <i className="fa fa-eye " />
                                            </span></td>
                                    <td>543</td>
                            
                                    <td>
                                        <span title= {pot?.assetDetails?.contractAddress}>
                                            {pot?.assetDetails?.contractAddress.length>12 && toTitleCase(pot?.assetDetails?.contractAddress.slice(0,12)+'...')}
                                            {pot?.assetDetails?.contractAddress.length<=12 && toTitleCase(pot?.assetDetails?.contractAddress)}
                                        </span>
                                    </td>
                                    <td>
                                        <span title= {pot?.assetDetails?.assetName}>
                                            {pot?.assetDetails?.assetName.length>12 && toTitleCase(pot?.assetDetails?.assetName.slice(0,12)+'...')}
                                            {pot?.assetDetails?.assetName.length<=12 && toTitleCase(pot?.assetDetails?.assetName)}
                                        </span>
                                    </td>
                                    <td>
                                    <MDBSwitch defaultChecked />
                                    </td>
                                    <td className="action-tab-pool-list">
                                            <span title="Edit Pot Details" onClick={() => editRewardPot(pot?._id)}>
                                                <i className="fa fa-edit " />
                                            </span>
                                            <span>
                                                {pot?.isActive && <MDBSwitch style={{ marginLeft: '5px' }} onChange={()=>activeDeactiveRewardPot(pot)} checked={pot?.isActive} title="De-Active"/>}
                                                {!pot?.isActive && <MDBSwitch style={{ marginLeft: '5px' }} onChange={()=>activeDeactiveRewardPot(pot)} checked={pot?.isActive}   title="Active"/>}
                                            </span>
                                    </td>
                                    </tr>
                                )
                            }):null}
                            {rewardPotDetailsArray.length===0?<tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    No Record Found
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>:null}
                        </tbody>
                        </table>
                        <Pagination>
                            <Pagination.First />
                            <Pagination.Prev />
                            <Pagination.Item active>{1}</Pagination.Item>                     

                            <Pagination.Ellipsis />
                            <Pagination.Item>{20}</Pagination.Item>
                            <Pagination.Next />
                            <Pagination.Last />
                        </Pagination>
                    </div>
                </div>
               
            </div>
            {loading ? <Loader /> : null}
                {toaster && <Toaster
                    message={toasterMessage}
                    show={toaster}
                    close={() => showToaster(false)} />
                }
             </div>
        </React.Fragment>
    )
}

export default PoolListing;