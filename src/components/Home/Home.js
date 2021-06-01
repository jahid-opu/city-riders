import Cards from '../Cards/Cards';
import data from '../../fakeData/data.json';
import React, { useState } from 'react';
import './Home.css';
import background from '../image/bg1.jpg'


const Home = () => {
    const [vehicle,setVehicle] = useState(data);
    return (
        <div style={{ backgroundImage: `url(${background})` }} className="card-container">
            {
                vehicle.map(vehicle => <Cards vehicle={vehicle}></Cards>)
            }
        </div>
    );
};

export default Home;