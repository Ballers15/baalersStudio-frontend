import React from "react";
import notFound from '../../Assest/img/notfound.png'
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars

const ErrorPage = () => {

  const user = useSelector(state => state.user.user);
  const _u = JSON.parse(user)
  const role = _u?.user?.role
  const navigate = useNavigate();

  useEffect(()=>{
    if(role === 'ADMIN')
      navigate('/admin-dashboard')
    else
      navigate('/')
  })


  return (
    <div style={{display:"flex",height:"100vh",width:"100vw", justifyContent:"center",alignItems:"center", backgroundImage:`url(${notFound})`,backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'center'}}>
    </div>
  );
};

export default ErrorPage;
