import { useEffect, useState,  } from 'react';
import  {Form, Row, Col, Button}  from 'react-bootstrap';
import Select from 'react-select';
import axios from 'axios';


// Function to return FormGroup to put it in the Form
function FormGroup(props) {
    
    return(
        <Col xs={6}>
        <Form.Group>
                    <Form.Label>{props.label}:</Form.Label>
                    <Form.Control required type={props.type} placeholder= {props.placeholder} onChange={props.onChange}/>
        </Form.Group>
        <br/>
        </Col>
    )
}


export default function AddRoll(){
    
  const [customers, setCustomers] = useState([]);
  const [customerName, setCustomerName] = useState("")
  const [form, setForm] = useState({});
  const [validated, setValidated] = useState(false);
  const customersNames = []

  let rollAddObj = {} // object to send by axios

  // To put customers names in select
  const getAllCustomers = () => {
    axios.get('http://127.0.0.1:5000/customers')
    .then(res => {
        res.data.data.customers.forEach(customer => customersNames.push({label: `${customer._id}`, value: `${customer._id}`}))
        setCustomers(customersNames.sort((a, b) => a.value.localeCompare(b.value)))
      //   console.log(res.data.data.customers)
    })
    .catch((error) => {
      console.log(error);
    })
  }

  // to set each field in form state
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    })
  }
  
  // handle customers select change
  const handleCustomerChange = (e) => {
    setCustomerName(e.value)
  }
      
  
  // handle adding submission
  const handleAdding = (event) => {
    
    rollAddObj = {
      "CUSTOMER_NAME" : customerName,
      ...form

    }

    setValidated(true);

  // Send add roll request
  axios.post('http://127.0.0.1:5000/rolls', rollAddObj)
  .then(function (res) {
    window.alert("Roll Added successfully")
    
  })
  .catch(function (err) {
    console.log(err.response);
  });
  
  
  }
  

  useEffect(() =>{
    getAllCustomers()
  }, [])
    
    
  return(
      <Form validated={validated} onSubmit={handleAdding}>
        <br/>
        <Row>
        <Col xs={6}>
        <Form.Group>
        <Form.Label>CUSTOMER_NAME:</Form.Label>
        <Select
          className="basic-single"
          classNamePrefix="select"
          isSearchable
          options={customers}
          placeholder={'Enter CUSTOMER_NAME'}
          onChange={handleCustomerChange}
          required
        />
        </Form.Group>
        </Col>
        
        <FormGroup type={"number"} label={"ORDER_NUMBER"} placeholder={"e.g. 52212548"} onChange = {(e) => setField("ORDER_NUMBER", e.target.value)}/>
        <FormGroup type={"string"} label={"FILM_TYPE"} placeholder={"THL-20"} onChange = {(e) => setField("FILM_TYPE", e.target.value)}/>
        <FormGroup type={"string"} label={"DESCRIPTION"} placeholder={"e.g. Any Description"} onChange = {(e) => setField("DESCRIPTION", e.target.value)}/>
        <FormGroup type={"number"} label={"WIDTH"} placeholder={"Width from 200 to 2000 mm"} onChange = {(e) => setField("WIDTH", e.target.value)}/>
        <FormGroup type={"string"} label={"ROLL_NO"} placeholder={"e.g. H121BH0001"} onChange = {(e) => setField("ROLL_NO", e.target.value)}/>
        <FormGroup type={"number"} label={"NET_WT"} placeholder={"e.g. 500 kg"} onChange = {(e) => setField("NET_WT", e.target.value)}/>
        <FormGroup type={"number"} label={"ACTUAL_LENGTH"} placeholder={"e.g. 16000 m"} onChange = {(e) => setField("ACTUAL_LENGTH", e.target.value)}/>
        <FormGroup type={"string"} label={"type"} placeholder={"BARE or MET"} onChange = {(e) => setField("type", e.target.value)}/>
        <FormGroup type={"date"} label={"MANUFACTURING_DATE"} placeholder={"e.g. mm/dd/yyyy"} onChange = {(e) => setField("MANUFACTURING_DATE", new Date(e.target.value).toISOString())}/>
        <FormGroup type={"string"} label={"Month"} placeholder={"e.g. June"} onChange = {(e) => setField("Month", e.target.value)}/>
        <FormGroup type={"number"} label={"Year"} placeholder={"e.g. 2021"} onChange = {(e) => setField("Year", e.target.value)}/>
        <FormGroup type={"date"} label={"Schedule_Ship_Date"} placeholder={"e.g. mm/dd/yyyy"} onChange = {(e) => setField("Schedule_Ship_Date", new Date(e.target.value).toISOString())}/>
          
        </Row>     
                
        <Button type="submit" >Add</Button>
      </Form>
  )

}
