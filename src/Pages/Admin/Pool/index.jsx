/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect,useState} from "react";
import './Pool.css';
import { useNavigate } from 'react-router-dom'
import {getAllRewardPot,updateRewardPotStatus, getUpcomingRewardPot, getArchivesRewardPot, getSpecificPotUsers, updateRewardClaimStatus} from '../../../Services/Admin'
import { MDBSwitch } from 'mdb-react-ui-kit';
import {Form, Button, Row, Col} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import ApiLoader from '../../../Components/apiLoader'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../../Components/Redux/actions";


const PoolListing = () => {
    useEffect(() => {
        onInit();
    }, []);
    
    const navigate = useNavigate();
    const isLoading = useSelector(state => state.loading.isLoading)
    const dispatch = useDispatch()

    const [rewardPotDetailsArray, setRewardPotDetailsArray] = useState([]);
    const [upcomingRewardPotArray, setUpcomingRewardPotArray] = useState([]);
    const [archivesRewardPotArray, setArchivesRewardPotArray] = useState([]);
    const [currentPageAcitve, setCurrentPageActive] = useState(1)
    const [currentPageUpcoming, setCurrentPageUpcoming] = useState(1)
    const [currentPageArchive, setCurrentPageArchive] = useState(1)
    const [potUsers, setPotUsers] = useState([])
    const [activePotType, setActivePotType] = useState("");
    const [upcomingPotType, setUpcomingPotType] = useState("");
    const [archivePotType, setArchivePotType] = useState("");
    const [numberOfActivePage, setNumberOfActivePage]=useState(1)
    const [numberOfArchivePage, setNumberOfArchivePage]=useState(1)
    const [numberOfUpcomingPage, setNumberOfUpcomingPage]=useState(1)
    const [emailFilter, setEmailFilter] = useState('')
    const [walletAddressFilter, setWalletAddressFilter] = useState('')
    const [potIdForUser,setPotIdForUser] = useState('')
    const [potDetails, setPotDetails] = useState()
    
    const onInit=()=>{
        getAllRewardPotDetails();
        getUpcomingRewardPotDetails();
        getArchivesRewardPotDetails();
    }

    useEffect(() => {
        getAllRewardPotDetails();
    }, [currentPageAcitve]);

    useEffect(() => {
        getUpcomingRewardPotDetails();
    }, [currentPageUpcoming]);

    useEffect(() => {
        getArchivesRewardPotDetails();
    }, [currentPageArchive]);

    /**
     * go to next page of active pots
     */
    const nextPageActive = () => {
    // console.log(activePotCount)
    if (currentPageAcitve < numberOfActivePage)
        setCurrentPageActive(currentPageAcitve + 1)
}
     /**
     * go to next page of archive pots
     */
    const nextPageArchive = () => {     
    if (currentPageArchive < numberOfArchivePage)
        setCurrentPageArchive(currentPageArchive + 1)
    // console.log('upcoming',currentPageUpcoming)
    }

    /**
     * go to next page of upcoming pots
     */
    const nextPageUpcoming = () => {
    if (currentPageUpcoming < numberOfUpcomingPage)
        setCurrentPageUpcoming(currentPageUpcoming + 1)
        // console.log('upcoming',currentPageUpcoming)
    }

     /**
     * go to prev page of active pots
     */
    const prevPageActive = () => {
        if (currentPageAcitve > 1) 
        setCurrentPageActive(currentPageAcitve - 1)
        // console.log('active',currentPageAcitve)
    }
     /**
     * go to prev page of archive pots
     */
    const prevPageArchive = () => {
        if (currentPageArchive > 1) 
        setCurrentPageArchive(currentPageArchive - 1)

        // console.log('archive',currentPageArchive)
    }
     /**
     * go to prev page of upcoming pots
     */
    const prevPageUpcoming = () => {
    if (currentPageUpcoming > 1) 
    setCurrentPageUpcoming(currentPageUpcoming - 1)
    // console.log('upcoming',currentPageUpcoming)
    }
        
    /**
     * Convert string to Titlecase
     * @param str  String
     * @returns returns converted string
     */
    const toTitleCase = (str) => {
        var string = str?.toLowerCase().split(" ");
        // console.log("string",string);
        for(var i = 0; i< string?.length; i++){
           string[i] = string[i][0]?.toUpperCase() + string[i]?.slice(1);
        }
        return string;
    }

    /**
     * Get all active pots (Lottery || Reward || both)
     */
    const getAllRewardPotDetails = async () => {
        dispatch(setLoadingTrue());
        let dataToSend=''
        if(activePotType ==='ALL' || activePotType==='') {
        dataToSend = {
            currentPage: currentPageAcitve,
          }
        }
        else {
            dataToSend = {
                currentPage: currentPageAcitve,
                potType: activePotType
            }
        }
        try {
          const getPotDetails = await getAllRewardPot(dataToSend);
          dispatch(setLoadingFalse());
          if (getPotDetails.error) {
            toast.dismiss()
            toast.error(getPotDetails?.message||'Something went worng in geting pot details');
        } else {
              setRewardPotDetailsArray(getPotDetails?.data?.res);
              let pages = (getPotDetails?.data?.count) % 10;
              if (pages > 0 ){
              setNumberOfActivePage(Math.floor(getPotDetails?.data?.count / 10) + 1)
                }
              else {
              setNumberOfActivePage(Math.floor(getPotDetails?.data?.count / 10))
              }
          }
        } catch (error) {
            toast.dismiss()
            toast.error(error?.response?.data?.message||'Something went worng in geting pot details');
            dispatch(setLoadingFalse());
        }
         
    }

    /**
     * Get all upcoming pots (Lottery || Reward || both)
     */
    const getUpcomingRewardPotDetails = async () => {
        dispatch(setLoadingTrue());
        let dataToSend=''
        if(upcomingPotType ==='ALL' || upcomingPotType==='') {
            dataToSend = {
                currentPage: currentPageUpcoming,
              }
            }
            else {
                dataToSend = {
                    currentPage: currentPageUpcoming,
                    potType: upcomingPotType
                }
        }
        try {
          const getPotDetails = await getUpcomingRewardPot(dataToSend);
          dispatch(setLoadingFalse());
          if (getPotDetails.error) {
            toast.dismiss()
            toast.error(getPotDetails?.message||'Something went worng in geting upcoming pot details');
        } else {
              setUpcomingRewardPotArray(getPotDetails?.data?.res);
              let pages = (getPotDetails?.data?.count) % 10;
              if (pages > 0 ){
                setNumberOfUpcomingPage(Math.floor(getPotDetails?.data?.count / 10) + 1)
                }
              else {
                setNumberOfUpcomingPage(Math.floor(getPotDetails?.data?.count / 10))
              }          }
        } catch (error) {
            toast.dismiss()
            toast.error(error?.response?.data?.message||'Something went worng in geting upcoming pot details');
            dispatch(setLoadingFalse());
        }
    }

     /**
     * Get all archive pots (Lottery || Reward || both)
     */
    const getArchivesRewardPotDetails = async () => {
        dispatch(setLoadingTrue());
        let dataToSend=''
        if(archivePotType ==='ALL' || archivePotType==='') {
            dataToSend = {
                currentPage: currentPageArchive,
              }
            }
            else {
                dataToSend = {
                    currentPage: currentPageArchive,
                    potType: archivePotType
                }
        }
        try {
          const getPotDetails = await getArchivesRewardPot(dataToSend);
          dispatch(setLoadingFalse());
          if (getPotDetails.error) {
            toast.dismiss()
            toast.error(getPotDetails?.message||'Something went worng in geting acrchive pot details');
        } else {
              setArchivesRewardPotArray(getPotDetails?.data?.res);
              let pages = (getPotDetails?.data?.count) % 10;
              if (pages > 0 ){
                setNumberOfArchivePage(Math.floor(getPotDetails?.data?.count / 10) + 1)
                }
              else {
                setNumberOfArchivePage(Math.floor(getPotDetails?.data?.count / 10))
              }
          }
        } catch (error) {
            toast.dismiss()
            toast.error(error?.response?.data?.message||'Something went worng in geting acrchive pot details');
            dispatch(setLoadingFalse());
        }
         
    }

    /**
     * Edit Pot with give pot id
     * @param id String | Pot Id
     */
    const editRewardPot = (id) => {
        navigate(`/editpot/${id}`);
    }

     /**
     * View Pot with give pot id
     * @param id String | Pot Id
     */
    const viewRewardPot = (id) => {
        navigate(`/viewPot/${id}`);
        }

    /**
     * Toggle pot status
     * @param data Object | Pot id and pot status
     */
    const activeDeactiveRewardPot = async (data) => {
        let dataToSend = {
            potId:data._id,
            isActive:!data.isActive
        }
        dispatch(setLoadingTrue());
        try {
          const potSatus = await updateRewardPotStatus(dataToSend);
          dispatch(setLoadingFalse());
          if (potSatus.error) {
            toast.dismiss()
            toast.error(potSatus?.message||'Something went worng in updating reward pot status');
        } else {
            toast.dismiss()
            toast.info('Pot Status Updated Succesfully');
              getAllRewardPotDetails();
              getUpcomingRewardPotDetails();
              getArchivesRewardPotDetails();
          }
        } catch (error) {
            toast.dismiss()
            toast.error(error?.response?.data?.message||'Something went worng in updating reward pot status');
            dispatch(setLoadingFalse());
        }
         
    }

    /**
     * Change pot type of active pots list
     * @param e Event
     */
    const handleActivePotType = (e) =>{
        e.preventDefault();
       getAllRewardPotDetails();
    }

    /**
     * Change pot type of upcoming pots list
     * @param e Event
     */
    const handleUpcomingPotType = (e) =>{
        e.preventDefault();
        getUpcomingRewardPotDetails();
      
    }

    /**
     * Change pot type of archive pots list
     * @param e Event
     */
    const handleArchivePotType = (e) =>{
        e.preventDefault();
        getArchivesRewardPotDetails();
    }

    /**
     * Update claim status for a pot
     * @param data Object | Pot details
     */
    const updateClaimStatus = async (data) => {
        let dataToSend = {
            potId:data._id,
            claim:!data.claimPot
        }
        dispatch(setLoadingTrue());
        try {
          const claimStatus = await updateRewardClaimStatus(dataToSend);
          dispatch(setLoadingFalse());
          if (claimStatus.error) {
            toast.dismiss()
            toast.error(claimStatus?.message||'Something went worng  in updating reward claim status');
        } else {
            toast.dismiss()
            toast.success('Claim Status Updated Succesfully');
            onInit()      
            handleClosecClaim()   
          }
        } catch (error) {
            toast.dismiss()
            toast.error(error?.response?.data?.message||'Something went worng in updating reward claim status');
            dispatch(setLoadingFalse());
        }
         
    }

    /**
     * Get users who participated in a pot
     * @param {*} data Object | Pot details
     */
    const getPotUsers = async (data) =>{
        setPotIdForUser(data)
        let dataToSend = {
            potId: data._id,
        }
        dispatch(setLoadingTrue());
        try {
            const usersList = await getSpecificPotUsers(dataToSend);
            dispatch(setLoadingFalse());
            if(usersList.error){
            toast.dismiss()
            toast.error(usersList?.message||'Something went worng  in getting pot users');
            } else {
                setPotUsers(usersList?.data)
                // toast.dismiss();
                // toast.success('Users listed Succesfully');
            }
            
        } catch (error) {
            toast.dismiss()
            toast.error(error?.response?.data?.message||'Something went worng  in getting pot users');
            dispatch(setLoadingFalse());
        }
        // console.log(potUsers)

    }

    /**
     * Get filtered users of a pot
     */
    const filterPotUser = async (e) => {
        e.preventDefault();
        let dataToSend = {
            potId: potIdForUser._id, 
            email: emailFilter,
            walletSearch: walletAddressFilter
        }
        dispatch(setLoadingTrue());
        try {
          const users = await getSpecificPotUsers(dataToSend);
          dispatch(setLoadingFalse());
          if (users.error) {
            toast.dismiss()
            toast.error(users?.message||'Something went worng');
        } else {
            // toast.success('Claim Status Updated Succesfully');
            setPotUsers(users?.data)
          }
        } catch (error) {
            toast.dismiss()
            toast.error(error?.response?.data?.message||'Something went worng');
            dispatch(setLoadingFalse());
        }
        // console.log(potUsers)
    }


    const handleClaimStatus = (pot) => {
        setClaimModal(true);
        setPotDetails(pot);
    }

    /**
     * Format large number
     * @param value Number
     * @returns 
     */
    const formatNumberDecimal = (value) => {
        if(value > Math.pow(10,10)){
        const shortenedValue = parseFloat(value).toExponential(4);
        return shortenedValue;
        }
        else
        return value;
      };

    
    const [viewUser, viewUserShow] = React.useState(false);
    const [claimModal,setClaimModal] = useState(false)
    const handleClose = () => viewUserShow(false);
    const handleClosecClaim = () => setClaimModal(false);
    const handleShow = () => viewUserShow(true);
  
    return (
        
        <React.Fragment>
            {/* view pot users list */}
            <Modal
                show={viewUser} 
                onHide={handleClose} 
                keyboard={false}             
                size="xl"
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
                    <Form className="d-flex" onSubmit={filterPotUser} onReset={()=>{getPotUsers(potIdForUser)}}>
                        <Form.Control
                        type="search"
                        placeholder="Search with Email"
                        className="me-2"
                        aria-label="Search"
                        onChange={({ target }) => setEmailFilter(target.value)}
                        />
                         <Form.Control
                        type="search"
                        placeholder="Search with Wallet Address"
                        className="me-2"
                        aria-label="Search"
                        onChange={({ target }) => setWalletAddressFilter(target.value)}
                        />
                    <Button className="" type="submit">Search</Button>
                    <Button className="" type="reset" style={{marginLeft: '10px'}}>Reset</Button>
                    </Form>
                 </div>
                <Table responsive className="pool-view-table">
                    <thead>
                        <tr>
                            <th className="sNoWth">Sr. No..</th>
                            <th>User Name</th>
                            <th>Email</th> 
                            <th>Wallet Address</th>
                            <th>NFT Count</th>
                            <th>Token Rewarded</th>
                            <th>Token Claim Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {potUsers?.transactions?.length!==0?potUsers?.transactions?.map((user, index) => {
                        return(
                        <tr key={user._id}>
                            <td  className="sNoWth">{index+1}</td>
                            <td> {user?.userDetails?.userName}</td>           
                            <td>{user?.userDetails?.email}{' '}{' '}{' '}{' '}<span className='fa fa-copy' title='copy email' style={{ cursor: "pointer" }} onClick={() => { navigator.clipboard.writeText(user?.userDetails?.email); toast.info( 'Copied Succesfully');  }}></span></td>
                            <td>{user?.walletAddress?.length>12 && toTitleCase(user?.walletAddress.slice(0,5)+'...'+user?.walletAddress.slice(-5))}
                            {' '}{' '}{' '}{' '}
                                    <span className='fa fa-copy' title='copy address' style={{ cursor: "pointer" }} onClick={() => { navigator.clipboard.writeText(user?.walletAddress); toast.dismiss(); toast.info( 'Copied Succesfully'); }}></span></td>  
                            <td>{user?.nftHolded}</td>
                            <td>{(user?.rewardedTokenAmount)}</td>
                            <td>{user?.status}</td>
                        </tr>  
                        )
                    }):null}
                     {potUsers?.transactions?.length===0?<tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td> No Record Found </td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>:null}
                    </tbody>
                </Table>
                 
                </Modal.Body>
               
            </Modal>

              {/* stop claim modal */}
          <Modal
            show={claimModal} 
            onHide={handleClosecClaim} 
            size="lg"        
            className='viewWallet'
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
               Confirm Your Action
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <span>
            <div className='confirm-modal'>
              Are you sure to stop claim for this pot ?
              <br></br>
              <button type='primary' onClick={()=>updateClaimStatus(potDetails)}>Yes</button>
              </div>
            </span>
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
                    <div>  
                      <Row className="topForm">
                        <Col sm={4}><h2 className="tableHead">Active Pots </h2></Col>
                        <Col sm={8}>                             
                            <Form className="d-flex" onSubmit={handleActivePotType}>
                                <Form.Select aria-label="Select Pot Type"  onChange={({ target }) => setActivePotType(target.value)}>
                                        <option value="ALL">All</option>
                                        <option value="LOTTERYPOT">Lottery</option>
                                        <option value="REWARDPOT">Reward</option> 
                                </Form.Select>
                                <Button className="" type="submit">Search</Button>
                            </Form>                            
                        </Col>
                        </Row>                      
                        
                    </div>
                    <div className="pool-listing-table">
                    <table>
                    <thead className="pool-listing-table-head">
                    <tr>
                        <th>Sr. No.</th>
                        <th>Pot Type</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Claim Expiry Date</th>
                        <th>Reward Amount</th>
                        <th>Users Count </th>
                        <th>Game Cash Burned</th>                     
                        <th>Contract Address</th>
                        <th>Assest Name</th>
                        <th>Pot Status</th>
                        <th>Stop Claim</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody className="pool-listing-table-body">
                        {rewardPotDetailsArray.length!==0?rewardPotDetailsArray.map((pot, index) => {
                            return (
                                <tr key={pot?._id}>
                                <td>{((currentPageAcitve-1)*10)+index+1}</td>
                                <td>{pot?.potType}</td>
                                <td>{pot?.startDate?.split('T')[0]}</td>
                                <td>{pot?.endDate?.split('T')[0]}</td>
                                <td>{pot?.claimExpiryDate?.split('T')[0]}</td>
                                <td>{pot?.rewardTokenAmount}</td>
                                <td> {pot?.userCount}<span className="eyeIcon" title="View User" onClick={() => {viewUserShow(true); getPotUsers(pot)}}>
                                            <i className="fa fa-eye" />
                                        </span></td>
                                <td>{formatNumberDecimal(pot?.potAmountCollected?.$numberDecimal)} </td>
                               
                                <td>
                                    <span title= {pot?.assetDetails?.contractAddress}>
                                        {pot?.assetDetails?.contractAddress.length>12 && toTitleCase(pot?.assetDetails?.contractAddress.slice(0,5)+'...'+pot?.assetDetails?.contractAddress.slice(-5))}
                                        {pot?.assetDetails?.contractAddress.length<=12 && toTitleCase(pot?.assetDetails?.contractAddress)}
                                    </span>{' '}{' '}{' '}{' '}
                                    <span className='fa fa-copy' title='copy address' style={{ cursor: "pointer" }} onClick={() => { navigator.clipboard.writeText(pot?.assetDetails?.contractAddress); toast.dismiss(); toast.info( 'Address Copied Succesfully');}}></span>
                                </td>
                                <td>
                                    <span title= {pot?.assetDetails?.assetName}>
                                        {pot?.assetDetails?.assetName.length>12 && toTitleCase(pot?.assetDetails?.assetName.slice(0,12)+'...')}
                                        {pot?.assetDetails?.assetName.length<=12 && toTitleCase(pot?.assetDetails?.assetName)}
                                    </span>
                               </td>
                               <td>{pot?.potStatus}</td>
                            <td>
                              <span>
                                {pot?.claimPot && <MDBSwitch onChange={()=>handleClaimStatus(pot)} checked={pot?.claimPot} title="Stop claim"/>}
                                {!pot?.claimPot && <MDBSwitch onChange={()=>updateClaimStatus(pot)} checked={pot?.claimPot}   title="Start claim"/>}
                              </span>
                            </td>
                                <td className="action-tab-pool-list">
                                    {Number(pot?.potAmountCollected?.$numberDecimal) === 0 ? <span title="Edit Pot Details" onClick={() => editRewardPot(pot?._id)}>
                                            <i className="fa fa-edit " />
                                        </span> :   <span title="View Pot Details" onClick={() => viewRewardPot(pot?._id)}>
                                            <i className="fa fa-eye " />
                                        </span>}
                                        <span>
                                            {pot?.isActive && <MDBSwitch style={{ marginLeft: '5px' }} onChange={()=>activeDeactiveRewardPot(pot)} checked={pot?.isActive} title="De-Active" />}
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
                        <Pagination.First onClick={()=>{setCurrentPageActive(1)}}/>
                        <Pagination.Prev onClick={prevPageActive}/>
                        <Pagination.Item active >{currentPageAcitve}</Pagination.Item>                     
                        <Pagination.Ellipsis />
                        <Pagination.Item disabled>{numberOfActivePage}</Pagination.Item>
                        <Pagination.Next onClick={nextPageActive}/>
                        <Pagination.Last onClick={()=>{setCurrentPageActive(numberOfActivePage)}}/>
                    </Pagination>
                        </div>
                </div>
                <div>
                 
                    <div>    
                        <Row className="topForm">
                            <Col sm={4}><h2 className="tableHead">Upcoming Pots </h2></Col>
                            <Col sm={8}>                             
                                <Form className="d-flex" onSubmit={handleUpcomingPotType} >
                                    <Form.Select aria-label="Select Pot Type" onChange={({ target }) => setUpcomingPotType(target.value)}>
                                        <option value="ALL">All</option>
                                        <option value="LOTTERYPOT">Lottery</option>
                                        <option value="REWARDPOT">Reward</option> 
                                    </Form.Select>
                                <Button className="" type="submit">Search</Button>
                                </Form>                            
                            </Col>
                        </Row> 
                    </div>
                    <div className="pool-listing-table">
                        <table>
                        <thead className="pool-listing-table-head">
                        <tr>
                            <th>Sr. No.</th>
                            <th>Pot Type</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Claim Expiry Date</th>
                            <th>Reward Amount</th>
                            <th>Users Count </th>
                            <th>Game Cash Burned</th>                        
                            <th>Contract Address</th>
                            <th>Assest Name</th>
                            <th>pot Status</th>
                            <th>Stop Claim</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody className="pool-listing-table-body">
                            {upcomingRewardPotArray.length!==0?upcomingRewardPotArray.map((pot, index) => {
                                return (
                                    <tr key={pot?._id}>
                                    <td>{((currentPageUpcoming-1)*10)+index+1}</td>
                                    <td>{pot?.potType}</td>
                                    <td>{pot?.startDate?.split('T')[0]}</td>
                                    <td>{pot?.endDate?.split('T')[0]}</td>
                                    <td>{pot?.claimExpiryDate?.split('T')[0]}</td>
                                    <td>{pot?.rewardTokenAmount}</td>
                                    <td> {pot?.userCount} <span title="View User" className="eyeIcon" onClick={() => {viewUserShow(true); getPotUsers(pot)}}>
                                                <i className="fa fa-eye " />
                                            </span></td>
                                    <td>{pot?.potAmountCollected?.$numberDecimal}</td>
                                    
                                    <td>
                                        <span title= {pot?.assetDetails?.contractAddress}>
                                            {pot?.assetDetails?.contractAddress.length>12 && toTitleCase(pot?.assetDetails?.contractAddress.slice(0,5)+'...'+pot?.assetDetails?.contractAddress.slice(-5))}
                                            {pot?.assetDetails?.contractAddress.length<=12 && toTitleCase(pot?.assetDetails?.contractAddress)}
                                        </span>{' '}{' '}{' '}{' '}
                                    <span className='fa fa-copy' title='copy address' style={{ cursor: "pointer" }} onClick={() => { navigator.clipboard.writeText(pot?.assetDetails?.contractAddress); toast.dismiss(); toast.info( 'Address Copied Succesfully'); }}></span>
                                    </td>
                                    <td>
                                        <span title= {pot?.assetDetails?.assetName}>
                                            {pot?.assetDetails?.assetName.length>12 && toTitleCase(pot?.assetDetails?.assetName.slice(0,12)+'...')}
                                            {pot?.assetDetails?.assetName.length<=12 && toTitleCase(pot?.assetDetails?.assetName)}
                                        </span>
                                    </td>
                                    <td>{pot?.potStatus}</td>
                                    <td>
                                    <span>
                                {pot?.claimPot && <MDBSwitch onChange={()=>updateClaimStatus(pot)} checked={pot?.claimPot} title="De-Active"/>}
                                {!pot?.claimPot && <MDBSwitch onChange={()=>updateClaimStatus(pot)} checked={pot?.claimPot}   title="Active"/>}
                              </span>

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
                            {upcomingRewardPotArray.length===0?<tr>
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
                            <Pagination.First onClick={()=>{setCurrentPageUpcoming(1)}}/>
                            <Pagination.Prev onClick={prevPageUpcoming}/>
                            <Pagination.Item active>{currentPageUpcoming}</Pagination.Item>                     
                            <Pagination.Ellipsis />
                            <Pagination.Item disabled>{numberOfUpcomingPage}</Pagination.Item>
                            <Pagination.Next onClick={nextPageUpcoming}/>
                            <Pagination.Last onClick={()=>{setCurrentPageUpcoming(numberOfUpcomingPage)}}/>
                        </Pagination>
                    </div>
                </div>
                <div>
                 
                    <div>  
                        <Row  className="topForm">
                            <Col sm={4}><h2 className="tableHead">Archives Pots</h2></Col>
                            <Col sm={8}>                             
                                <Form className="d-flex" onSubmit={handleArchivePotType}>
                                    <Form.Select aria-label="Select Pot Type" onChange={({ target }) => setArchivePotType(target.value)}>
                                        <option value="ALL">All</option>
                                        <option value="LOTTERYPOT">Lottery</option>
                                        <option value="REWARDPOT">Reward</option> 
                                    </Form.Select>
                                <Button className="" type="submit">Search</Button>
                                </Form>                            
                            </Col>
                        </Row>               
                        
                    </div>
                    <div className="pool-listing-table">
                        <table>
                        <thead className="pool-listing-table-head">
                        <tr>
                            <th>Sr. No.</th>
                            <th>Pot Type</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Claim Expiry Date</th>
                            <th>Reward Amount</th>
                            <th>Users Count </th>
                            <th>Game Cash Burned</th>                        
                            <th>Contract Address</th>
                            <th>Assest Name</th>

                        </tr>
                        </thead>
                        <tbody className="pool-listing-table-body">
                            {archivesRewardPotArray.length!==0?archivesRewardPotArray.map((pot, index) => {
                                return (
                                    <tr key={pot?._id}>
                                    <td>{((currentPageArchive-1)*10)+index+1}</td>
                                    <td>{pot?.potType}</td>
                                    <td>{pot?.startDate?.split('T')[0]}</td>
                                    <td>{pot?.endDate?.split('T')[0]}</td>
                                    <td>{pot?.claimExpiryDate?.split('T')[0]}</td>
                                    <td>{pot?.rewardTokenAmount}</td>
                                    <td> {pot?.userCount} <span title="View User" className="eyeIcon" onClick={() => {viewUserShow(true); getPotUsers(pot)}}>
                                                <i className="fa fa-eye " />
                                            </span></td>
                                    <td>{formatNumberDecimal(pot?.potAmountCollected?.$numberDecimal)}</td>
                            
                                    <td>
                                        <span title= {pot?.assetDetails?.contractAddress}>
                                            {pot?.assetDetails?.contractAddress.length>12 && toTitleCase(pot?.assetDetails?.contractAddress.slice(0,5)+'...'+pot?.assetDetails?.contractAddress.slice(-5))}
                                            {pot?.assetDetails?.contractAddress.length<=12 && toTitleCase(pot?.assetDetails?.contractAddress)}
                                        </span>{' '}{' '}{' '}{' '}
                                    <span className='fa fa-copy' title='copy address' style={{ cursor: "pointer" }} onClick={() => { navigator.clipboard.writeText(pot?.assetDetails?.contractAddress); toast.dismiss(); toast.info( 'Address Copied Succesfully');}}></span>
                                    </td>
                                    <td>
                                        <span title= {pot?.assetDetails?.assetName}>
                                            {pot?.assetDetails?.assetName.length>12 && toTitleCase(pot?.assetDetails?.assetName.slice(0,12)+'...')}
                                            {pot?.assetDetails?.assetName.length<=12 && toTitleCase(pot?.assetDetails?.assetName)}
                                        </span>
                                    </td>
                                    </tr>
                                )
                            }):null}
                            {archivesRewardPotArray.length===0?<tr>
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
                            <Pagination.First onClick={()=>{setCurrentPageArchive(1)}}/>
                            <Pagination.Prev onClick={prevPageArchive}/>
                            <Pagination.Item active>{currentPageArchive}</Pagination.Item>                     
                            <Pagination.Ellipsis />
                            <Pagination.Item  disabled>{numberOfArchivePage}</Pagination.Item>
                            <Pagination.Next onClick={nextPageArchive}/>
                            <Pagination.Last onClick={()=>{setCurrentPageArchive(numberOfArchivePage)}}/>
                        </Pagination>
                    </div>
                </div>
               
            </div>
            {isLoading ? <ApiLoader /> : null} 
            
             </div>
        </React.Fragment>
    )
}

export default PoolListing;