import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css';
import { Form, Button, FormGroup, FormControl, ControlLabel,Nav,NavDropdown } from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar'
const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div>
            {/* <div className="header">
                    <h3 className="logo">City Riders</h3>
                <nav className="nav-link">
                   <li> <Link to="">Home</Link> </li>
                   <li><Link to="destination">Destinaton</Link></li>
                   <li> <Link to="">Blog</Link></li>
                   <li> <Link to="">Contact</Link></li>
                  {loggedInUser.name? <li>{loggedInUser.name}</li> : <Link><button>Login</button></Link>}
                </nav>
            </div> */}


<Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
  <Navbar.Brand href="#home">City Riders</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      
    </Nav>
    <Nav className="header">
     <Nav.Link><Link to=""><span>Home</span></Link></Nav.Link>
     <Nav.Link><Link to="destination"><span>Destination</span></Link></Nav.Link>
     <Nav.Link><Link to=""><span>Blog</span></Link></Nav.Link>
     <Nav.Link><Link to=""><span>Contact</span></Link></Nav.Link>
     {loggedInUser.name? <Nav.Link>{loggedInUser.name}</Nav.Link> : <Nav.Link><Link to="login"><button className="login-btn">Login</button></Link></Nav.Link>}
    </Nav>
  </Navbar.Collapse>
</Navbar>
            
        </div>
    );
};

export default Header;