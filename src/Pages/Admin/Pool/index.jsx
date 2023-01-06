import React from "react";
import './Pool.css';
import { useNavigate } from 'react-router-dom'


const PoolListing = () => {
    const navigate = useNavigate()


    const AddRewardPot = () => {
        navigate('/addPot')
    }

    return (
        <React.Fragment>
            <div className="pool-listing">
                Pool llistng Page works !!
                <button style={{float:'right'}} onClick={AddRewardPot}>Add Reward Pot</button>
            </div>
        </React.Fragment>
    )
}

export default PoolListing;