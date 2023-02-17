import React, { useEffect, useState } from 'react'
import './AdminDashboard.css'

const AdminDashboard = () => {
  const [loading, setLoading] = useState(false)
  const [toaster, showToaster] = useState(false)
  const [toasterMessage, setToasterMessage] = useState('')

  return (
    <React.Fragment>
      <div className="admin-dashboard">Admin Dashboard page works!</div>
    </React.Fragment>
  )
}

export default AdminDashboard
