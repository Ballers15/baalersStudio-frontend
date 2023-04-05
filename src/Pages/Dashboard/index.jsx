/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap"
import { Accordion } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import $ from 'jquery';
import Modal from 'react-bootstrap/Modal';
import '../../font/valorant/Valorant-Font.ttf'
import './Dashboard.css'
import fatMan from '../../Assest/img/fatMan.gif'
import SneefDog from '../../Assest/img/SneefDog.gif'
import ambassador from '../../Assest/img/ambassador.webp'
import ambassadorMob from '../../Assest/img/ambassadorMob.webp'
import AmbPlaceholder from '../../Assest/img/AmbPlaceholder.png'
import slide2 from '../../Assest/img/slide2.webp'
import slide3 from '../../Assest/img/slide3.webp'
import reward_card from '../../Assest/img/reward_card.webp'
import r1 from '../../Assest/img/r1.webp'
import coin from '../../Assest/img/coin.webp'
import coinPlaceholder from '../../Assest/img/coinPlaceholder.png'
import semiCoin from '../../Assest/img/semiCoin.webp'
import image27 from '../../Assest/img/image27.webp'
import image28 from '../../Assest/img/image28.webp'
import image29 from '../../Assest/img/image29.webp'
import ballerCoin from '../../Assest/img/ballerCoin.webp'
import ballerCoinMob from '../../Assest/img/ballerCoinMob.webp'
import star from '../../Assest/img/Star.svg'
import discord from '../../Assest/img/discord.svg'
import gamelogo from '../../Assest/img/gamelogo.png'
import gamecity from '../../Assest/img/gamecity.png'
import footerLogo from '../../Assest/img/footerLogo.png'
import teen from '../../Assest/img/teen.webp'
import arrowRight from '../../Assest/img/arrowRight.svg'
import arrowUp from '../../Assest/img/arrowUp.svg'
import arrowDown from '../../Assest/img/arrowDown.svg'
import ellipse from '../../Assest/img/ellipse.png'
import ellipse2 from '../../Assest/img/ellipse2.png'
import ellipse3 from '../../Assest/img/ellipse3.png'
import house from '../../Assest/img/house.png'
import house1 from '../../Assest/img/house1.webp'
import houseMob from '../../Assest/img/houseMob.png'
import houseMob1 from '../../Assest/img/houseMob1.webp'
import starL from '../../Assest/img/starL.svg'
import starM from '../../Assest/img/starM.svg'
import starS from '../../Assest/img/starS.svg'
import { subscribeMailJet } from '../../Services/User';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import ApiLoader from '../../Components/apiLoader'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { setLoadingFalse, setLoadingTrue } from "../../Components/Redux/actions";



window.addEventListener(
    "scroll",
    () => {
        document.body.style.setProperty(
            "--scroll",
            window.pageYOffset / (document.body.offsetHeight - window.innerHeight)
        );
    },
    false
);


 


document.onreadystatechange = function() {
    if (document.readyState !== "complete") {
        document.querySelector("body").style.visibility = "hidden";
        document.querySelector("#loader").style.visibility = "visible";
    } else {
        document.querySelector("#loader").style.display = "none";
        document.querySelector("body").style.visibility = "visible";
    }
};

// $(function () {
//     document.getElementById('hiddenButton').click();
// });

function useHover() {
    const [hovering, setHovering] = useState(false)
    const onHoverProps = {
        onMouseEnter: () => setHovering(true),
        onMouseLeave: () => setHovering(false),
    }
    return [hovering, onHoverProps]
}

