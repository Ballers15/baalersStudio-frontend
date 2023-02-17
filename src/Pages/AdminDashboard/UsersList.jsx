import React, { useEffect, useState } from 'react'
import { Col, Row, Form } from 'react-bootstrap'
import { getAllUsers } from '../../Services/User'
import Loader from '../../Components/Loader'
import Toaster from '../../Components/Toaster'
import { MDBSwitch } from 'mdb-react-ui-kit';
import './AdminDashboard.css'

const UsersList = () => {
  const [loading, setLoading] = useState(false)
  const setShowToaster = param => showToaster(param)
  const [toaster, showToaster] = useState(false)
  const [toasterMessage, setToasterMessage] = useState('')
  const [currentpage, setCurrentPage] = useState(0)
  const [allUsers, setAllUsers] = useState(null)
  const [disable, disableSubmitButton] = useState(false)

  useEffect(() => {
    fetchApi()
    // console.log('Total users=>', allUsers?.data?.users)
    
  }, [currentpage])

  const fetchApi = async () => {
    // console.log('current Page before api call',currentpage)
    let dataToSend = {
      currentpage: currentpage,
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
     setCurrentPage(currentpage + 1)
    else disableSubmitButton(true)
  }
  const prevPage = () => {
    if (currentpage > 0) 
    setCurrentPage(currentpage - 1)
    else disableSubmitButton(true)
  }


  return (
    <React.Fragment>
      <div className="users-listing">
        {/*  */}
        if(loading)
        <div className="users-list-filters">
          {/* Filter by date:
          <input type='date' placeholder='DD/MM/YY'/>
          <input type='date' placeholder='DD/MM/YY'/> */}
          <Form.Group
            as={Col}
            md="2"
          >
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
          <Form.Group
            as={Col}
            md="2"
          >
            <Form.Label>End Date</Form.Label>
            <Form.Control
              required
              type="date"
              // min={rewadPotDetail?.startDate}
              // value={endDate|| ''}
              // onChange={({ target }) => { setEndDate(target.value); getClaimExpiryTime(target.value, 'date');  }}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">End Date is required !!</Form.Control.Feedback>
          </Form.Group>
          <button type="submit" className="add-pot-submit-button" >Search</button>

        </div>
        <div className="users-lisitng-container">
          <table className="users-lisitng-table">
            <thead className="users-listing-table-head">
              <tr>
                <th>Sr. No.</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Created At</th>
                <th>is Active ?</th>
              </tr>
            </thead>
            <tbody className="users-listing-table-body">
              {allUsers?.data?.Users.length !== 0
                ? allUsers?.data?.Users.map((user, index) => {
                    return ( 
                      <tr key={user?._id}>
                        <td>{index + 1}</td>
                        <td>{user?.name}</td>
                        <td>{user?.userName}</td>
                        <td>{user?.email} <span className='fa fa-copy' title='copy email' style={{ cursor: "pointer" }} onClick={() => { navigator.clipboard.writeText(user?.email); setToasterMessage( 'Copied Succesfully');setShowToaster(true);}}></span></td>
                        <td>{user?.createdAt?.split('T')[0]}</td>
                        <td>
                            {user?.isActive && <MDBSwitch style={{ marginLeft: '5px' }} onChange={()=>updateActiveUser(user)} checked={user?.isActive} title="De-Active"/>}
                            {!user?.isActive && <MDBSwitch style={{ marginLeft: '5px' }} onChange={()=>updateActiveUser(user)} checked={user?.isActive}   title="Active"/>}  
                        </td>
                      </tr>
                    )
                  })
                : null}
            </tbody>
          </table>
        </div>
        <button type="submit" disabled={disable} className="add-pot-submit-button " onClick={nextPage} > Next </button>
        <button type="submit" disabled={disable} className="add-pot-submit-button " onClick={prevPage} > Prev </button>
        {loading ? <Loader /> : null} {toaster && ( <Toaster message={toasterMessage} show={toaster} close={() => showToaster(false)} /> )}

      </div>
    </React.Fragment>
  )
}

export default UsersList

