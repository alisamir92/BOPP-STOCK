import {React, useState, useEffect} from 'react';
import axios from "axios";
import { Form, Button } from 'react-bootstrap'
import {withRouter, useHistory, Route } from "react-router-dom";
import Dashboard from "./dashboard.component";
import UnAuth from "./unauth.component";


export default withRouter(function Login(props) {
  
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [ status, setStatus] = useState()
  const [validated, setValidated] = useState(false);
  
  const history = useHistory(); 

  
  
  const handleUsernameChange = (e) => {
      setUsername(e.target.value)
   }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
   }

  const handleLogin = async (e) => {
    e.preventDefault();
  

    setValidated(true);

    
    const data ={
      username: username,
      password: password,
    }
    
    // use axios to send requests
    axios({
      method: "POST",
      data: data,
      
      url: "http://127.0.0.1:5000/users/login",
      
    }).then((res) => {
      
      localStorage.setItem('status', true)  // Set status in localStorage
      setStatus(true)
      if(res.data){   // check for session 
        
        history.push("/dashboard"); // Push router to dashboard
        
      }else{
        history.push("/") // push to login page
      }
     
      }
    ).catch((err) => {
      const errMsg = new Error("wrong username or password").message
      history.push("/unauth")
      console.log(errMsg)
      
      
    });
  }

    // Get status from localStorage to status state
    useEffect(() => {
      const loggedInStatus = localStorage.getItem("status");
      if (loggedInStatus) {
        const foundStatus = JSON.stringify(loggedInStatus);
        setStatus(foundStatus);  
      }
    }, []);

    
    // This logic to prevent direct access to the dashboard without login
    if(status){
      return <Dashboard />
      
    }
    
    return(
      
      <Form validated={validated} onSubmit={handleLogin} >
      <br/>
      <Form.Group md="4" >
        <Form.Label>Username</Form.Label>
        <Form.Control
          required
          type="text"
          onChange={handleUsernameChange}
        />
        
      </Form.Group>
      <br/>
      <Form.Group md="4" >
        <Form.Label>Password</Form.Label>
        <Form.Control
          required
          type="password"
          onChange={handlePasswordChange}
        />
        
      </Form.Group>

    <br/>
    
    <Button type="submit">Login</Button>
    <Route path="/unauth" component={UnAuth} />
    {/* <Route path="/dashboard" component={Dashboard} /> */}
  </Form>
      
    )
  
    }
)