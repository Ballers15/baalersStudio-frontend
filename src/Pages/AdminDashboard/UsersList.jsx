import React, { useEffect, useState } from 'react'
import { Col, Row, Form, Button, Table } from 'react-bootstrap'
import { getAllUsers, getUserWalletDetails, updateUserStatus } from '../../Services/User'
import { MDBSwitch } from 'mdb-react-ui-kit'; 
import Modal from 'react-bootstrap/Modal';
import './AdminDashboard.css'
import Pagination from 'react-bootstrap/Pagination';
import ApiLoader from '../../Components/apiLoader'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../Components/Redux/actions";

const UsersList = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.loading.isLoading)
  const [currentPage, setCurrentPage] = useState(1)
  const [allUsers, setAllUsers] = useState()
  const [walletDetails,setWalletDetails] = useState([])
  const [confirmUser, setConfirmUser]=useState([])
  const [rewadPotDetail,setRewardPotDetail] = useState([])
  const [lastPage, setLastPage] = useState(null)
  const [viewWallet, viewWalletShow] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  let resetFlag = false;
  const handleClose = () => viewWalletShow(false);
  const handleCloseModal = () => setConfirmModal(false);
  
  useEffect(() => {
    getUsers()
  }, [currentPage])

  /**
   * Get all users data
   * @param  email String | filter user using email
   */
  const getUsers = async () => {
    setAllUsers([]);
    let dataToSend = ''
    if (!resetFlag){
    dataToSend = {
      currentPage: currentPage,
      startDate: rewadPotDetail?.startDate,
      endDate: rewadPotDetail?.endDate,
      email: rewadPotDetail?.email
    }
  }
  else{
    dataToSend = {
      currentPage: currentPage
    }
  }
    dispatch(setLoadingTrue());
    try {
      const users = await getAllUsers(dataToSend)
      dispatch(setLoadingFalse());
      if (users?.error == true) {
        toast.dismiss();
        toast.error(users?.message)
      } else {
        // toast.dismiss();
        // toast.success(users?.message)
        setAllUsers(users)
        let pages= Math.floor( users?.data?.count / 10 ) + 1;
        setLastPage(pages);
      }
    } catch (error) {
      toast.dismiss();
      toast.error('Something went worng in getting all users')
      dispatch(setLoadingFalse());
    }
  }

  /**
   * Get user walltet details (all wallet addresses of a user)
   * @param data String | user _id
   */
  const UserWalletdetails = async (id) => {
    viewWalletShow(true)
    let dataToSend = {
      userId: id,
    }
    dispatch(setLoadingTrue());   
    try {
      const wallet = await getUserWalletDetails(dataToSend)
      dispatch(setLoadingFalse());
      if (wallet?.error == true) {
        toast.dismiss();
        toast.error(wallet?.message)
      } else {
        toast.dismiss();
        toast.success(wallet?.message)
        setWalletDetails(wallet.data)
      }
    } catch (error) {
      toast.dismiss();
      toast.error('Something went worngin getting user wallet details')
      dispatch(setLoadingFalse());
    }
     
  }  

 /**
 * Block / unblock user
 * @param data Object | user details
 */
  const updateActiveUser = async (data) =>{
    let dataToSend = {
      userId: data._id,
      isBlocked: !data.isBlocked
    }
    dispatch(setLoadingTrue()); 
    try {
      const userStatus = await updateUserStatus(dataToSend)
      dispatch(setLoadingFalse());
      if (userStatus?.error == true) {
        toast.dismiss();
        toast.error(userStatus?.message)
      } else {
        toast.dismiss();
        toast.success(userStatus?.message)
        handleCloseModal()
        getUsers()
      }
    } catch (error) {
      toast.dismiss();
      toast.error('Something went worng in updating active user')
      dispatch(setLoadingFalse());
    }
  }

  const nextPage = () => {
    if (currentPage < lastPage)
     setCurrentPage(currentPage + 1)
  }
  const prevPage = () => {
    if (currentPage > 1) 
    setCurrentPage(currentPage - 1)
  }
  const handleConfirmModal = (userinfo) => {
    setConfirmUser(userinfo)
    setConfirmModal(true)
  }

  /**
   * get Filtered users
   * @param e from event
   */
  const getFilterUsers =  (e) => {
    e.preventDefault();
    setCurrentPage(1)
    getUsers()
    console.log('filter',rewadPotDetail)

  }

  /**
   * Format large number
   * @param value Number | large number > 10^10
   * @returns formatted number
   */
  const formatNumberDecimal = (value) => {
    if(value > Math.pow(10,10)){
      const shortenedValue = parseFloat(value).toExponential(4);
      return shortenedValue;
    }
    else
      return value;
  };

  /**
   * Reset search form data
   * @param  e Event | Event from From submission
   */
  const handleReset = (e) => {
      e.preventDefault();
      resetFlag = true;
      setRewardPotDetail({...rewadPotDetail,startDate:'',endDate:'',email:''})
      getUsers()
      console.log('resett',rewadPotDetail)
  }

  return (
    <React.Fragment>

      {/* wallet details modal */}
         <Modal
            show={viewWallet} 
            onHide={handleClose} 
            keyboard={false}             
            size="lg"        
            className='viewWallet'
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
               Wallet Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
             
            <Table className="users-lisitng-table">
                <thead  >
                    <tr> 
                        <th>Wallet Address</th>
                        <th>Total in game cash burned</th>  
                        <th>Total Reward earned</th>
                    </tr>
                </thead>
                <tbody >
                    <tr> 
                        <td> 
                        <Form.Select onChange={(e) => { navigator.clipboard.writeText(e.target.value); toast.dismiss(); toast.info( 'Wallet Address Copied !!');}}>
                        {walletDetails?.walletDetails?.length ? <option value='' >Select Address</option> : <option value='No Wallet found'>No Wallet found</option>}
                          {walletDetails?.walletDetails && walletDetails?.walletDetails?.map((wallet) => (
                            <option value={wallet|| ''} key={wallet}>
                              {wallet?.slice(0,5)+'....'+wallet?.slice(-5)}  
                            </option>)) }
                        </Form.Select>
                        </td>               
                        <td>{formatNumberDecimal(walletDetails?.totalSum?.$numberDecimal) || '0'}</td>  
                        <td>{walletDetails?.rewardTokenAmount || '0' }</td>
                    </tr>              
                  
                </tbody>
            </Table>
              
            </Modal.Body>
               
          </Modal>

          
          {/* block user modal */}
          <Modal
            show={confirmModal} 
            onHide={handleCloseModal} 
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
              Are you sure to block {confirmUser?.userName} ?
              <br></br>
              <button type='primary' onClick={()=>updateActiveUser(confirmUser)}>Yes</button>
              <button type='primary' onClick={()=>setConfirmModal(false)}>No</button>
              </div>
            </span>
            </Modal.Body>
          </Modal>

      <div className="users-listing">
        <div className="users-list-filters">
        <Form onSubmit={getFilterUsers} onReset={(e)=>{handleReset(e)}}>
          <Row>
            <Col md="2">
              <Form.Group  >
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={rewadPotDetail.startDate|| ''}
                  onChange={({ target }) => setRewardPotDetail({...rewadPotDetail,startDate:target.value})}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">Start Date is required !!</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md="2">
              <Form.Group  >
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                min={rewadPotDetail?.startDate}
                max={new Date().toISOString().split("T")[0]}
                value={rewadPotDetail?.endDate|| ''}
                onChange={({ target }) => { setRewardPotDetail({...rewadPotDetail,endDate:target.value})}}
                onReset={()=>setRewardPotDetail({...rewadPotDetail,endDate:''})}
              >
              </Form.Control>
              <Form.Control.Feedback type="invalid">End Date is required !!</Form.Control.Feedback>
            </Form.Group>
            </Col>
            <Col md="6">
              <Form.Group >
              <Form.Label>Email</Form.Label>
            <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={({ target }) => setRewardPotDetail({...rewadPotDetail,email:target.value})}
                value={rewadPotDetail.email || ''}
                />
            </Form.Group>
            </Col>
            <Col md="2" className='mt-auto mb-0'>
            <Button type="submit" className="">Search</Button>
            <Button type="reset" className="" style={{marginLeft:'15px'}}>Clear</Button>
            </Col>
            
          </Row>
          </Form>

        </div>
        <div className="users-lisitng"> 
        <div className="users-lisitng-container">
          <table className="users-lisitng-table">
            <thead className="users-listing-table-head">
              <tr>
                <th className='sNoWth'>Sr. No.</th>
                <th>Username</th>
                <th>Email</th>
                <th>Provider</th>
                <th>Created At</th>
                <th>Wallet Details</th>
                <th className='sNoWth'>is Blocked ?</th>
              </tr>
            </thead> 
            <tbody className="users-listing-table-body">
              {allUsers?.data?.Users.length !== 0
                ? allUsers?.data?.Users.map((user, index) => {
                    return ( 
                      <tr key={user?._id}>
                        <td className='sNoWth'>{((currentPage-1)*10)+index + 1}</td>
                        <td>{user?.userName}</td>
                        <td className='d-flex justify-content-between'><span title={user?.email} className='emailWth'>{user?.email} </span> <span className='fa fa-copy' title='copy email' style={{ cursor: "pointer" }} onClick={() => { navigator.clipboard.writeText(user?.email); toast.dismiss(); toast.info( 'Email Copied !!');}}></span></td>
                        <td>{user?.provider}</td>
                        <td>{user?.createdAt?.split('T')[0]}</td>
                        <td>
                          <span className="eyeIcon" title="View wallet" onClick={() => UserWalletdetails(user?._id)}> <i className="fa fa-eye " /></span>
                        </td>
                        <td className='sNoWth'>
                            {user?.isBlocked && <MDBSwitch style={{ marginLeft: '5px' }} onChange={()=>updateActiveUser(user)} checked={user?.isBlocked} title="Unblock"/>}
                            {!user?.isBlocked && <MDBSwitch style={{ marginLeft: '5px' }} onChange={()=>handleConfirmModal(user)} checked={user?.isBlocked}   title="Block"/>}  
                        </td>
                      </tr>
                    )
                  })
                : null}
            </tbody>
          </table>
          <Pagination>
              <Pagination.First onClick={()=>{setCurrentPage(1)}}/>
              <Pagination.Prev onClick={prevPage}/>
              <Pagination.Item active>{currentPage}</Pagination.Item>                     
              <Pagination.Ellipsis />
              <Pagination.Item  onClick={()=>{setCurrentPage(lastPage)}}>{lastPage}</Pagination.Item>
              <Pagination.Next onClick={nextPage}/>
              <Pagination.Last onClick={()=>{setCurrentPage(lastPage)}}/>
          </Pagination>
        </div>
        
        
          {isLoading ? <ApiLoader /> : null} 

      </div>
      </div>
    </React.Fragment>
  )
}

export default UsersList

