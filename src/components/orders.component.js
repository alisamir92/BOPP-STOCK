import { React, useState, useEffect, Component, Fragment} from 'react';
import Select, { components } from 'react-select';
import Table from 'react-bootstrap/Table'
import axios from 'axios';

export default function GetOrder(){
  const [orders, setOrders] = useState([])
  const [order, setOrder] = useState([])
  const orderNumbers = []
  
  const getAllOrders = () => {
    axios.get('http://127.0.0.1:5000/orders')
    .then(res => {
      res.data.data.orders.forEach(order => orderNumbers.push({label: `${order._id}`, value: `${order._id}`}))
      setOrders(orderNumbers)
      
      
    })
    .catch((error) => {
      console.log(error);
    })
  }
  
  const getOrder = (e) => {
    axios.get(`http://127.0.0.1:5000/orders/${e.value}`)
    .then(res => {
      setOrder(res.data.data.order)
    })
    
    .catch((error) => {
      
      console.log(error);
    })
   
  }
  
  useEffect(() =>{
    getAllOrders()
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
          placeholder={'Search For Order...'}
          options={orders}
          onChange={getOrder}
        />
      
      </Fragment>
      <br/>
      
      {order === undefined || order.length ===0 ?<div variant="warning" className="text-center bg-warning ">Search for Order</div>:
      <Table bordered hover>
          <thead>
            <tr>
              
              <th>CUSTOMER_NAME</th>
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
          {order.map(roll => {
            return(
              
              <tr key={roll._id}>
                <td key={roll.CUSTOMER_NAME}>{roll.CUSTOMER_NAME}</td>
                <td key={roll.FILM_TYPE}>{roll.FILM_TYPE}</td>
                <td key={roll.DESCRIPTION}>{roll.DESCRIPTION}</td>
                <td key={roll.WIDTH}>{roll.WIDTH}</td>
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
