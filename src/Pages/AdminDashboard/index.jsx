import React, { useEffect, useState } from 'react'
import './AdminDashboard.css'
import { Col, Row, Button, Container, Form } from 'react-bootstrap';
import { Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { getBarChart, getPiechart, getPotClaim, getPotCounts, getUsersCount } from '../../Services/Admin';


const AdminDashboard = () => {
  const [loading, setLoading] = useState(false)
  const [toaster, showToaster] = useState(false)
  const [toasterMessage, setToasterMessage] = useState('')
  const [userCountData, setUserCountData] = useState([])
  const [potCountData, setPotCountData] = useState([])
  const [potClaimData, setPotClaimData] = useState([])
  const [pieChartData, setPieChartData] = useState([])
  const [barChartData, setBarChartData] = useState([])
  const [barChartDataReward, setBarChartDataReward] = useState([])
  const [barPotTypeUsers,setBarPotTypeUsers]=useState('LOTTERYPOT')
  const [barPotTypeCash,setBarPotTypeCash]=useState('LOTTERYPOT')

  useEffect(() => {
    usersCount();
    potCount();
    potClaim()
    pieCharts()
    barChart()
  }, [])

    useEffect(()=>{
      barChart()
    },[barPotTypeUsers])

      const usersCount =  async () =>{
        setLoading(true);
        try {
          const users =  await getUsersCount();
          setLoading(false);
          if (users.error) {
            setToasterMessage(users?.message||'Something Went Worng');
            // setShowToaster(true);
          } else {
             setUserCountData(users?.data)
          }
        } catch (error) {
            setToasterMessage(error?.response?.data?.message||'Something Went Worng');
            // setShowToaster(true);
            setLoading(false);
        }
      }

      const potCount =  async () =>{
        setLoading(true);
        try {
          const pot =  await getPotCounts();
          setLoading(false);
          if (pot.error) {
            setToasterMessage(pot?.message||'Something Went Worng');
            // setShowToaster(true);
          } else {
             setPotCountData(pot?.data)
          }
        } catch (error) {
            setToasterMessage(error?.response?.data?.message||'Something Went Worng');
            // setShowToaster(true);
            setLoading(false);
        }
      }

      const potClaim =  async () =>{
        setLoading(true);
        try {
          const pot =  await getPotClaim();
          setLoading(false);
          if (pot.error) {
            setToasterMessage(pot?.message||'Something Went Worng');
            // setShowToaster(true);
          } else {
             setPotClaimData(pot?.data)
          }
        } catch (error) {
            setToasterMessage(error?.response?.data?.message||'Something Went Worng');
            // setShowToaster(true);
            setLoading(false);
        }
      }

      const pieCharts =  async () =>{
        setLoading(true);
        try {
          const pie =  await getPiechart();
          setLoading(false);
          if (pie.error) {
            setToasterMessage(pie?.message||'Something Went Worng');
            // setShowToaster(true);
          } else {
             setPieChartData(pie?.data)
          }
        } catch (error) {
            setToasterMessage(error?.response?.data?.message||'Something Went Worng');
            // setShowToaster(true);
            setLoading(false);
        }
      }

      const barChart =  async () =>{
        let dataToSend={
          potType: barPotTypeUsers
        }
        setLoading(true);
        try {
          const bar =  await getBarChart(dataToSend);
          setLoading(false);
          if (bar.error) {
            setToasterMessage(bar?.message||'Something Went Worng');
            // setShowToaster(true);
          } else {
             setBarChartData(bar?.data)    
          }
        } catch (error) {
            setToasterMessage(error?.response?.data?.message||'Something Went Worng');
            // setShowToaster(true);
            setLoading(false);
        }
      }

  const dataUsers = {
    labels: ["REWARD POT", "LOTTERY POT"],
    datasets: [
      {
        label: '# of users',
        data: [pieChartData[0]?.userCount,pieChartData[1]?.userCount],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const optionsUsers = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white'
        }
      },
      title: {
        display: true,
        text: 'No. of Users',
        color: 'white',
        font: {
          size: 17, 
          weight: 400,
        }
      },
    },
  };

  const dataCash = {
    labels: ["REWARD POT", "LOTTERY POT"],
    datasets: [
      {
        label: 'Game Cash Burned',
        data: [pieChartData[0]?.gameCashBurned,pieChartData[1]?.gameCashBurned],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
        ],
        borderWidth: 1,
      },
    ],
  };
  

  const optionsCash = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white'
        }
      },
      title: {
        display: true,
        text: 'Game Cash Burned',
        color: 'white',
        font: {
          size: 17, 
          weight: 400,
        }
      },
    },
    
  };
 
  const barLabelUsers=barChartData?.map((el)=>{ return el?.potDetails?.startDate?.split('T')[0] })
  const barDatausers=barChartData?.map((el)=>{ return el?.users})

  const dataBar = {
    labels:barLabelUsers,
    datasets: 
          [
      {
        label: 'No. of Users',
        backgroundColor: 'rgb(255 159 64 / 68%)',
        borderColor: 'rgb(255, 159, 64)',
        borderWidth: 2,
        data: barDatausers,
      },
    ]
  };
  const optionsBarUsers = {
    title: {
      display: true,
      text: 'No. of users',
      fontSize: 20
    },
  
    plugins: {
      legend: {
        display: true,
        labels: {
          color: 'white',
          font: {
            size: 17, 
          }
        }
      }
    },
    scales: {
      y: {
        ticks: { color: '#fff', beginAtZero: true }
      },
      x: {
        ticks: { color: '#fff', beginAtZero: true }
      }
    }
  };

  const barDataCash=barChartData.map((el)=>{ return el?.gameCashBurned})
  const barLabelCash=barChartData?.map((el)=>{ return el?.potDetails?.startDate?.split('T')[0] })
  
  const dataBarCash = {
    labels:barLabelCash,
    datasets: 
          [
    
      {
        label: 'Game Cash Burned',
        fontColor: '#fff',
        backgroundColor: 'rgb(153 102 255 / 67%)',
        borderColor: 'rgb(153, 102, 255)',
        borderWidth: 2,
        data: barDataCash
      },
    ],
    options: { 
      legend: {
          labels: {
              color: "#000",
              fontSize: 18
          }
      },
  }
  };
  const optionsBarCash = {
    title: {
      display: true,
      text: 'Game Cash Burned',
      fontSize: 20, 
    },
    plugins: {
      legend: {
        labels: {
          color: 'white',
          font: {
            size: 17, 
          }
        }
      }
    },
    scales: {
      y: {
        ticks: { color: '#fff', beginAtZero: true }
      },
      x: {
        ticks: { color: '#fff', beginAtZero: true }
      }
    }
  };
  
  return (
    <React.Fragment>
      <div className="admin-dashboard">
        <Container>
          <Row className='justify-content-center'>
            <Col md={4}>
            <div className="card">
              <h4>Users</h4>
              <div className='dataFont'>
                <div>Total Sign up:<span>{'   '}{userCountData?.totalUserCount}</span></div>
                <div>Incomplete:<span>{'   '}{userCountData?.incompleteSignups}</span></div>
                <div>Unique wallet:<span>{'   '}{userCountData?.uniqueWalletAddress}</span></div>
              </div>
            </div>  
            </Col>
            <Col md={4}>
            <div className="card">
              <h4>Pots</h4>
              <div className='dataFont'>
                <div>Active:<span>{'   '}{potCountData?.activePots}</span></div>
                <div>Archive:<span>{'   '}{potCountData?.archivePots}</span></div>
                <div>Upcoming:<span>{'   '}{potCountData?.upcomingPots}</span></div>
              </div>
            </div>  
            </Col>
            <Col md={4}>
            <div className="card">
              <h4>Total Amount Claimed by NFT</h4>
              <div className='dataFont'>
              <div>Amount:<span>{'   '}{potClaimData?.rewardAmountClaimed}</span></div> 
                <div>NFT:<span>{'   '}{potClaimData?.nftClaimed}</span></div>
              </div>
            </div>  
            </Col>
          </Row>

          <Row>
            <Col md={6}>
            <div className="card pieCard">
              <Pie data={dataUsers} options={optionsUsers} />
              
            </div>
            </Col>
            <Col md={6}>
            <div className="card pieCard">
              <Pie data={dataCash} options={optionsCash} />
              
            </div>
            </Col>
            </Row>
            <Form.Select aria-label="Default select example" onChange={(e) => {setBarPotTypeUsers(e.target.value)}}>
                <option value='LOTTERYPOT' selected>Lottery Pot</option>
                <option value='REWARDPOT'>Reward Pot</option>
            </Form.Select>
            <Row>            
            <Col md={6}>
            <div className="card graphCard">

            <Bar data={dataBar} options={optionsBarUsers} />
            </div>
            </Col>
            <Col md={6}>
            <div className="card graphCard">
            <Bar data={dataBarCash}  options= {optionsBarCash} />
            </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default AdminDashboard
