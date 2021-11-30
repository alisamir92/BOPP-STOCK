import { React, useState, useEffect, Component, Fragment} from 'react';
import Select, { components } from 'react-select';
import Table from 'react-bootstrap/Table'
import axios from 'axios';

export default function GetOrder(){
  const [customers, setCustomers] = useState([])
  const [customer, setCustomer] = useState([])
  const customersNumbers = []
  
  const getAllCustomers = () => {
    axios.get('http://127.0.0.1:5000/customers')
    .then(res => {
      res.data.data.customers.forEach(customer => customersNumbers.push({label: `${customer._id}`, value: `${customer._id}`}))
      setCustomers(customersNumbers)
      
      
    })
    .catch((error) => {
      console.log(error);
    })
  }
  
  const getCustomer = (e) => {
    axios.get(`http://127.0.0.1:5000/customers/${e.value}`)
    .then(res => {
      setCustomer(res.data.data.customer.sort((a, b) => a.ORDER_NUMBER - b.ORDER_NUMBER))
    //   console.log(res.data.data.customer)
    })
    
    .catch((err) => {
      console.log(err);
    })
   
  }

  useEffect(() =>{
    getAllCustomers()
  }, [])
  

  const Placeholder = props => {
    return <components.Placeholder {...props} />;
  };

  return(
    <div>
      <Fragment>
        <Select
          className="basic-single"
          classNamePrefix="select"
          isSearchable
          components={{ Placeholder }}
          placeholder={'Search For Customer...'}
          options={customers}
          onChange={getCustomer}
        />
      
      </Fragment>
<br/>
      
  {customer === undefined || customer.length ===0 ?<div variant="warning" className="text-center bg-warning ">Search for Customer</div>:
  <Table bordered hover>
      <thead>
        <tr>
          
          <th>ORDER_NUMBER</th>
          <th>FILM_TYPE</th>
          <th>DESCRIPTION</th>
          <th>WIDTH</th>
          <th>ROLL_NO</th>
          <th>NET_WT</th>
          <th>ACTUAL_LENGTH</th>
          <th>type</th>
          <th>MANUFACTURING_DATE</th>
          
        </tr>
      </thead>
      <tbody>
        {customer.map(roll => {
          return(
            
            <tr key={roll._id}>
              <td key={roll.ORDER_NUMBER}>{roll.ORDER_NUMBER}</td>
              <td key={roll.FILM_TYPE}>{roll.FILM_TYPE}</td>
              <td key={roll.DESCRIPTION}>{roll.DESCRIPTION}</td>
              <td key={roll.WIDTH} >{roll.WIDTH}</td>
              <td key={roll.ROLL_NO}>{roll.ROLL_NO}</td>
              <td key={roll.NET_WT}>{roll.NET_WT}</td>
              <td key={roll.ACTUAL_LENGTH}>{roll.ACTUAL_LENGTH}</td>
              <td key={roll.type}>{roll.type}</td>
              
              <td key={roll.MANUFACTURING_DATE}>{new Date(roll.MANUFACTURING_DATE).toDateString()}</td>
            
            </tr>
          )
        }  
        )}
      </tbody>
  </Table>
      
  }
    </div> 
  )
}
