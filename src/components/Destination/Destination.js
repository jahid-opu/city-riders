import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import data from '../../fakeData/data.json';
import './Destination.css';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import GoogleMap from '../GoogleMap/GoogleMap';
import { Card } from 'react-bootstrap';


const Destination = () => {
    const [, , selectVehicle, setSelectVehicle] = useContext(UserContext);
    const [vehicle, setVehicle] = useState(data);

    const [search, setSearch] = useState(true);
    const [destination, setDestination] = useState({
        pickFrom: "",
        pickTo: "",
        date: ""
    })

    const handleSubmit = () => {
        setSearch(false);
    }
    const handleBlur = (e) => {
        console.log(e.target.value);
        const newDestination = { ...destination };
        newDestination[e.target.name] = e.target.value;
        setDestination(newDestination);
    }
    let imgURL;
    let price;
    return (
        <div className="row">
            <div className="col-md-4">
                {search && <form className="pick-form" onSubmit={handleSubmit}>
                    <label htmlFor="pickFrom">Pick From</label> <br />
                    <input className="form-control" onBlur={handleBlur} type="text" name="pickFrom" id="" required /> <br />
                    <label htmlFor="pickTo">Pick To</label> <br />
                    <input className="form-control" onBlur={handleBlur} type="text" name="pickTo" id="" required /> <br />
                    <input onBlur={handleBlur} className="form-control" placeholder="Select Date" type="date" id="date" name="date" required /><br />
                    <input className="form-control btn btn-primary" type="submit" value="Search" />
                </form>}
                {
                    vehicle.map(vehicle => {
                        if (vehicle.name === selectVehicle) {
                            imgURL = vehicle.imgURL;
                            price = vehicle.price;
                        }
                    })
                }
                {!search &&
                        <div className="card">
                           <Card.Header><h5>{destination.pickFrom}</h5> 
                            <h5>{destination.pickTo}</h5></Card.Header>
                            <div className="cardText">
                            <img src={imgURL} alt="" />
                            <h5>{selectVehicle}</h5>
                            <h5>${price}</h5>
                            </div>
                        </div>

                }
                {/* {!search && <img src={imgURL} alt="" />} */}
            </div>

            <div className="col-md-8 map">
                <GoogleMap></GoogleMap>
            </div>

        </div>
    );
};


export default Destination;