/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Carousel } from "react-bootstrap"
import $ from 'jquery'
import './Dashboard.css'
import Italian_Mafia_Boss from '../../Assest/img/Italian_Mafia_Boss.png' 
import reward_card from '../../Assest/img/reward_card.png'
import r1 from '../../Assest/img/r1.png'
import coin from '../../Assest/img/coin.png'
import SneefDog from '../../Assest/img/SneefDog.png'
import image27 from '../../Assest/img/image27.png'
import image28 from '../../Assest/img/image28.png'
import image29 from '../../Assest/img/image29.png'
import ballerCoin from '../../Assest/img/ballerCoin.png'
import star from '../../Assest/img/Star.svg'


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
  
  let sliderItem = $(".slider").children(".item.active");
  sliderItem.prev(".item").css({
    "left":-200,
  });
  
  sliderItem.next(".item").css({
    "right":-200,
  });
  let i = $(".slider").children(".item");
  let ind=0;
  $(".slider").children('.item').each(function(){
    $(this).attr('data-index',ind++);
    
  })
  i.on('wheel',function(e){
    const that = $(this);
    let dataIndex = that.data('index');
    $(".item").removeClass('active');
    that.addClass('active');
    i.each(function(){
      if($(this).data('index')===dataIndex){
        $(this).addClass('active');
        $(this).css({
          "left":0,
          "right":0,
          "z-index":3,
        });
        if(dataIndex==="1"){
          $(".item[data-index=2]").css({
            "left":0,
            "right":-200,
            "z-index":1,
          })
          $(".item[data-index=0]").css({
            "left":-200,
            "right":0,
            "z-index":1,
          })
        }else if(dataIndex==="0"){
          $(".item[data-index=2]").css({
            "left":-200,
            "right":0,
            "z-index":1,
          })
          $(".item[data-index=1]").css({
            "left":0,
            "right":-200,
            "z-index":1,
          })
        }else if(dataIndex==="2"){
          $(".item[data-index=1]").css({
            "left":-200,
            "right":0,
            "z-index":1,
          })
          $(".item[data-index=0]").css({
            "left":0,
            "right":-200,
            "z-index":1,
          })
        }
      }
    })
  })
  
  

