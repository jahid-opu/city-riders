import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { UserContext } from '../../App';
import data from '../../fakeData/data.json';
import './Cards.css'

const Cards = (props) => {
    const {name, imgURL} = props.vehicle;
    const history = useHistory();
    const [, ,selectVehicle,setSelectVehicle] = useContext(UserContext);
    console.log(name);
    const handleClick = () => {
        setSelectVehicle(name);
        history.push("destination")
    }
    return (
        <div onClick={handleClick} className="cards">
            <h3 style={{marginBottom:"20px"}}>{name}</h3>
            <img src={imgURL} alt="" />
            

        </div>
    );
};

export default Cards;