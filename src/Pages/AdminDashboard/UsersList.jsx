import React, { useEffect, useState } from 'react'
import { Col, Row, Form, Button, Table } from 'react-bootstrap'
import { getAllUsers, getUserWalletDetails, updateUserStatus } from '../../Services/User'
import Loader from '../../Components/Loader'
import Toaster from '../../Components/Toaster'
import { MDBSwitch } from 'mdb-react-ui-kit'; 
import Modal from 'react-bootstrap/Modal';
import './AdminDashboard.css'
import Pagination from 'react-bootstrap/Pagination';

const UsersList = () => {
  const [loading, setLoading] = useState(false)
  const setShowToaster = param => showToaster(param)
  const [toaster, showToaster] = useState(false)
  const [toasterMessage, setToasterMessage] = useState('')
  const [toasterColor, setToasterColor] = useState('primary')
  const [currentPage, setCurrentPage] = useState(0)
  const [allUsers, setAllUsers] = useState(null)
  const [disable, disableSubmitButton] = useState(false)
  const [walletDetails,setWalletDetails] = useState([])
  const [confirmUser, setUser]=useState([])
  const [rewadPotDetail,setRewardPotDetail] = useState([])
  const [endDate,setEndDate]=useState()

  useEffect(() => {
    fetchApi()
    
  }, [currentPage])

  const fetchApi = async () => {
    let dataToSend = {
      currentPage: currentPage,
    }

    try {
      const users = await getAllUsers(dataToSend)
      setLoading(false)
      if (users?.error == true) {
        setToasterMessage(users?.message)
        setShowToaster(true)
        setToasterColor('danger')
      } else {
        setToasterMessage(users?.message)
        // setShowToaster(true)
        // setToasterColor('success')
        setAllUsers(users)
      }
    } catch (error) {
      setToasterMessage('Something Went Worng in getting all users')
      setShowToaster(true)
      setToasterColor('danger')
      setLoading(false)
    }
     
  }

  const UserWalletdetails = async (data) => {
    viewWalletShow(true)
    let dataToSend = {
      userId: data._id,
    }
    setLoading(true);
    try {
      const wallet = await getUserWalletDetails(dataToSend)
      setLoading(false)
      if (wallet?.error == true) {
        setToasterMessage(wallet?.message)
        setShowToaster(true)
        setToasterColor('danger')
      } else {
        setToasterMessage(wallet?.message)
        // setShowToaster(true)
        // setToasterColor('success')
        setWalletDetails(wallet.data)
      }
    } catch (error) {
      setToasterMessage('Something Went Worngin getting user wallet details')
      setShowToaster(true)
      setToasterColor('danger')
      setLoading(false)
    }
     
  }  


  const updateActiveUser = async (data) =>{
    let dataToSend = {
      userId: data._id,
      isBlocked: !data.isBlocked
    }
    setLoading(true);

    try {
      const userStatus = await updateUserStatus(dataToSend)
      setLoading(false)
      if (userStatus?.error == true) {
        setToasterMessage(userStatus?.message)
        setShowToaster(true)
        setToasterColor('danger')
      } else {
        setToasterMessage(userStatus?.message)
        // setShowToaster(true)
        // setToasterColor('success')
        handleCloseModal()
        fetchApi()
      }
    } catch (error) {
      setToasterMessage('Something Went Worng in updating active user')
      setShowToaster(true)
      setToasterColor('danger')
      setLoading(false)
    }
     
  }

  const nextPage = () => {
    if (allUsers?.data?.count > 10)
     setCurrentPage(currentPage + 1)
    else disableSubmitButton(true)
  }
  const prevPage = () => {
    if (currentPage > 0) 
    setCurrentPage(currentPage - 1)
    else disableSubmitButton(true)
  }
  const handleConfirmModal = (userinfo) => {
    setUser(userinfo)
    setConfirmModal(true)

  }
  const [viewWallet, viewWalletShow] = React.useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

  const handleClose = () => viewWalletShow(false);
  const handleCloseModal = () => setConfirmModal(false);
  const handleShow = () => viewWalletShow(true);


  const getFilterUsers = async (e) => {
    e.preventDefault();
    let dataToSend = {
      currentPage: currentPage,
      startDate: rewadPotDetail.startDate,
      endDate: rewadPotDetail.endDate,
      email: rewadPotDetail.email
    }

    try {
      const users = await getAllUsers(dataToSend)
      setLoading(false)
      if (users?.error == true) {
        setToasterMessage(users?.message)
        setShowToaster(true)
        setToasterColor('danger')
      } else {
        setToasterMessage(users?.message)
        // setShowToaster(true)
        // setToasterColor('success')
        setAllUsers(users)
        console.log(users)
      }
    } catch (error) {
      setToasterMessage('Something Went Worng in getting filtered users')
      setShowToaster(true)
      setToasterColor('danger')
      setLoading(false)
    }
     
  }

  const formatNumberDecimal = (value) => {
    if(value > Math.pow(10,10)){
    const shortenedValue = parseFloat(value).toExponential(4);
    return shortenedValue;
    }
    else
    return value;
  };

  return (
    <React.Fragment>
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
                </thead> <hr/>
                <tbody >
                    <tr> 
                        <td> 
                        <Form.Select aria-label="Default select example" onChange={(e) => { navigator.clipboard.writeText(e.target.value); setToasterMessage( 'Copied Succesfully');setShowToaster(true);}}>
                        <option value='select address'>Select Address</option>
                          {walletDetails?.walletDetails && walletDetails?.walletDetails?.map((wallet) => (
                            <option value={wallet|| ''} key={wallet}>
                              {wallet?.slice(0,5)+'....'+wallet?.slice(-5)}  <span className='fa fa-copy' title='copy address' style={{cursor:"pointer"}} onClick={() => { navigator.clipboard.writeText(wallet); setToasterMessage( 'Copied Succesfully');setShowToaster(true);}}></span>
                              {/* <span className='d-flex justify-content-between' ><span className='emailWth' style={{backgroundColor:'yellow'}}>{wallet} </span> <span className='fa fa-copy' title='copy email' style={{ cursor: "pointer" }} onClick={() => { navigator.clipboard.writeText(wallet); setToasterMessage( 'Copied Succesfully');setShowToaster(true);}}></span></span> */}
                            </option>)) }
                        </Form.Select>
                        </td>               
                        <td>{formatNumberDecimal(walletDetails?.totalSum?.$numberDecimal)}</td>  
                        <td>{walletDetails?.rewardTokenAmount}</td>
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
              </div>
            </span>
            </Modal.Body>
          </Modal>

      <div className="users-listing">
        {/*  */}
        if(loading)
        <div className="users-list-filters">
        <Form onSubmit={getFilterUsers}>

          <Row>
            <Col md="2">
              
              <Form.Group  >
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  
                  type="date"
                  max={rewadPotDetail?.endDate}
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
                onChange={({ target }) => { setRewardPotDetail({...rewadPotDetail,endDate:target.value})  }}
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
                />
            </Form.Group>
            </Col>
            <Col md="2" className='mt-auto mb-0'>
            <Button type="submit" className="">Search</Button>
          
            <Button type="reset" className="" style={{marginLeft:'15px'}} onClick={fetchApi}>Clear</Button>
            
            {/* <button type="submit" className="add-pot-submit-button" >Search</button> */}
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
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Created At</th>
                <th>Wallet Details</th>
                <th className='sNoWth'>is Blocked ?</th>
              </tr>
            </thead> <hr/>
            <tbody className="users-listing-table-body">
              {allUsers?.data?.Users.length !== 0
                ? allUsers?.data?.Users.map((user, index) => {
                    return ( 
                      <tr key={user?._id}>
                        <td className='sNoWth'>{index + 1}</td>
                        <td>{user?.name}</td>
                        <td>{user?.userName}</td>
                        <td className='d-flex justify-content-between'><span className='emailWth'>{user?.email} </span> <span className='fa fa-copy' title='copy email' style={{ cursor: "pointer" }} onClick={() => { navigator.clipboard.writeText(user?.email); setToasterMessage( 'Copied Succesfully');setShowToaster(true);}}></span></td>
                        <td>{user?.createdAt?.split('T')[0]}</td>
                        <td>
                          <span className="eyeIcon" title="View wallet" onClick={() => UserWalletdetails(user)}> <i className="fa fa-eye " /></span>
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
              <Pagination.First />
              <Pagination.Prev onClick={prevPage}/>
              <Pagination.Item active>{currentPage+1}</Pagination.Item>                     
              <Pagination.Ellipsis />
              <Pagination.Item>{20}</Pagination.Item>
              <Pagination.Next onClick={nextPage}/>
              <Pagination.Last />
          </Pagination>
        </div>
        {/* <button type="submit" disabled={disable} className="add-pot-submit-button " onClick={nextPage} > Next </button>
        <button type="submit" disabled={disable} className="add-pot-submit-button " onClick={prevPage} > Prev </button> */}
        {loading ? <Loader /> : null} {toaster && ( <Toaster message={toasterMessage} show={toaster} close={() => showToaster(false)} bg={toasterColor}/> )}

      </div>
      </div>
    </React.Fragment>
  )
}

export default UsersList

