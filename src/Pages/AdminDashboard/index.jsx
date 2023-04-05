import React, { useEffect, useState } from 'react'
import './AdminDashboard.css'
import { Col, Row, Container, Form } from 'react-bootstrap';
import { Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { getBarChart, getPiechart, getPotClaim, getPotCounts, getUsersCount } from '../../Services/Admin';
import ApiLoader from '../../Components/apiLoader'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../Components/Redux/actions";

const AdminDashboard = () => {
  const [userCountData, setUserCountData] = useState([])
  const [potCountData, setPotCountData] = useState([])
  const [potClaimData, setPotClaimData] = useState([])
  const [pieChartData, setPieChartData] = useState([])
  const [barChartData, setBarChartData] = useState([])
  const [barPotTypeUsers,setBarPotTypeUsers]=useState('LOTTERYPOT')
  const isLoading = useSelector(state => state.loading.isLoading)
  const dispatch = useDispatch()


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
        dispatch(setLoadingTrue());
        try {
          const users =  await getUsersCount();
          dispatch(setLoadingFalse());
          if (users.error) {
            toast.error(users?.message||'Something Went Worng');
          } else {
             setUserCountData(users?.data)
          }
        } catch (error) {
            toast.error(error?.response?.data?.message||'Something Went Worng');
            dispatch(setLoadingFalse());
        }
      }

      const potCount =  async () =>{
        dispatch(setLoadingTrue());
        try {
          const pot =  await getPotCounts();
          dispatch(setLoadingFalse());
          if (pot.error) {
            toast.error(pot?.message||'Something Went Worng');
          } else {
             setPotCountData(pot?.data)
          }
        } catch (error) {
            toast.error(error?.response?.data?.message||'Something Went Worng');
            dispatch(setLoadingFalse());
        }
      }

      const potClaim =  async () =>{
        dispatch(setLoadingTrue());
        try {
          const pot =  await getPotClaim();
          dispatch(setLoadingFalse());
          if (pot.error) {
            toast.error(pot?.message||'Something Went Worng');
          } else {
             setPotClaimData(pot?.data)
          }
        } catch (error) {
            toast.error(error?.response?.data?.message||'Something Went Worng');
            dispatch(setLoadingFalse());
        }
      }

      const pieCharts =  async () =>{
        dispatch(setLoadingTrue());
        try {
          const pie =  await getPiechart();
          dispatch(setLoadingFalse());
          if (pie.error) {
            toast.error(pie?.message||'Something Went Worng');
          } else {
             setPieChartData(pie?.data)
          }
        } catch (error) {
            toast.error(error?.response?.data?.message||'Something Went Worng');
            dispatch(setLoadingFalse());
        }
      }

      const barChart =  async () =>{
        let dataToSend={
          potType: barPotTypeUsers
        }
        dispatch(setLoadingTrue());
        try {
          const bar =  await getBarChart(dataToSend);
          dispatch(setLoadingFalse());
          if (bar.error) {
            toast.error(bar?.message||'Something Went Worng');
          } else {
             setBarChartData(bar?.data)    
          }
        } catch (error) {
            toast.error(error?.response?.data?.message||'Something Went Worng');
            dispatch(setLoadingFalse());
        }
      }

      const formatNumberDecimal = (value) => {
        if(value > Math.pow(10,10)){
        const shortenedValue = parseFloat(value).toExponential(4);
        return shortenedValue;
        }
        else
        return value;
      };

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
        data: [(pieChartData[0]?.gameCashBurned?.$numberDecimal),pieChartData[1]?.gameCashBurned?.$numberDecimal],
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

  const barDataCash=barChartData.map((el)=>{ return el?.gameCashBurned?.$numberDecimal})
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
                <option value='LOTTERYPOT'>Lottery Pot</option>
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
        <ToastContainer theme="colored"/>
        {isLoading ? <ApiLoader /> : null} 
      </div>
    </React.Fragment>
  )
}

export default AdminDashboard