const Dashboard = () => {
    return (
        <React.Fragment>
            <div className="dashboard"> 
                <div className="homeBg">
                    <div className="row">
                        <div className="col-12">
                            <Carousel interval={null}>
                                <Carousel.Item>
                                    {/* <img
                                    className="d-block w-100"
                                    src="https://picsum.photos/500/300?img=1"
                                    alt="First slide"
                                    /> */}
                                    <Carousel.Caption>
                                        <div className="row">
                                            <div className="col-sm-5 my-auto">
                                                <div className="sCaption">
                                                    <div>
                                                        <p className="fw-bold">A WEB 3.0 CLICKER GAME</p>
                                                        <h1>BALLERS CITY </h1>
                                                        <p className="textHeader mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tempus, turpis massa arcu blandit justo enim. Mauris dis libero leo in amet proin sagittis fringilla.</p>
                                                        <h5>WHY DON’T YOU TRY IT NOW ?</h5>
                                                    </div>
                                                <div className="playBtn">
                                                        <a href="#"><span></span>Play now</a>
                                                </div>
                                                    
                                                    
                                                </div>
                                            </div>
                                            <div className="col-sm-7 text-right">
                                                <img src={Italian_Mafia_Boss} alt="Italian_Mafia_Boss" /> 
                                            </div>
                                        </div>
                                
                                
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    {/* <img
                                    className="d-block w-100"
                                    src="https://picsum.photos/500/300?img=2"
                                    alt="Second slide"
                                    /> */}
                                    <Carousel.Caption>
                                    <h3>Second slide label</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    {/* <img
                                    className="d-block w-100"
                                    src="https://picsum.photos/500/300?img=3"
                                    alt="Third slide"
                                    /> */}
                                    <Carousel.Caption>
                                    <h3>Third slide label</h3>
                                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                                    </Carousel.Caption>
                                    </Carousel.Item>
                            </Carousel>
                        </div>
                    </div>
                </div>
                <div className="reward">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="">
                                <div className="rewardImage bg-static">
                                    <div className="bg-move">
                                    <img src={reward_card} alt="Italian_Mafia_Boss" />
                                    <img src={r1} alt="Italian_Mafia_Boss" />                    
                                    </div>
                                </div>
                                </div>                      
                            </div>
                            <div className="col-sm-6">                           
                                <div className="rewadText">
                                    <div className="coinImage">
                                    <img src={coin} alt="coin image" />
                                    </div>
                                    <div className="positionRelative">
                                        <h2 className="heading">Reward</h2>
                                        <h2 className="heading2">Reward</h2>
                                    </div>
                                
                                    <p className="text-font">Blend your style and experience on a global, competitive stage. You have 13 rounds to attack and defend your side using sharp gunplay and tactical abilities.  
                                    </p>
                                    <p className="text-font">                                
                                    And, with one life per-round, you'll need to think faster than your opponent if you want to survive.
                                    </p>
                                    <div className="innerBtn">
                                        <a href="#"><span></span>View pool</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="backCoin"> <img src={coin} alt="coin image" /></div>
                </div>
                <div className="gradientBackgroung secPaddingY">
                    <div className="container">
                        <div className="positionRelative">
                            <h2 className="heading text-center">Crash the Party</h2>
                            <h2 className="heading2 text-center">Crash the Party</h2>
                        </div>
                        <div className="row">
                            <div className="col-sm-6 my-auto">                            
                                <div className="">                           
                                    <p className="text-font">
                                    Blend your style and experience on a global, competitive stage. You have 13 rounds to attack and defend your side using sharp gunplay and tactical abilities. And, with one life per-round, you'll need to think faster than your opponent if you want to survive. Take on foes across Competitive and Unranked modes as well as Deathmatch and Spike Rush.   
                                    </p>
                                    <p className="text-font">                         
                                    Blend your style and experience on a global, competitive stage. You have 13 rounds to attack and defend your side using sharp gunplay and tactical abilities. And, with one life per-round, you'll need to think faster than your opponent if you want to survive. Take on foes across Competitive and Unranked modes as well as Deathmatch and Spike Rush.
                                    </p>
                                    <div className="innerBtn">
                                        <a href="#"><span></span>Join</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                 <div className="dancingImg">
                                    <img src={SneefDog} alt="Italian_Mafia_Boss" />         
                                </div>                           
                            </div>                        
                        </div>
                    </div>
                    <div className="container">                        
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="slider">
                                    <div className="item">
                                        <img src={image27} alt="cardImage" />
                                    </div>
                                    <div className="item active">
                                        <img src={image28} alt="cardImage" />
                                    </div>
                                    <div className="item">
                                     <img src={image29} alt="cardImage" />
                                    </div>
                                </div>                         
                            </div> 
                            <div className="col-sm-6 my-auto">                            
                                <div className="">                           
                                    <p className="text-font">
                                    Blend your style and experience on a global, competitive stage. You have 13 rounds to attack and defend your side using sharp gunplay and tactical abilities. 
                                     </p>
                                    <p className="text-font">                               
                                        And, with one life per-round, you'll need to think faster than your opponent if you want to survive.
                                    </p>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div>Artwork</div>
                                            <h5 className="num">25.1k</h5>
                                        </div>
                                        <div className="col-sm-3">
                                            <div>Artist</div>
                                            <h5 className="num">15.6k</h5>
                                        </div>
                                        <div className="col-sm-3">
                                            <div>Aucition</div>
                                            <h5 className="num">10.2k</h5>
                                        </div>
                                    </div>
                                    <div className="innerBtn">
                                        <a href="#"><span></span>View NFT's</a>
                                    </div>
                                </div>
                            </div>
                                                 
                        </div>
                        <div className="positionRelative">
                            <h2 className="heading">NFT COLLECTION</h2>
                            <h2 className="heading2">NFT COLLECTION</h2>
                        </div>
                    </div>  
                    <div className="rotateDiv secPaddingY">
                        <div className="marquee">
                            <div className="marquee-item" data-dir='left'>
                            <div className="marquee-row">BALR TOKEN <img src={star} alt="star"/> BALR TOKEN  <img src={star} alt="star"/> BALR TOKEN  <img src={star} alt="star"/> BALR TOKEN  <img src={star} alt="star"/> BALR TOKEN  <img src={star} alt="star"/> BALR TOKEN  <img src={star} alt="star"/> BALR TOKEN  <img src={star} alt="star"/> </div>
                            <div className="marquee-row">BALR TOKEN <img src={star} alt="star"/> BALR TOKEN  <img src={star} alt="star"/> BALR TOKEN  <img src={star} alt="star"/> BALR TOKEN  <img src={star} alt="star"/> BALR TOKEN  <img src={star} alt="star"/> BALR TOKEN  <img src={star} alt="star"/> BALR TOKEN  <img src={star} alt="star"/> </div>  
                            </div>                           

                        </div>
                    </div>
                    <div className="container positionRelative">                        
                        <div className="row">
                            <div className="col-sm-6 my-auto">                            
                                <div className="">                           
                                    <p className="text-font">
                                    Blend your style and experience on a global, competitive stage. You have 13 rounds to attack and defend your side using sharp gunplay and tactical abilities. 
                                    </p>
                                    <p className="text-font">And, with one life per-round, you'll need to think faster than your opponent if you want to survive.</p>
                                    
                                    <div className="innerBtn">
                                        <a href="#"><span></span>PURCHASE NOW</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="positionRelative">
                                    <h2 className="heading text-center">BALR TOKEN</h2>
                                    <h2 className="heading2 text-center">BALR TOKEN</h2>
                                </div>
                                {/* <div className='light'></div> */}
                                 <div className="ballercoin text-center">
                                    <img src={ballerCoin} alt="Italian_Mafia_Boss" />         
                                </div>                           
                            </div>                        
                        </div>
                    </div>
                     
                </div>
               
            </div>
             
             
             
        </React.Fragment>
    )
}

export default Dashboard;