import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setLoadingFalse, setLoadingTrue, setUserData } from '../../Components/Redux/actions';
import { toast } from 'react-toastify';

export default function GoogleSignup() {
    const dispatch = useDispatch();
    const params= useParams();
    const navigate = useNavigate();
    const {token} = params;

    useEffect(() => {
      getSocialResponse()
    }, [])


    const getSocialResponse = () => {
       
      dispatch(setLoadingTrue());
        try {
          let logedInData = JSON.parse(atob(token));
          console.log(logedInData)
           dispatch(setLoadingFalse());
             if(logedInData.error){
                toast.dismiss();
                toast.error(logedInData?.message || "Something went wrong in google login")
                navigate('/login')
              }
                else {
                    let userRes = {
                      user: logedInData?.data?.user,
                      token: logedInData?.data?.token 
                    }
                    dispatch(setUserData(JSON.stringify(userRes)))
                    navigate('/')
                    toast.dismiss()    
                    toast.success('Login Succesfully !!');
                }
            }
        
           catch (error) {
              dispatch(setLoadingFalse());
              toast.dismiss();
              toast.error(error.message || "Error found in google login")
              navigate('/login')
            }
    }

    return(
      <></>
    )

  }
