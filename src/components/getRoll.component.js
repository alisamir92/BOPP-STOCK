import { React, useState, useEffect, Component, Fragment} from 'react';
import  {Form ,Table, Button}  from 'react-bootstrap'
import axios from 'axios';


export default function GetRoll(){

  const [roll, setRoll] = useState([])
  const [rollNumber, setRollNumber ] = useState([])
  const [divColor, setDivColor] = useState("bg-warning")

  

   const handleRollChange = (e) => {
       setRollNumber(e.target.value)
    //    console.log(e.target.value)
   }
  
  const getRoll = () => {
 
    axios.get(`http://127.0.0.1:5000/rolls/${rollNumber}`)
    .then(res => {
      setRoll(res.data.data.roll)
      // console.log(res.data.data.roll)
      
    }).catch(()=>{
        setDivColor("bg-danger")
    })
  }

  const deleteRoll = () => {
    const result = window.confirm("Want to delete?");
    if (result) { //Logic to delete the item
        axios.delete(`http://127.0.0.1:5000/rolls/${rollNumber}`)
        setRoll(undefined)
    }
  }

  return(
    <div>
    <br/>
    <Form>
      <Form.Group>
      <Form.Label>Roll Number:</Form.Label>
      <Form.Control type="text" placeholder="Enter Roll Number" value={rollNumber} onChange={handleRollChange}/>
      <br/>
      <Button onClick={getRoll}>Search</Button>
      </Form.Group>
    </Form>
    <br />

    {
      roll === undefined || roll.length === 0 ?<div  className= {`text-center ${divColor}`} >Search for Right Roll</div>:
      
      <Table bordered hover>
        <thead>
          <tr>
          
            <th>CUSTOMER_NAME</th>
            <th>ORDER_NUMBER</th>
            <th>FILM_TYPE</th>
            {/* <th>DESCRIPTION</th> */}
            <th>WIDTH</th>
            <th>ROLL_NO</th>
            <th>NET_WT</th>
            <th>ACTUAL_LENGTH</th>
            <th>type</th>
            <th>MANUFACTURING_DATE</th>
            <th><button className="btn btn-dark" onClick = {deleteRoll}>Delete Roll</button></th>
            
          </tr>
        </thead>
        <tbody>
        {roll.map(roll => {
          
            return(
            
            <tr key={roll._id}>
              <td key={"CUSTOMER_NAME"}>{roll.CUSTOMER_NAME}</td>
              <td key={"ORDER_NUMBER"}>{roll.ORDER_NUMBER}</td>
              <td key={"FILM_TYPE"}>{roll.FILM_TYPE}</td>
              {/* <td key={roll.DESCRIPTION}>{roll.DESCRIPTION}</td> */}
              <td key={"WIDTH"}>{roll.WIDTH}</td>
              <td key={"ROLL_NO"}>{roll.ROLL_NO}</td>
              <td key={"NET_WT"}>{roll.NET_WT}</td>
              <td key={"ACTUAL_LENGTH"}>{roll.ACTUAL_LENGTH}</td>
              <td key={"type"}>{roll.type}</td>
              
              <td key={roll.MANUFACTURING_DATE}>{new Date(roll.MANUFACTURING_DATE).toDateString()}</td>
            
            </tr>
          )
          }
          
        )  
        } 
        </tbody>
      </Table>
     }
     
    </div> 
  )
}
