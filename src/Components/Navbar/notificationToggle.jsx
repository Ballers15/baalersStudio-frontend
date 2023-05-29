import Dropdown from 'react-bootstrap/Dropdown';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoadingFalse, setLoadingTrue } from '../Redux/actions';
import { toast } from 'react-toastify';
import { readAllNotifications, readSingleNotification, userNotifications } from '../../Services/User';
import { useNavigate } from 'react-router-dom';

export default function NotificationToggle() {

  let strAuth = useSelector(state => state.user.user);
  let _u = JSON.parse(strAuth);
  const dispatch = useDispatch();
  const [arr,setArr] = useState('');
  const navigate = useNavigate();
  
  useEffect(()=>{
    if(_u!==null)
       getNotificaions()
  },[])

  // useEffect(() => {
  //   if(arr!='')
  // console.log(arr.length)
  // console.log(arr.length,arr)
  //  }, [arr])


  /**
   * Get all notifications of a user
   */
  const getNotificaions = async () =>{

    dispatch(setLoadingTrue()); 
    try {
      const user_notifications = await userNotifications()
      dispatch(setLoadingFalse());
      if (user_notifications?.error == true) {
        toast.dismiss();
        toast.error(user_notifications?.message)
      } else {
          setArr(user_notifications?.data)
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error)
      dispatch(setLoadingFalse());
    }
     
  }

  /**
   * Api for marking single notification as read by user
   * @param id String | Notification Id to be marked as read
   */
  const markSignleAsRead = async (id) =>{
    let dataToSend = {
      notificationId: id,
    }
    dispatch(setLoadingTrue()); 
    try {
      const read = await readSingleNotification(dataToSend)
      dispatch(setLoadingFalse());
      if (read?.error == true) {
        toast.dismiss();
        toast.error(read?.message)
      } else {
        setTimeout(() => {
          getNotificaions();
        }, 300);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error)
      dispatch(setLoadingFalse());
    }  
  }

  /**
   * Api for marking all notifications as read by user
   */
  const markAllAsRead = async () =>{
    dispatch(setLoadingTrue()); 
    try {
      const readAll = await readAllNotifications()
      dispatch(setLoadingFalse());
      if (readAll?.error == true) {
        toast.dismiss();
        toast.error(readAll?.message)
      } else {
        getNotificaions();
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error)
      dispatch(setLoadingFalse());
    }  
  }


/**
 * Slide out animation when clicked on a single notification
 * @param event Event | to prevent dropdown from closing
 * @param data object | details of clicked notification
 */
const markAsRead = (event,data) => {
  event.stopPropagation();

  if(data?.message?.includes('Lottery Pot'))
    navigate('/pool/lottery')
  if(data?.message?.includes('Reward Pot'))
    navigate('/pool/reward')
  
  const element = document.getElementById(data?._id);
  element.classList.add('slide-out');
  markSignleAsRead(data?._id)
}

/**
* Hit markAllRead api and empty arra  Mark all notifications as read
*/
const markAllRead = () =>{ 
  if(arr.length !== 0){
    markAllAsRead()
    // setArr('')
  }
}

  return (
    <Dropdown className='notification' id='notification-dropdown'>
    <Dropdown.Toggle id="dropdown-button-dark-example1" >
    {arr.length===0 ? <i className="fa fa-bell-o" aria-hidden="true"></i> : <><i className="fa fa-bell" aria-hidden="true"></i><sup className='notification-count'>{arr.length}</sup></>}
    </Dropdown.Toggle>
    <Dropdown.Menu variant="dark">    
     <Dropdown.Header id='mark-all-read'><span>Notifications</span> {arr.length !==0 ? <span title='Mark all as read' onClick={(e)=>{markAllRead(e)}}><i className="fa fa-check-circle" aria-hidden="true"></i></span> : <span title='Nothing to read'><i className="fa fa-check-circle-o" aria-hidden="true"></i></span>} </Dropdown.Header>           
     <div className='ht'>
        { arr.length !==0 ? (arr.length && arr.map((data,index)=> {
            return(  
            <Dropdown.Item key={data?._id} className='notification-item' id={data?._id} onClick={(event)=>{ markAsRead(event,data,index) }}>
              <span style={{whiteSpace:'pre-line'}}>{(data?.message)}</span> <span><i className="fa fa-circle" aria-hidden="true"></i></span></Dropdown.Item>
        )
      })):(<span style={{textAlign:'center'}}>No notifications found!</span>)}
     </div>
    </Dropdown.Menu>
  </Dropdown>
    )
}
