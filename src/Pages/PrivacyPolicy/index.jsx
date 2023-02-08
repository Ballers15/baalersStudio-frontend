import React from "react";
import './Privacy.css'

const Privacy = () => {
  return (
    <React.Fragment>
      <div className="privacy">
        <div className="topHead">
          <h1 className="heading text-center">Privacy Policy for <br></br> “Ballers Studio”</h1>
        </div>
        <div className="container pb-5">
          <h3>Introduction</h3>
          <p className="text-font">The privacy of our users is of utmost importance to us. This Privacy Policy outlines how we collect, use, store, and share personal information collected from users of our blockchain gaming project. By using our services, you acknowledge that you have read and understood the terms of this Privacy Policy.</p>
          <h3>Collection of Personal Information</h3>
          <p className="text-font">We may collect the following personal information from our users:</p>
          <ul className="mb-3">
            <li>Name</li>
            <li>Email address</li>
            {/* <li>IP address</li> */}
            <li>Game data and transactions</li>
            {/* <li>Payment information (if applicable)</li> */}
          </ul>

          <h3>Use of Personal Information</h3>
          <p className="text-font">The personal information collected from users may be used for the following purposes:</p>
          <ul className="mb-3">
            <li>To provide and improve our services.</li>
            <li>To communicate with users regarding their accounts and transactions.</li>
            <li>To prevent fraudulent activity and enforce our terms of service.</li>
            <li>To comply with legal and regulatory requirements.</li>
          </ul>
          <h3>Storage of Personal Information</h3>
          <p className="text-font">The personal information collected from users is stored on secure servers and is protected by appropriate technical and organizational measures. Access to personal information is limited to authorized personnel only.</p>
          <h3>Sharing of Personal Information</h3>
          <p className="text-font">We do not sell, rent, or share personal information with third parties for their own marketing purposes. However, we may share personal information with third-party service providers for the purpose of providing our services and for the other purposes outlined in this Privacy Policy.</p>
          <h3>Retention of Personal Information</h3>
          <p className="text-font">We retain personal information for as long as necessary to provide our services and fulfill the purposes outlined in this Privacy Policy.</p>
          <h3>Data Security</h3>
          <p className="text-font">We implement appropriate technical and organizational measures to protect the personal information we collect from unauthorized access, disclosure, alteration, or destruction.</p>
          {/* <h3>User Rights</h3>
                  <p className="text-font">Users have the right to access, correct, and delete their personal information at any point of time. Users may also request that we restrict the use of their personal information or object to our use of their personal information. Please contact us at <a href="mailto:social@ballers.fun"> [social@ballers.fun]</a> to exercise these rights.</p> */}
          <h3>Changes to Privacy Policy</h3>
          <p className="text-font">We reserve the right to update this Privacy Policy from time to time to reflect changes to our practices or for other operational, legal, or regulatory reasons.</p>
          <h3>Contact Us</h3>
          <p className="text-font">If you have any questions about this Privacy Policy, please contact us at <a href="mailto:social@ballers.fun"> [social@ballers.fun]</a>.</p>
          <p className="text-font">All rights reserved by Ballers Studio Inc. <a href="www.ballers.fun">www.ballers.fun</a> </p>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Privacy;