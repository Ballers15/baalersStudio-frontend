import React from "react";
import './poolpots.css' 
import star from '../../Assest/img/Star.svg' 

   
const LeaderBoardRibbon = () => {

    
return(
    <div className="rotateDiv secPaddingY">
    <div className="marquee">
      <div className="marquee-item" data-dir="right">
        <div className="marquee-row">
        LEADERBOARD{' '}
          <img src={star} width={79} height={80} alt="star" /> LEADERBOARD<img src={star} width={79} height={80} alt="star" />{' '}
          LEADERBOARD{' '}
          <img src={star} width={79} height={80} alt="star" /> LEADERBOARD<img src={star} width={79} height={80} alt="star" />{' '}
          LEADERBOARD{' '}
          <img src={star} width={79} height={80} alt="star" /> LEADERBOARD <img src={star} width={79} height={80} alt="star" />{' '}
          LEADERBOARD{' '}
          <img src={star} width={79} height={80} alt="star" /> LEADERBOARD <img src={star} width={79} height={80} alt="star" />{' '}
          LEADERBOARD{' '}
          <img src={star} width={79} height={80} alt="star" /> LEADERBOARD <img src={star} width={79} height={80} alt="star" />{' '}
          LEADERBOARD{' '}
          <img src={star} width={79} height={80} alt="star" />{' '}
        </div>
        <div className="marquee-row">
        LEADERBOARD{' '}
          <img src={star} width={79} height={80} alt="star" /> LEADERBOARD<img src={star} width={79} height={80} alt="star" />{' '}
          LEADERBOARD{' '}
          <img src={star} width={79} height={80} alt="star" /> LEADERBOARD <img src={star} width={79} height={80} alt="star" />{' '}
          LEADERBOARD{' '}
          <img src={star} width={79} height={80} alt="star" /> LEADERBOARD<img src={star} width={79} height={80} alt="star" />{' '}
          LEADERBOARD{' '}
          <img src={star} width={79} height={80} alt="star" /> LEADERBOARD <img src={star} width={79} height={80} alt="star" />{' '}
          LEADERBOARD{' '}
          <img src={star} width={79} height={80} alt="star" /> LEADERBOARD<img src={star} width={79} height={80} alt="star" />{' '}
          LEADERBOARD{' '}
          <img src={star} width={79} height={80} alt="star" />{' '}
        </div>
      </div>
    </div>
  </div>
    )
    
}

export default LeaderBoardRibbon;