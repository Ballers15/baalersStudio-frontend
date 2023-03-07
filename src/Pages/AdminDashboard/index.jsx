import React, { useEffect, useState } from 'react'
import './AdminDashboard.css'
import { Col, Row, Button, Container } from 'react-bootstrap';
// import { Pie } from 'react-chartjs-2';
const AdminDashboard = () => {
  const [loading, setLoading] = useState(false)
  const [toaster, showToaster] = useState(false)
  const [toasterMessage, setToasterMessage] = useState('')
  // const data = {
  //   labels: ['Red', 'Blue', 'Yellow'],
  //   datasets: [
  //     {
  //       label: '# of Votes',
  //       data: [12, 19, 3],
  //       backgroundColor: [
  //         'rgba(255, 99, 132, 0.2)',
  //         'rgba(54, 162, 235, 0.2)',
  //         'rgba(255, 206, 86, 0.2)',
  //       ],
  //       borderColor: [
  //         'rgba(255, 99, 132, 1)',
  //         'rgba(54, 162, 235, 1)',
  //         'rgba(255, 206, 86, 1)',
  //       ],
  //       borderWidth: 1,
  //     },
  //   ],
  // };
  
  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'top',
  //     },
  //     title: {
  //       display: true,
  //       text: 'Pie Chart',
  //     },
  //   },
  // };


  
  return (
    <React.Fragment>
      <div className="admin-dashboard">
        <Container>
          <Row>
            <Col md={3}>
            <div className="card">
              <h4>Users</h4>
              <div className='dataFont'>
                <div>Total Signal:1627</div>
                <div>Incomplete:87</div>
                <div>Unique wallet:45</div>
              </div>
            </div>  
            </Col>
            <Col md={3}>
            <div className="card">
              <h4>Pots</h4>
              <div className='dataFont'>
                <div>Active:464</div>
                <div>Archive:330</div>
                <div>Upcoming:45</div>
              </div>
            </div>  
            </Col>
            <Col md={3}>
            <div className="card">
              <h4>Total Amount Claimed by NFT</h4>
              <div className='dataFont'>
                <div>Amount:1627</div>
                <div>NFT:87</div> 
              </div>
            </div>  
            </Col>
          </Row>

          <Row>
            <Col md={6}>
            <div className="card">
              {/* <Pie data={data} options={options} /> */}
              
            </div>
            </Col>
            <Col md={6}>
            <div className="card">
            </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default AdminDashboard
