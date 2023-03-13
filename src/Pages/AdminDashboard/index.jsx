import React, { useEffect, useState } from 'react'
import './AdminDashboard.css'
import { Col, Row, Button, Container } from 'react-bootstrap';
import { Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
const AdminDashboard = () => {
  const [loading, setLoading] = useState(false)
  const [toaster, showToaster] = useState(false)
  const [toasterMessage, setToasterMessage] = useState('')
  const data = {
    labels: ['Red', 'Blue'],
    datasets: [
      {
        label: '# of Votes',
        data: [19, 19],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',  
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)', 
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Pie Chart',
      },
    },
  };

  const dataBar = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };
  const optionsBar = {
    title: {
      display: true,
      text: 'Sales by Month',
      fontSize: 20
    },
    legend: {
      display: false
    }
  };
  
  return (
    <React.Fragment>
      <div className="admin-dashboard">
        <Container>
          <Row className='justify-content-center'>
            <Col md={3}>
            <div className="card">
              <h4>Users</h4>
              <div className='dataFont'>
                <div>Total Sign up:1627</div>
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
            <Col md={5}>
            <div className="card pieCard">
              <Pie data={data} options={options} />
              
            </div>
            </Col>
            <Col md={7}>
            <div className="card graphCard">
            <Bar data={dataBar} options={optionsBar} />
            </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default AdminDashboard
