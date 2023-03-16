/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect,useState} from "react";
import './Pool.css';
import { useNavigate } from 'react-router-dom'
import {getAllRewardPot,updateRewardPotStatus, getUpcomingRewardPot, getArchivesRewardPot, getSpecificPotUsers, updateRewardClaimStatus} from '../../../Services/Admin'
import Loader from "../../../Components/Loader";
import Toaster from "../../../Components/Toaster";
import { MDBSwitch } from 'mdb-react-ui-kit';
import {Form, Button, Row, Col} from 'react-bootstrap';
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
    const [upcomingRewardPotArray, setUpcomingRewardPotArray] = useState([]);
    const [archivesRewardPotArray, setArchivesRewardPotArray] = useState([]);
    const [currentPageAcitve, setCurrentPageActive] = useState(1)
    const [currentPageUpcoming, setCurrentPageUpcoming] = useState(1)
    const [currentPageArchive, setCurrentPageArchive] = useState(1)
    const [archivePotCount, setArchivePotCount] = useState(0)
    const [activePotCount, setActivePotCount] = useState(0)
    const [upcomingPotCount, setUpcomingPotCount] = useState(0)
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

    const setShowToaster = (param) => showToaster(param);
    
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


         const nextPageActive = () => {
            // console.log(activePotCount)
            if (activePotCount >= 10)
                setCurrentPageActive(currentPageAcitve + 1)
        }

        const nextPageArchive = () => {     
            if (archivePotCount >= 10)
                setCurrentPageArchive(currentPageArchive + 1)

            // console.log('upcoming',currentPageUpcoming)
            }
        const nextPageUpcoming = () => {
            if (upcomingPotCount >= 10)
                setCurrentPageUpcoming(currentPageUpcoming + 1)

                // console.log('upcoming',currentPageUpcoming)
            }

            const prevPageActive = () => {
                if (currentPageAcitve > 1) 
                setCurrentPageActive(currentPageAcitve - 1)
        
                // console.log('active',currentPageAcitve)
        }

        const prevPageArchive = () => {
                if (currentPageArchive > 1) 
                setCurrentPageArchive(currentPageArchive - 1)

                // console.log('archive',currentPageArchive)
        }
        const prevPageUpcoming = () => {
            if (currentPageUpcoming > 1) 
            setCurrentPageUpcoming(currentPageUpcoming - 1)

        // console.log('upcoming',currentPageUpcoming)
        }
        

    const toTitleCase = (str) => {
        var string = str?.toLowerCase().split(" ");
        // console.log("string",string);
        for(var i = 0; i< string?.length; i++){
           string[i] = string[i][0]?.toUpperCase() + string[i]?.slice(1);
        }
        return string;
    }

    const getAllRewardPotDetails = async () => {
        setLoading(true);
        let dataToSend=''
        if(activePotType!=='ALL' || activePotType==='') {
        dataToSend = {
            currentPage: currentPageAcitve,
            potType: activePotType
          }
        }
        else {
            dataToSend = {
                currentPage: currentPageAcitve
            }
        }
        try {
          const getPotDetails = await getAllRewardPot(dataToSend);
          setLoading(false);
          if (getPotDetails.error) {
            setToasterMessage(getPotDetails?.message||'Something Went Worng');
            setShowToaster(true);
          } else {
              setRewardPotDetailsArray(getPotDetails?.data?.res);
              setActivePotCount(getPotDetails?.data?.count);
          }
        } catch (error) {
            setToasterMessage(error?.response?.data?.message||'Something Went Worng');
            setShowToaster(true);
            setLoading(false);
        }
    }
    const getUpcomingRewardPotDetails = async () => {
        setLoading(true);
        let dataToSend=''
        if(upcomingPotType!=='ALL' || upcomingPotType==='') {
        dataToSend = {
            currentPage: currentPageUpcoming,
            potType: upcomingPotType
          }
        }
        else {
            dataToSend = {
                currentPage: currentPageUpcoming
            }
        }
        try {
          const getPotDetails = await getUpcomingRewardPot(dataToSend);
          setLoading(false);
          if (getPotDetails.error) {
            setToasterMessage(getPotDetails?.message||'Something Went Worng');
            setShowToaster(true);
          } else {
              setUpcomingRewardPotArray(getPotDetails?.data?.res);
              setUpcomingPotCount(getPotDetails?.data?.count);
          }
        } catch (error) {
            setToasterMessage(error?.response?.data?.message||'Something Went Worng');
            setShowToaster(true);
            setLoading(false);
        }
    }
    const getArchivesRewardPotDetails = async () => {
        setLoading(true);
        let dataToSend=''
        if(archivePotType!=='ALL' || archivePotType==='') {
        dataToSend = {
            currentPage: currentPageArchive,
            potType: archivePotType
          }
        }
        else {
            dataToSend = {
                currentPage: currentPageArchive
            }
        }
        try {
          const getPotDetails = await getArchivesRewardPot(dataToSend);
          setLoading(false);
          if (getPotDetails.error) {
            setToasterMessage(getPotDetails?.message||'Something Went Worng');
            setShowToaster(true);
          } else {
              setArchivesRewardPotArray(getPotDetails?.data?.res);
              setArchivePotCount(getPotDetails?.data?.count);

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
    const viewRewardPot = (id) => {
        navigate('/viewPot',{state:{id:id}});
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
              getUpcomingRewardPotDetails();
              getArchivesRewardPotDetails();
          }
        } catch (error) {
            setToasterMessage(error?.response?.data?.message||'Something Went Worng');
            setShowToaster(true);
            setLoading(false);
        }
    }

    
    const handleActivePotType = (e) =>{
        e.preventDefault();
       getAllRewardPotDetails();
    }

    const handleUpcomingPotType = (e) =>{
        e.preventDefault();
        getUpcomingRewardPotDetails();
      
    }

    const handleArchivePotType = (e) =>{
        e.preventDefault();
        getArchivesRewardPotDetails();
    }

    const updateClaimStatus = async (data) => {
        let dataToSend = {
            potId:data._id,
            claim:!data.claimPot
        }
        setLoading(true);
        try {
          const claimStatus = await updateRewardClaimStatus(dataToSend);
          setLoading(false);
          if (claimStatus.error) {
            setToasterMessage(claimStatus?.message||'Something Went Worng');
            setShowToaster(true);
          } else {
            setToasterMessage('Claim Status Updated Succesfully');
            setShowToaster(true); 
            onInit()      
            handleClosecClaim()   
          }
        } catch (error) {
            setToasterMessage(error?.response?.data?.message||'Something Went Worng');
            setShowToaster(true);
            setLoading(false);
        }
    }

    const getPotUsers = async (data) =>{
        setPotIdForUser(data)
        let dataToSend = {
            potId: data._id,
        }
        setLoading(true);
        try {
            const usersList = await getSpecificPotUsers(dataToSend);
            setLoading(false);
            if(usersList.error){
                setToasterMessage(usersList?.message||'Something Went Worng');
                setShowToaster(true);
            } else {
                setPotUsers(usersList?.data)
                // setToasterMessage('Users listed Succesfully');
                // setShowToaster(true); 
              }
            
        } catch (error) {
            setToasterMessage(error?.response?.data?.message||'Something Went Worng');
            setShowToaster(true);
            setLoading(false);
        }
        // console.log(potUsers)

    }

    const filterPotUser = async (e) => {
        e.preventDefault();
        let dataToSend = {
            potId: potIdForUser._id, 
            email: emailFilter,
            walletSearch: walletAddressFilter
        }
        setLoading(true);
        try {
          const users = await getSpecificPotUsers(dataToSend);
          setLoading(false);
          if (users.error) {
            setToasterMessage(users?.message||'Something Went Worng');
            setShowToaster(true);
          } else {
            // setToasterMessage('Claim Status Updated Succesfully');
            // setShowToaster(true); 
            setPotUsers(users?.data)
          }
        } catch (error) {
            setToasterMessage(error?.response?.data?.message||'Something Went Worng');
            setShowToaster(true);
            setLoading(false);
        }
        // console.log(potUsers)
    }

    const handleClaimStatus = (pot) => {
        setClaimModal(true);
        setPotDetails(pot);
    }

    const resetForm = () =>{
        console.log('reset clicked')

    }

    
    const [viewUser, viewUserShow] = React.useState(false);
    const [claimModal,setClaimModal] = useState(false)
    const handleClose = () => viewUserShow(false);
    const handleClosecClaim = () => setClaimModal(false);
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
                    <Button className="" type="reset">Reset</Button>
                    </Form>
                 </div>
                <Table responsive className="pool-view-table">
                    <thead>
                        <tr>
                            <th className="sNoWth">Sr. No..</th>
                            <th>name</th>
                            <th>email</th> 
                            <th>wallet address</th>
                            {/* <th>game cash burned</th> */}
                            <th>nft Count</th>
                        </tr>
                    </thead>
                    <tbody>
                    {potUsers?.transactions?.length!==0?potUsers?.transactions?.map((user, index) => {
                        return(
                        <tr key={user._id}>
                            <td  className="sNoWth">{index+1}</td>
                            <td> {user?.userDetails?.name}</td>           
                            <td>{user?.userDetails?.email}</td>             
                            <td>{user?.walletAddress?.length>12 && toTitleCase(user?.walletAddress.slice(0,5)+'...'+user?.walletAddress.slice(-5))}
                            {' '}{' '}{' '}{' '}
                                    <span className='fa fa-copy' title='copy address' style={{ cursor: "pointer" }} onClick={() => { navigator.clipboard.writeText(user?.walletAddress); setToasterMessage( 'Copied Succesfully');setShowToaster(true);}}></span></td>  
                            <td>{user?.nftHolded}</td>
                        </tr>  
                        )
                    }):null}
                     {potUsers?.transactions?.length===0?<tr>
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
                                {/* <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                />  */}
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
                        {/* <th>Assest Type</th> */}
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Claim Expiry Date</th>
                        <th>Reward Amount</th>
                        {/* <th>Ticker</th> */}
                        <th>Users Count </th>
                        <th>Game Cash Burned</th>                     
                        <th>Contract Address</th>
                        <th>Assest Name</th>
                        <th>Stop Claim</th>
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
                                <td> {pot?.userCount}<span className="eyeIcon" title="View User" onClick={() => {viewUserShow(true); getPotUsers(pot)}}>
                                            <i className="fa fa-eye" />
                                        </span></td>
                                <td>{pot?.potAmountCollected}</td>
                               
                                <td>
                                    <span title= {pot?.assetDetails?.contractAddress}>
                                        {pot?.assetDetails?.contractAddress.length>12 && toTitleCase(pot?.assetDetails?.contractAddress.slice(0,5)+'...'+pot?.assetDetails?.contractAddress.slice(-5))}
                                        {pot?.assetDetails?.contractAddress.length<=12 && toTitleCase(pot?.assetDetails?.contractAddress)}
                                    </span>{' '}{' '}{' '}{' '}
                                    <span className='fa fa-copy' title='copy address' style={{ cursor: "pointer" }} onClick={() => { navigator.clipboard.writeText(pot?.assetDetails?.contractAddress); setToasterMessage( 'Address Copied Succesfully');setShowToaster(true);}}></span>
                                </td>
                                <td>
                                    <span title= {pot?.assetDetails?.assetName}>
                                        {pot?.assetDetails?.assetName.length>12 && toTitleCase(pot?.assetDetails?.assetName.slice(0,12)+'...')}
                                        {pot?.assetDetails?.assetName.length<=12 && toTitleCase(pot?.assetDetails?.assetName)}
                                    </span>
                               </td>
                            <td>
                              <span>
                                {pot?.claimPot && <MDBSwitch onChange={()=>handleClaimStatus(pot)} checked={pot?.claimPot} title="Stop claim"/>}
                                {!pot?.claimPot && <MDBSwitch onChange={()=>updateClaimStatus(pot)} checked={pot?.claimPot}   title="Start claim"/>}
                              </span>
                            </td>
                                <td className="action-tab-pool-list">
                                    {pot?.potAmountCollected === 0 ? <span title="Edit Pot Details" onClick={() => editRewardPot(pot?._id)}>
                                            <i className="fa fa-edit " />
                                        </span> :   <span title="Edit Pot Details" onClick={() => viewRewardPot(pot?._id)}>
                                            <i className="fa fa-eye " />
                                        </span>}
                                        <span>
                                            {pot?.isActive && <MDBSwitch style={{ marginLeft: '5px' }} onChange={()=>activeDeactiveRewardPot(pot)} checked={pot?.isActive} title="De-Active" disabled={pot?.potAmountCollected > 0 ? true:false}/>}
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
                        <Pagination.Prev onClick={prevPageActive}/>
                        <Pagination.Item active >{currentPageAcitve}</Pagination.Item>                     
                        <Pagination.Ellipsis />
                        <Pagination.Item >{20}</Pagination.Item>
                        <Pagination.Next onClick={nextPageActive}/>
                        <Pagination.Last />
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
                                    {/* <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                    />  */}
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
                            {/* <th>Assest Type</th> */}
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Claim Expiry Date</th>
                            <th>Reward Amount</th>
                            {/* <th>Ticker</th> */}
                            <th>Users Count </th>
                            <th>Game Cash Burned</th>                        
                            <th>Contract Address</th>
                            <th>Assest Name</th>
                            <th>Stop Claim</th>
                            <th>Actions</th>
                        </tr>
                        </thead><hr/>
                        <tbody className="pool-listing-table-body">
                            {upcomingRewardPotArray.length!==0?upcomingRewardPotArray.map((pot, index) => {
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
                                    <td> {pot?.userCount} <span title="View User" className="eyeIcon" onClick={() => {viewUserShow(true); getPotUsers(pot)}}>
                                                <i className="fa fa-eye " />
                                            </span></td>
                                    <td>{pot?.potAmountCollected}</td>
                                    
                                    <td>
                                        <span title= {pot?.assetDetails?.contractAddress}>
                                            {/* {pot?.assetDetails?.contractAddress.length>12 && toTitleCase(pot?.assetDetails?.contractAddress.slice(0,12)+'...')} */}
                                            {pot?.assetDetails?.contractAddress.length>12 && toTitleCase(pot?.assetDetails?.contractAddress.slice(0,5)+'...'+pot?.assetDetails?.contractAddress.slice(-5))}
                                            {pot?.assetDetails?.contractAddress.length<=12 && toTitleCase(pot?.assetDetails?.contractAddress)}
                                        </span>{' '}{' '}{' '}{' '}
                                    <span className='fa fa-copy' title='copy address' style={{ cursor: "pointer" }} onClick={() => { navigator.clipboard.writeText(pot?.assetDetails?.contractAddress); setToasterMessage( 'Address Copied Succesfully');setShowToaster(true);}}></span>
                                    </td>
                                    <td>
                                        <span title= {pot?.assetDetails?.assetName}>
                                            {pot?.assetDetails?.assetName.length>12 && toTitleCase(pot?.assetDetails?.assetName.slice(0,12)+'...')}
                                            {pot?.assetDetails?.assetName.length<=12 && toTitleCase(pot?.assetDetails?.assetName)}
                                        </span>
                                    </td>
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
                            <Pagination.First />
                            <Pagination.Prev onClick={prevPageUpcoming}/>
                            <Pagination.Item active>{currentPageUpcoming}</Pagination.Item>                     
                            <Pagination.Ellipsis />
                            <Pagination.Item>{20}</Pagination.Item>
                            <Pagination.Next onClick={nextPageUpcoming}/>
                            <Pagination.Last />
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
                                    {/* <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                    />  */}
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
                            {/* <th>Assest Type</th> */}
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Claim Expiry Date</th>
                            <th>Reward Amount</th>
                            {/* <th>Ticker</th> */}
                            <th>Users Count </th>
                            <th>Game Cash Burned</th>                        
                            <th>Contract Address</th>
                            <th>Assest Name</th>

                        </tr>
                        </thead><hr/>
                        <tbody className="pool-listing-table-body">
                            {archivesRewardPotArray.length!==0?archivesRewardPotArray.map((pot, index) => {
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
                                    <td> {pot?.userCount} <span title="View User" className="eyeIcon" onClick={() => {viewUserShow(true); getPotUsers(pot)}}>
                                                <i className="fa fa-eye " />
                                            </span></td>
                                    <td>{pot?.potAmountCollected}</td>
                            
                                    <td>
                                        <span title= {pot?.assetDetails?.contractAddress}>
                                            {/* {pot?.assetDetails?.contractAddress.length>12 && toTitleCase(pot?.assetDetails?.contractAddress.slice(0,12)+'...')} */}
                                            {pot?.assetDetails?.contractAddress.length>12 && toTitleCase(pot?.assetDetails?.contractAddress.slice(0,5)+'...'+pot?.assetDetails?.contractAddress.slice(-5))}
                                            {pot?.assetDetails?.contractAddress.length<=12 && toTitleCase(pot?.assetDetails?.contractAddress)}
                                        </span>{' '}{' '}{' '}{' '}
                                    <span className='fa fa-copy' title='copy address' style={{ cursor: "pointer" }} onClick={() => { navigator.clipboard.writeText(pot?.assetDetails?.contractAddress); setToasterMessage( 'Address Copied Succesfully');setShowToaster(true);}}></span>
                                    </td>
                                    <td>
                                        <span title= {pot?.assetDetails?.assetName}>
                                            {pot?.assetDetails?.assetName.length>12 && toTitleCase(pot?.assetDetails?.assetName.slice(0,12)+'...')}
                                            {pot?.assetDetails?.assetName.length<=12 && toTitleCase(pot?.assetDetails?.assetName)}
                                        </span>
                                    </td>
                                    {/* <td>
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
                                    </td> */}
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
                            <Pagination.First />
                            <Pagination.Prev onClick={prevPageArchive}/>
                            <Pagination.Item active>{currentPageArchive}</Pagination.Item>                     
                            <Pagination.Ellipsis />
                            <Pagination.Item>{20}</Pagination.Item>
                            <Pagination.Next onClick={nextPageArchive}/>
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