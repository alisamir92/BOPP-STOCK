import React from 'react';
import { BrowserRouter } from "react-router-dom";
import './App.css';
import Login from "./components/login.component"


class App extends React.Component {
  
  render(){
    return(
      <div className="container">
      <BrowserRouter>
        <Login />
      </BrowserRouter>
      </div>
    )
  }
  
}

export default App;
