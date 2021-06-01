import logo from './logo.svg';
import './App.css';
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Destination from './components/Destination/Destination';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();
export const VehicleContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [selectVehicle,setSelectVehicle] = useState();
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser,selectVehicle, setSelectVehicle]}>
        <Router>
          <Header></Header>
          <Switch>

            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>

            <PrivateRoute path="/destination">
              <Destination></Destination>
            </PrivateRoute>
          </Switch>
        </Router>
      </UserContext.Provider>
  );
}

export default App;
