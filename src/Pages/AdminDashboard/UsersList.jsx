import React, { useEffect, useState } from 'react'
import { Col, Row, Form, Button, Table } from 'react-bootstrap'
import { getAllUsers } from '../../Services/User'
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
  const [currentPage, setCurrentPage] = useState(0)
  const [allUsers, setAllUsers] = useState(null)
  const [disable, disableSubmitButton] = useState(false)

  useEffect(() => {
    fetchApi()
    // console.log('Total users=>', allUsers?.data?.users)
    
  }, [currentPage])

  const fetchApi = async () => {
    // console.log('current Page before api call',currentpage)
    let dataToSend = {
      currentPage: currentPage,
    }

    try {
      const users = await getAllUsers(dataToSend)
    // console.log('PAGE',currentpage)
    // console.log('fetched users',users?.data?.Users)

      setLoading(false)
      if (users?.error == true) {
        setToasterMessage(users?.message)
        setShowToaster(true)
      } else {
        setToasterMessage(users?.message)
        setAllUsers(users)
      }
    } catch (error) {
      setToasterMessage('Something Went Worng')
      setShowToaster(true)
      setLoading(false)
    }

    setLoading(false)
  }


  const updateActiveUser = (userInfo) =>{
    console.log(userInfo)
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
  const [viewWallet, viewWalletShow] = React.useState(false);

  const handleClose = () => viewWalletShow(false);
  const handleShow = () => viewWalletShow(true);

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
                        <Form.Select aria-label="Default select example">
                          <option>wr3hjkfdhidsyfur7uhfjkfjkjkjsk3r3</option>
                          <option value="1">wr3hjkfdhidsyfur7uhfjkfjkjkjsk3</option>
                          <option value="2">T3r3r3rwo</option>
                          <option value="3">r3rfe3rw3r</option>
                        </Form.Select>
                        </td>               
                        <td>44556</td>  
                        <td>76868</td>
                    </tr>              
                  
                </tbody>
            </Table>
              
            </Modal.Body>
               
          </Modal>
      <div className="users-listing">
        {/*  */}
        if(loading)
        <div className="users-list-filters">
          <Row>
            <Col md="2">
              <Form.Group  >
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  required
                  type="date"
                  // min={new Date().toISOString().split("T")[0]}
                  // max={endDate}
                  // value={rewadPotDetail.startDate|| ''}
                  // onChange={({ target }) => setRewardPotDetail({...rewadPotDetail,startDate:target.value})}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">Start Date is required !!</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md="2">
              <Form.Group  >
              <Form.Label>End Date</Form.Label>
              <Form.Control
                required
                type="date"
                // min={rewadPotDetail?.startDate}
                // value={endDate|| ''}
                // onChange={({ target }) => { setEndDate(target.value); getClaimExpiryTime(target.value, 'date');  }}
              >
                
              </Form.Control>
              <Form.Control.Feedback type="invalid">End Date is required !!</Form.Control.Feedback>
            </Form.Group>
            </Col>
            <Col md="6">
              <Form.Group >
              <Form.Label>Mail Id</Form.Label>
            <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                />
            </Form.Group>
            </Col>
            <Col md="2" className='mt-auto mb-0'>
            <Button type="submit" className="">Search</Button>
            {/* <button type="submit" className="add-pot-submit-button" >Search</button> */}
            </Col>
            
          </Row>
          {/* Filter by date:
          <input type='date' placeholder='DD/MM/YY'/>
          <input type='date' placeholder='DD/MM/YY'/> */}
          
         
          
      

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
                <th className='sNoWth'>is Active ?</th>
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
                        <td className='d-flex justify-content-between'>{user?.email} <span className='fa fa-copy' title='copy email' style={{ cursor: "pointer" }} onClick={() => { navigator.clipboard.writeText(user?.email); setToasterMessage( 'Copied Succesfully');setShowToaster(true);}}></span></td>
                        <td>{user?.createdAt?.split('T')[0]}</td>
                        <td>
                          <span className="eyeIcon" title="View wallet" onClick={() => viewWalletShow(true)}> <i className="fa fa-eye " /></span>
                        </td>
                        <td className='sNoWth'>
                            {user?.isActive && <MDBSwitch style={{ marginLeft: '5px' }} onChange={()=>updateActiveUser(user)} checked={user?.isActive} title="De-Active"/>}
                            {!user?.isActive && <MDBSwitch style={{ marginLeft: '5px' }} onChange={()=>updateActiveUser(user)} checked={user?.isActive}   title="Active"/>}  
                        </td>
                      </tr>
                    )
                  })
                : null}
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
        {/* <button type="submit" disabled={disable} className="add-pot-submit-button " onClick={nextPage} > Next </button>
        <button type="submit" disabled={disable} className="add-pot-submit-button " onClick={prevPage} > Prev </button> */}
        {loading ? <Loader /> : null} {toaster && ( <Toaster message={toasterMessage} show={toaster} close={() => showToaster(false)} /> )}

      </div>
      </div>
    </React.Fragment>
  )
}

export default UsersList