const Dashboard = () => {

  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.loading.isLoading)

    useEffect(() => {
        $(window).scroll(function () {
            var scrollTop = $(this).scrollTop();
            var scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop();
            $('#scrollImg').css({
                opacity: function () {
                    var elementHeight = $(this).height();
                    let opacity = ((- (elementHeight - scrollBottom) / elementHeight));
                    // console.log('opacity', opacity)
                    if (opacity > 0.3) {
                        opacity = 1;
                    }
                    return opacity;
                }
            });
        });
    })

    const [buttonAIsHovering, buttonAHoverProps] = useHover()
    const [buttonAIsHovering2, buttonAHoverProps2] = useHover()
    const [playModalShow, setPlayModalShow] = useState(false);
    const [email, setEmail] = useState("");
    const [validated, setValidated] = useState(false);
    const [lotteryModalShow, setLotteryModalShow] = useState(false);
    const [rewardModalShow, setRewardModalShow] = useState(false);
    const [trailerModalShow, setTrailerModalShow] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(()=>{
        emailValidation()
      },[email])

    const handleShow = (modalName) => {
        if (modalName === 'play') {
            setEmail('');
            setValidated(false);
            setPlayModalShow(true);
        } else if (modalName === 'lottery') {
            setLotteryModalShow(true);
        }
        else if (modalName === 'reward') {
            setRewardModalShow(true);
        }
        else if (modalName === 'trailer') {
            setTrailerModalShow(true);
        }
    }

    const handleHide = (modalName) => {
        if (modalName === 'play') {
            setPlayModalShow(false);
        } else if (modalName === 'lottery') {
            setLotteryModalShow(false);
        }
        else if (modalName === 'reward') {
            setRewardModalShow(false);
        }
        else if (modalName === 'trailer') {
            setTrailerModalShow(false);
        }

    }

    const handleSubmit = async (e) => {
        // console.log(email,'-----------email value');
        setValidated(true);
        e.preventDefault();
        e.stopPropagation();
        e.preventDefault();


        if (email && !errorMsg) {
            let dataToSend = {
                email: email
            }
            // auth.login(dataToSend)
            dispatch(setLoadingTrue());
            try {
                const subscribe = await subscribeMailJet(dataToSend);
                dispatch(setLoadingFalse());
                if (subscribe.error) {
                    toast.error(subscribe?.error?.message || 'Something Went Worng');
                  } else {
                    toast.success(' THANK YOU FOR SUBSCRIBING!');
                    setPlayModalShow(false);
                    setErrorMsg(null);
                }
            } catch (error) {
                //   console.log(error)
                toast.error(error?.response?.data?.message || 'Something Went Worng');
                dispatch(setLoadingFalse());
            }
        } else {
            console.log('Form is invalid ------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
        }
         
      }

    $('#myModal').on('shown.bs.modal', function () {
        $('#video1')[0].play();
    })

    $('#myModal').on('hidden.bs.modal', function () {
        $('#video1')[0].pause();
    })

    const hiddenButtonClicked = () => {
        // console.log('hidden button clicked---------------------')
    }

    const emailValidation = () => {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,3})+$/;
        const tld=email?.split('.')[1]?.length;
        if (!email || regex.test(email) === false || tld<=1) {
            setErrorMsg('Enter a Valid Email !');
            return false;
        }
        setErrorMsg(null)
        return true;
    }

  

    return (
      <React.Fragment>
        <Button
          id="hiddenButton"
          onClick={hiddenButtonClicked}
          type="submit"
          hidden={true}
        ></Button>

        <Modal
          show={playModalShow}
          onHide={() => handleHide('play')}
          backdrop="static"
          keyboard={false}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>stay tuned</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Stay tuned for our Testnet competition to win $BALR token</h4>

            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              className="formFlex"
            >
              <Form.Group>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={({ target }) => {
                    setEmail(target.value)
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  <span> {email && 'Valid E-mail is required !'} </span>
                  <span> {!email && 'E-mail is required'} </span>
                </Form.Control.Feedback>
                <Form.Control.Feedback>
                  <span className="custom-error-msg">
                    {' '}
                    {errorMsg && 'Valid E-mail is required !'}
                  </span>
                </Form.Control.Feedback>
              </Form.Group>
              <div>
                <Button
                  className="subscribeBtn"
                  variant="primary"
                  onClick={handleSubmit}
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

        <Modal
          show={trailerModalShow}
          onHide={() => handleHide('trailer')}
          backdrop="static"
          keyboard={false}
          className="trailerStyle"
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <iframe
              width="750"
              height="415"
              src="https://www.youtube.com/embed/r8yd_aAKG7U?autoplay=1&mute=1"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="video"
            />
          </Modal.Body>
        </Modal>

        <Modal
          show={lotteryModalShow}
          onHide={() => handleHide('lottery')}
          backdrop="static"
          keyboard={false}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Lottery Pool</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Participate in the Daily lottery pools by depositing your in-game
              cash and you might win Baller's NFTs and other rewards.
            </p>
          </Modal.Body>
        </Modal>

        <Modal
          show={rewardModalShow}
          onHide={() => handleHide('reward')}
          backdrop="static"
          keyboard={false}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Reward Pool</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Greater rewards await for those who participate in the Reward
              Pool.
            </p>
            <p>
              Baller NFT Holders will get a chance to win $BALR tokens daily, be
              on top of the community leaderboard and be a real Baller!
            </p>
          </Modal.Body>
        </Modal>

        <div className="dashboard">
          <div className="homeBg">
            <div>
              <div className="row mainSlider">
                <div className="col-12">
                  <Carousel interval={null} wrap={false}>
                    <Carousel.Item>
                      <Carousel.Caption>
                         <LazyLoadImage src={ellipse}
                          className="bgShade"
                          alt="Eclipse"
                          width="1459"
                          height="1529"
                          />
                        <div className="container">
                          <p className="firstText">UNLOCK NEW CITIES</p>
                          <div className="row">
                            <div className="col-sm-5 my-auto">
                              <div className="sCaption">
                                <div>
                                  <p>
                                    Play | Party | <b>Earn</b>{' '}
                                  </p>
                                  <h1>BALLERS CITY </h1>
                                  <div className="fStar">
                                    <LazyLoadImage
                                      src={starS}
                                      className="starSmall small"
                                      width={47}
                                      height={47}
                                      alt="Star"
                                    />
                                  </div>
                                  <p className="textHeader ">
                                    A Web 3.0 hyper casual game that is your
                                    gateway to play, engage and socialize with
                                    your gang at exclusive parties.
                                  </p>
                                  <div className="subT">Early access to the Ballers City</div>
                                </div>
                                <div className="positionAbs">
                                  <div className="playBtn">
                                    <a onClick={() => handleShow('play')}>
                                      <span></span>Play now
                                    </a>
                                  </div>
                                  <div className="shareBtn">
                                    <a onClick={() => handleShow('trailer')}>
                                      <span></span>Watch Trailer
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-7 text-right mob-center">
                              <img
                                src={fatMan}
                                alt="Italian_Mafia_Boss"
                                width="558"
                                height="993" 
                              />
                            </div>
                          </div>
                          <p className="secondText">
                            Awaken the Baller <br></br> within you
                          </p>
                        </div>
                      </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                      <LazyLoadImage
                        className="d-block w-100 h-100"
                        src={slide2}
                        alt="Second slide"
                      />
                      <div className="stars slideStar">
                        <LazyLoadImage
                          src={starM}
                          className="starMed large"
                          width={60}
                          height={60}
                          alt="Star"
                        />
                        <LazyLoadImage
                          src={starS}
                          className="starSmall small"
                          width={47}
                          height={47}
                          alt="Star"
                        />
                      </div>
                      <div className="box"></div>
                      <Carousel.Caption>
                        <div className="container">
                          <p className="firstText">Play, Party and Earn</p>
                          <div className="sCaption secondSlide mb-0">
                            <div>
                              <p className="fw-bold">
                                $BALR powered Web3 engagement Venture
                              </p>
                              <h1>BALLERS </h1>
                              <p className="textHeader wth-4">
                                With Ballers Studio, you can experience high
                                quality games, engage with like minded
                                communities and win high value rewards, all
                                powered by the $BALR token.
                              </p>
                            </div>
                          </div>
                          <p className="secondText">
                            Announcing the <br></br> next project soon!
                          </p>
                        </div>
                      </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                      <LazyLoadImage
                        className="d-block w-100 h-100"
                        src={slide3}
                        alt="Second slide"
                      />
                      <div>
                        <div className="slideStar">
                          <svg
                            width="100"
                            height="100"
                            viewBox="0 0 100 100"
                            id="four"
                          >
                            <g className="group" opacity="0.8">
                              <g className="small">
                                <path
                                  id="small"
                                  d="M41.25,40 L42.5,25 L43.75,40 L45,41.25 L60,42.5 L45,43.75
                                                                        L43.75,45 L42.5,60 L41.25,45 L40,43.75 L25,42.5 L40,41.25z"
                                  fill="white"
                                />
                              </g>
                            </g>
                          </svg>

                          <svg
                            width="100"
                            height="100"
                            viewBox="0 0 100 100"
                            id="two"
                          >
                            <g className="group" opacity="0.8">
                              <g className="small">
                                <path
                                  id="small"
                                  d="M41.25,40 L42.5,25 L43.75,40 L45,41.25 L60,42.5 L45,43.75
                                                                        L43.75,45 L42.5,60 L41.25,45 L40,43.75 L25,42.5 L40,41.25z"
                                  fill="white"
                                />
                              </g>
                            </g>
                          </svg>
                          <svg
                            width="100"
                            height="100"
                            viewBox="0 0 100 100"
                            id="three"
                          >
                            <g className="group" opacity="0.8">
                              <g className="large">
                                <path
                                  id="large"
                                  d="M41.25,40 L42.5,10 L43.75,40 L45, 41.25 L75,42.5 L45,43.75
                                                                        L43.75,45 L42.5,75 L41.25,45 L40,43.75 L10,42.5 L40,41.25z "
                                  fill="#fad739"
                                />
                              </g>
                            </g>
                          </svg>

                          <svg
                            width="100"
                            height="100"
                            viewBox="0 0 100 100"
                            id="five"
                          >
                            <g className="group" opacity="0.8">
                              <g className="small">
                                <path
                                  id="small"
                                  d="M41.25,40 L42.5,25 L43.75,40 L45,41.25 L60,42.5 L45,43.75
                                                                        L43.75,45 L42.5,60 L41.25,45 L40,43.75 L25,42.5 L40,41.25z"
                                  fill="#fad739"
                                />
                              </g>
                            </g>
                          </svg>
                        </div>
                      </div>
                      <Carousel.Caption>
                        <div className="container w-100">
                          <p className="firstText">Win Exclusive Rewards</p>
                          <div className="text-center thirdSlide">
                            <div className="sCaption text-center">
                              <div>
                                <p>Play & Earn </p>
                                <h1>POOL </h1>
                                <p className="textHeader">
                                  Join the ultimate Play and Earn experience and
                                  win rewards with real-world value in Ballers
                                  City. Compete for a chance to win $BALR
                                  tokens, collectible NFTs, and tickets to
                                  exclusive physical parties around the world.
                                </p>
                                <p className="textHeader">
                                  <b>
                                    Start playing now and bring your rewards to
                                    life!
                                  </b>
                                </p>
                              </div>

                              <div className="thirdPageBtn">
                              <div className="d-md-flex align-items-center">
                                <div className="playBtn">
                                <Link to='/lottery'>Lottery Pool</Link>
                                </div>
                                <div className="shareBtn">
                                <Link to='/reward'> Reward Pool</Link>
                                </div>
                              </div>


                              </div>
                            </div>
                          </div>
                          <p className="secondText">
                            NFT<small>s</small> distributed <br></br> Daily
                          </p>
                        </div>
                      </Carousel.Caption>
                    </Carousel.Item>
                  </Carousel>
                </div>
              </div>
            </div>
          </div>

          <div className="reward">
            <div>
              <LazyLoadImage
                src={starL}
                id="one"
                width={61}
                height={60}
                className="large"
                alt="Star"
              />
              <LazyLoadImage
                src={starM}
                id="two"
                width={60}
                height={60}
                className="small"
                alt="Star"
              />
              <LazyLoadImage
                src={starS}
                id="three"
                width={47}
                height={47}
                className="large"
                alt="Star"
              />
            </div>
            <div className="container">
              <div className="row">
                <div className="col-sm-6">
                  <div className="">
                    <div className="rewardImage bg-static">
                      <div className="bg-move">
                        <LazyLoadImage
                          src={reward_card}
                          alt="reward"
                          width="117"
                          height="117"
                        />
                        <LazyLoadImage src={r1} alt="reward" width="182" height="182" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 my-auto px-0">
                  <div className="rewadText">
                    <div className="coinImage">
                      <LazyLoadImage
                        src={coin}
                        alt="coin image"
                        width="199"
                        height="199" 
                        effect="blur"
                      />
                    </div>
                    <div className="positionRelative mb-4 headWth">
                      <h2 className="heading">REWARD</h2>
                      <h2 className="heading2">REWARD</h2>
                    </div>

                    <div className="py-5">
                      <p className="text-font">
                        Join the ultimate Play, Party and Earn experience in
                        Ballers City - a web3 game that rewards you daily.
                        Compete for exclusive collectible cards, $BALR tokens,
                        and Party tickets in thrilling Reward pools, Lottery
                        Pots, and Quests. No matter your skill level or
                        collection size, there's always a chance to win big.
                        Start playing and get ready to party with the power of
                        $BALR token!
                      </p>

                      <p className="text-font">
                        {' '}
                        <b>
                          Get Ready to Play, Party and Earn in Ballers City
                        </b>{' '}
                      </p>
                    </div>
                    <div className="innerBtn">
                      <a href="/pool">
                        <span></span>View pool
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="backCoin">
              {' '}
              <LazyLoadImage src={semiCoin} alt="coin image" width="292" height="471" />
            </div>
          </div>
          <div className="">
            <div className="gradientBackgroung pb-8">
              <div className="container" id="partyGang">
                <div className="stars">
                  <LazyLoadImage
                    src={starM}
                    className="starMed large"
                    width={60}
                    height={60}
                    alt="Star"
                  />
                  <LazyLoadImage
                    src={starS}
                    className="starSmall small"
                    width={47}
                    height={47}
                    alt="Star"
                  />
                </div>
                <div className="scene section" id="sticky">
                  <div className="positionRelative mt-5 headWth mx-auto">
                    <h2 className="heading text-center">
                      Party with your Gang
                    </h2>
                    <h2 className="heading2 text-center">
                      Party with your Gang
                    </h2>
                  </div>
                  <div className="row positionRelative">
                    <div className="col-sm-7 my-auto">
                      <div className="mob-content">
                        <div className="mb-5">
                          <h4>
                            <b>Work hard, play hard, and party even harder.</b>{' '}
                          </h4>
                          <p className="text-font"> </p>
                          <p className="text-font">
                            Assemble your gang and join the Baller's community
                            where you can party like never before with Crypto
                            OGs, gamers and other like minded people across the
                            globe and awaken the true BALLER within you!
                          </p>
                          <p className="text-font">
                            We are hosting exclusive private parties, E sports
                            competitions and Cosplay events, so that every
                            Baller can have night worth remembering
                          </p>
                          <p className="text-font">
                            Loveland party <b> coming soon!</b>{' '}
                          </p>
                        </div>
                        <div className="innerBtn">
                          <a
                            href="https://t.me/+HRPPZlNztto0NGI1"
                            target="blank"
                            rel="noopener noreferrer"
                            className="px-6"
                            aria-label="discord"
                          >
                            <span></span>Join{' '}
                            <i className="fa fa-paper-plane" aria-hidden="true"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-5">
                      <div className="dancingImg">
                        <img
                          src={SneefDog}
                          alt="Snoopdog"
                          width="413"
                          height="734"
                        />
                      </div>
                      <div className="partyHard">PARTY HARD</div>
                    </div>
                  </div>
                </div>
              </div>
              <LazyLoadImage
                src={ellipse2}
                className="bgShade2"
                width="1003"
                height="1788"
                alt="Eclipse"
              />

              <div className="container">
                <div className="news news--news_page row">
                  <div className="news-list col-sm-6">
                    <div className="news-list-wrap">
                      <div className="news-list-column system">
                        <a className="news-item star pink">
                          <img
                            className="news-item-bg"
                            src={image27}
                            alt="NFT Avatar"
                            width={245}
                            height={358} 
                          />
                        </a>
                        <a className="news-item star black">
                          <img
                            className="news-item-bg"
                            src={image28}
                            alt="NFT Avatar"
                            width={245}
                            height={358}
                          />
                        </a>
                        <a className="news-item star white">
                          <img
                            className="news-item-bg"
                            src={image29}
                            alt="NFT Avatar"
                            width={245}
                            height={358}
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 order-sm-2">
                    <div>
                      <LazyLoadImage src={arrowUp} alt="Arrow" className="arrowUp" />
                      <div className="nftCollectionHead mt-5 headWth mx-auto">
                        <h2 className="heading">NFT COLLECTION</h2>
                        <h2 className="heading2">NFT COLLECTION</h2>
                      </div>
                    </div>
                  </div>
                  <div className="news-caption-wrap col-sm-6 order-sm-1">
                    <div className="stars">
                      <LazyLoadImage
                        src={starM}
                        className="starMed large"
                        width={60}
                        height={60}
                        alt="Star"
                      />
                    </div>
                    <div className="news-caption">
                      <div className="">
                        <div className="mb-5">
                          <p className="text-font">
                            Unlock the vibrant world of Ballers City with our
                            limited-edition NFT characters. Choose from 17
                            unique and rare NFTs, each representing a different
                            district with its own distinct personality and
                            story.
                          </p>
                          <p className="text-font">
                            With only 588 copies of each character, this is your
                            chance to get exclusive access to the city that
                            never sleeps. Claim your Ballers NFT now and join
                            the clan before it's too late
                          </p>
                          <div className="row">
                            <div className="col-6 col-xl-4">
                              <div className="countHead">
                                {' '}
                                Total Unique NFTs
                              </div>
                              <div className="num">17</div>
                            </div>
                            <div className="col-6 col-xl-5">
                              <div className="countHead">
                                Total Number of NFTs
                              </div>
                              <div className="num">10,000</div>
                            </div>
                          </div>
                        </div>
                        <div className="innerBtn" {...buttonAHoverProps2}>
                          <a className="btnWith">
                            <span></span>{' '}
                            {buttonAIsHovering2 ? 'coming soon' : "View NFT's"}{' '}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rotateDiv secPaddingY">
                <div className="marquee">
                  <div className="marquee-item" data-dir="right">
                    <div className="marquee-row">
                      BALR TOKEN{' '}
                      <img src={star} width={79} height={80} alt="star" /> BALR
                      TOKEN <img src={star} width={79} height={80} alt="star" />{' '}
                      BALR TOKEN{' '}
                      <img src={star} width={79} height={80} alt="star" /> BALR
                      TOKEN <img src={star} width={79} height={80} alt="star" />{' '}
                      BALR TOKEN{' '}
                      <img src={star} width={79} height={80} alt="star" /> BALR
                      TOKEN <img src={star} width={79} height={80} alt="star" />{' '}
                      BALR TOKEN{' '}
                      <img src={star} width={79} height={80} alt="star" /> BALR
                      TOKEN <img src={star} width={79} height={80} alt="star" />{' '}
                      BALR TOKEN{' '}
                      <img src={star} width={79} height={80} alt="star" /> BALR
                      TOKEN <img src={star} width={79} height={80} alt="star" />{' '}
                      BALR TOKEN{' '}
                      <img src={star} width={79} height={80} alt="star" />{' '}
                    </div>
                    <div className="marquee-row">
                      BALR TOKEN{' '}
                      <img src={star} width={79} height={80} alt="star" /> BALR
                      TOKEN <img src={star} width={79} height={80} alt="star" />{' '}
                      BALR TOKEN{' '}
                      <img src={star} width={79} height={80} alt="star" /> BALR
                      TOKEN <img src={star} width={79} height={80} alt="star" />{' '}
                      BALR TOKEN{' '}
                      <img src={star} width={79} height={80} alt="star" /> BALR
                      TOKEN <img src={star} width={79} height={80} alt="star" />{' '}
                      BALR TOKEN{' '}
                      <img src={star} width={79} height={80} alt="star" /> BALR
                      TOKEN <img src={star} width={79} height={80} alt="star" />{' '}
                      BALR TOKEN{' '}
                      <img src={star} width={79} height={80} alt="star" /> BALR
                      TOKEN <img src={star} width={79} height={80} alt="star" />{' '}
                      BALR TOKEN{' '}
                      <img src={star} width={79} height={80} alt="star" />{' '}
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="container positionRelative ballerSec"
                id="balrToken"
              >
                <div className="positionRelative text-right mx-4">
                  <h2 className="heading">BALR TOKEN</h2>
                  <h2 className="balrHead">BALR TOKEN</h2>
                </div>
                <LazyLoadImage src={arrowDown} alt="Arrow" className="arrowDown"/>
                <div className="row">
                  <div className="col-sm-6 my-auto">
                    <div className="">
                      <div className="pb-4">
                        <p className="text-font">
                          <b>$BALR</b> unlocks your ability to earn and win
                          exclusive rewards based on your In-game engagement.
                        </p>
                        <p className="text-font">
                          Experience the complete vibe of our next-gen Web3.0
                          games through the power of $BALR
                        </p>
                      </div>

                      <div className="innerBtn" {...buttonAHoverProps}>
                        <a className="purchaseWith">
                          <span></span>{' '}
                          {buttonAIsHovering ? 'coming soon' : 'PURCHASE NOW'}{' '}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="ballercoin text-right">
                    <picture aria-hidden="true">
                      <source media="(min-width: 900px)" srcSet={ballerCoin} />
                      <source media="(max-width: 500px)" srcSet={ballerCoinMob} />
                      <img src={ballerCoin} width="382" height="382" alt="Baller Coin"/>
                    </picture>
                      
                    </div>
                  </div>
                </div>
                <LazyLoadImage
                  src={ellipse2}
                  className="bgShadeBalr"
                  alt="Eclipse"
                  width="673"
                  height="1198"
                />

                <div>
                  <LazyLoadImage
                    src={starL}
                    id="one"
                    width={61}
                    height={60}
                    className="large"
                    alt="Star"
                  />
                  <LazyLoadImage
                    src={starM}
                    id="two"
                    width={60}
                    height={60}
                    className="small"
                    alt="Star"
                  />
                  <LazyLoadImage
                    src={starS}
                    id="three"
                    width={47}
                    height={47}
                    className="large"
                    alt="Star"
                  />
                </div>
              </div>
            </div>

            <div className="container-fluid bgColor joinCard">
              <div className="container positionRelative p-0">
                <div className="joinCard">
                  <picture aria-hidden="true">
                    <source media="(min-width: 900px)" srcSet={ambassador} />
                    <source media="(max-width: 500px)" srcSet={ambassadorMob} />
                    <LazyLoadImage src={ambassador} width="1500" height="571" className="image"  alt="Ballers AMBASSADOR program"/>
                  </picture>
                  <div className="contentJoin">
                    <div className="row justify-content-center">
                      <div className="col-sm-12 text-center my-auto">
                        <p className="joinUs">
                          BECOME <br></br> Ballers AMBASSADOR{' '}
                        </p>
                        <p className="joinText">
                          {' '}
                          to win $BALR tokens, In-game cash, NFT’s & many more..
                        </p>
                        <a
                          href="https://docs.google.com/forms/d/e/1FAIpQLSevvqZ__LcppAzh1pIuQZb4CXLv53-5HBDPzkxxwQ-3GXGLKQ/viewform"
                          target="blank"
                          rel="noopener noreferrer"
                          className="getStart"
                        >
                          GET STARTED{' '}
                          <LazyLoadImage
                            src={arrowRight}
                            width={16}
                            height={17}
                            alt="arrow"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="gradientBackgroung secPaddingY">
              <div className="container paddingY-5 mt-5 positionRelative">
                <LazyLoadImage
                  src={ellipse3}
                  className="bgShade3"
                  width="612"
                  height="988"
                  alt="Eclipse"
                />
                <div className="row">
                  <div className="col-lg-5 my-auto">
                    <div className="positionRelative mb-5">
                      <h2 className="heading text-left">FAQ</h2>
                      <h2 className="faqHead text-left">FAQ</h2>
                      <p>
                        Blend your style and experience on a global, competitive
                        stage.
                      </p>
                    </div>
                    <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>
                          When will the $BALR token launch?
                        </Accordion.Header>
                        <Accordion.Body>
                          <p>The baller token TGE will occur in Q1, 2023</p>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="1">
                        <Accordion.Header>
                          Where can I get $BALR token{' '}
                        </Accordion.Header>
                        <Accordion.Body>
                          <p>
                            $BALR token, once launched will be available for
                            purchase on all major exchanges
                          </p>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="2">
                        <Accordion.Header>
                          When will the studio launch its next project?{' '}
                        </Accordion.Header>
                        <Accordion.Body>
                          <p>
                            Ballers Studio will soon launch a line of engaging
                            and fun games with a high-end graphics shooter
                            launch to be announced soon.
                          </p>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="3">
                        <Accordion.Header>
                          When will the Ballers NFT whitelist begin?
                        </Accordion.Header>
                        <Accordion.Body>
                          <p>
                            The NFT whitelist will begin soon, you can follow
                            our social channels to stay updated.
                          </p>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                  <div className="col-lg-7 my-auto">
                    <div className="nice-header">
                    <picture aria-hidden="true">
                      <source media="(min-width: 900px)" srcSet={house} />
                      <source media="(max-width: 500px)" srcSet={houseMob} />
                      <img src={house} width="851" height="700" className="img-fluid" alt="before" />
                    </picture>

                      <div className="header-overlay" id="scrollImg">
                      <picture aria-hidden="true">
                        <source media="(min-width: 900px)" srcSet={house1} />
                        <source media="(max-width: 500px)" srcSet={houseMob1} />
                        <img src={house1} width="851" height="700" className="img-fluid" alt="after" />
                      </picture>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container mt-4 footerIcon">
                <div className="row align-items-center">
                  <div className="col-2 col-sm-3">
                    <picture aria-hidden="true">
                      <source media="(min-width: 900px)" srcSet={footerLogo} />
                      <source media="(max-width: 500px)" srcSet={gamelogo} />
                      <LazyLoadImage src={footerLogo}  alt="logo"
                      className="mob-wth img-fluid imgHeight"
                      width={200}
                      height={128} />
                    </picture>
                   
                  </div>
                  <div className="col-4 col-sm-3">
                    <div className="d-flex align-items-center">
                      <LazyLoadImage
                        src={teen}
                        alt="logo"
                        width="65"
                        height="97"
                        className="mob-wth-px img-fluid"
                      />
                      <ul>
                        <li>Blood </li>
                        <li>Language</li>
                        <li>Violence</li>
                        <li>Users Interact </li>
                        <li>In-Game Purchases</li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-3 col-sm-3">
                    <LazyLoadImage
                      src={gamecity}
                      alt="logo"
                      width="351"
                      height="167"
                      className="ipadWth img-fluid"
                    />
                  </div>
                  <div className="col-3 col-sm-3">
                    <ul className="policy">
                      <li>
                        <a href="/privacy" aria-label="privacy">
                          Privacy notice
                        </a>
                      </li>
                      <li>Terms of service</li>
                      <li>Cookie preference</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
              {/* <ToastContainer theme="colored"/> */}
              {isLoading ? <ApiLoader /> : null} 
      </div>
      </React.Fragment>
    )
}

export default Dashboard;