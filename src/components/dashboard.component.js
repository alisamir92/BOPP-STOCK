import { useHistory, Route } from "react-router-dom";
import {React} from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import axios from "axios";
import Login from "./login.component";
import orders from "./orders.component";
import customers from "./customers.component";
import getRoll from "./getRoll.component";
import addRoll from "./addRoll.component";


export default function Dashboard(props) {
    
    const history = useHistory();
    
    const logout = () => {
        axios({
            method: "GET",
            url: "http://127.0.0.1:5000/users/logout",
          }).then((res) => {

             localStorage.clear();
              history.push("/")

          }).catch((err)=>{
              console.log("not logged out")
          })
        }
    
    // If user is found in localStorage return dashboard
    if(localStorage.getItem("status")){
        
    return(
        <div className="container">
            <br/>
            <div className="row">
                <h3 className="col">Dashborad</h3>
                <button className="btn btn-outline-success my-2 my-sm-0 col-lg-1 col-4 "  onClick={logout}>Logout</button>
            </div>
            <br/>

            <Navbar bg="light" expand="lg">
  
                <Navbar.Toggle  />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="mr-auto my-2 my-lg-0">
                    <Nav.Link href="/orders">Get Order</Nav.Link>
                    <Nav.Link href="/customers">Get Customer</Nav.Link>
                    <NavDropdown title="Roll" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/getroll">Get Roll</NavDropdown.Item>
                        <NavDropdown.Item href="/addroll">Add Roll</NavDropdown.Item>
                        
                    </NavDropdown>
                    
                    </Nav>
                    
                </Navbar.Collapse>
            </Navbar>
            <Route path="/orders" component={orders} />
            <Route path="/customers" component={customers} />
            <Route path="/getroll" component={getRoll} />
            <Route path="/addroll" component={addRoll} />
        </div>
    )

    }else{
        return <Login />
    }
}