import React from "react";
import notFound from '../../Assest/img/notfound.png'
// eslint-disable-next-line no-unused-vars

const ErrorPage = () => {
  return (
    <div style={{display:"flex",height:"100vh",width:"100vw", justifyContent:"center",alignItems:"center", backgroundImage:`url(${notFound})`,backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'center'}}>
    </div>
  );
};

export default ErrorPage;
