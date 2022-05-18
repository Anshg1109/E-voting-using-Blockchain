import 'regenerator-runtime/runtime'
import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";
import { login, logout } from './utils'
import './global.css'
import "bootstrap/dist/css/bootstrap.min.css";
import {Container, Navbar, Nav, NavDropdown} from "react-bootstrap";
import './css/bootstrap.min.css'
import './css/style.css'
import './fonts/icomoon/style.css'
//Components
import Home from "./Components/Home";
import NewPoll from "./Components/NewPoll";
import PollingStation from "./Components/PollingStation";

//images
import ChainVoteLogo from "./assets/_Logo3.png";

import getConfig from './config'
const { networkId } = getConfig(process.env.NODE_ENV || 'development')


export default function App() {
 
// this function is important in passing in all the information  
// like passing the names into the pollingstation.js  so that we can
// use those to query the blokchain to get the urls to copy the images to retreive the vote counts to add votes to their respective names
// here prompt are themselves the keys 
  const changeCandidatesFunction = async (prompt) => {
    console.log(prompt);
    let namePair = await window.contract.getCandidatePair({ prompt: prompt });
    localStorage.setItem("Candidate1", namePair[0]);
    localStorage.setItem("Candidate2", namePair[1]);
    localStorage.setItem("prompt", prompt);
    window.location.replace(window.location.href + "PollingStation");
  };

  return (
    

    <BrowserRouter>
    
    <Navbar collapseOnSelect expand="lg" style={{backgroundColor: "rgb(32 44 61)",}} variant="dark">
      <Container>
        <Navbar.Brand href="/"style={{padding: '0px'}}>
          <img style={{height:'55px'}} src={ChainVoteLogo}></img>
          ChainVote
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto">
            
          </Nav>
          <Nav>
              <Nav.Link href='/NewPoll'>New Poll</Nav.Link>
              <Nav.Link onClick={window.accountId === "" ? login : logout}>
                {window.accountId === "" ? "Login" : window.accountId}
              </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>


    <Routes>
      <Route exact path="/" element={<Home changeCandidates={changeCandidatesFunction}/>} />      
      <Route exact path="/PollingStation" element={<PollingStation/>} /> 
      <Route exact path="/NewPoll" element={ <NewPoll/>} />      
    </Routes>



    <footer className="footer-20192">
      <div className="site-section">
        <div className="container">

          <div className="cta d-block d-md-flex align-items-center px-5">
            <div>
              <h2 className="mb-0">Vote For Your Favourite Candidate!!</h2>
              <h3 className="text-dark">Let's get started!</h3>
            </div>
            <div className="ml-auto">
              <a href="/NewPoll" className="btn btn-dark rounded-0 py-3 px-5">New Poll</a>
            </div>
          </div>
          <div className="row">

            <div className="col-sm">
              <a href="#" className="footer-logo">ChainVote</a>
              <p className="copyright">
                <small>&copy; 2022</small>
              </p>
            </div>
            <div className="col-sm">
              <h3>Customers</h3>
              <ul className="list-unstyled links">
                <li><a href="#">Buyer</a></li>
                <li><a href="#">Supplier</a></li>
              </ul>
            </div>
            <div className="col-sm">
              <h3>Company</h3>
              <ul className="list-unstyled links">
                <li><a href="#">About us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Contact us</a></li>
              </ul>
            </div>
            <div className="col-sm">
              <h3>Further Information</h3>
              <ul className="list-unstyled links">
                <li><a href="#">Terms &amp; Conditions</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
            <div className="col-md-3">
              <h3>Follow us</h3>
              <ul className="list-unstyled social">
                <li><a href="#"><span className="icon-facebook"></span></a></li>
                <li><a href="#"><span className="icon-twitter"></span></a></li>
                <li><a href="#"><span className="icon-linkedin"></span></a></li>
                <li><a href="#"><span className="icon-medium"></span></a></li>
                <li><a href="#"><span className="icon-paper-plane"></span></a></li>
              </ul>
            </div>
            
          </div>
        </div>
      </div>
    </footer>

    </BrowserRouter>
    
  );
}
