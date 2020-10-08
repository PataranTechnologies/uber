import React, { Component, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Col } from 'react-bootstrap';
import { useFormik } from "formik";
import * as yup from "yup";
import "./AddMerchantFragment.css";
import axios from "axios";
import placesAutoComplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { GoogleComponent } from "react-google-location";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import CancelIcon from '@material-ui/icons/Cancel';

const AddMerchantFragment = (props) => {
  const [state, setState] = useState({
    restaurant_name: '',
    email: '',
    designation: 'Owner',
    address: '',
    city: '',
    state: 'Select State',
    pincode: '',
    contact_person_name: '',
    mobile: '',
    information: '',
    restaurant_image: [],
    menu_image: [],
    lunch_time_open: '08:30 am',
    lunch_time_close: '01:00 pm',
    dinner_time_open: '00:00 pm',
    dinner_time_close: '01:00 pm',
    view_type: 0,
    latitude: "",
    longitude: "",
    redirect: false,
    website_link: ""

  })


  const [predictions, setPrediction] = useState([])
  const [address, setAddress] = useState(null);

  const validationSchema = yup.object().shape({
    restaurant_name: yup
      .string()
      .required("A name is required")
      .min(2, "Name must be at least 2 characters")
      .max(100, 'Too Long!'),
    email: yup
      .string()
      .email("Invalid Email")
      .required("Email is a required field"),
    designation: yup
      .string()
      .required("Please select Your desigination"),
    address: yup
      .string()
      .required("Please Enter your Address")
      .min(3),
    latitude: yup
      .string()
      .required("Please Enter your latitude"),
    longitude: yup
      .string()
      .required("Please Enter your longitude"),
    contact_person_name: yup
      .string()
      .required("Please Contact person Name")
      .min(2, "Too Short")
      .max(100, "To0 Long"),
    city: yup
      .string()
      .required("Please Enter your City Name")
      .min(2, "Invalid city Name")
      .max(50),
    state: yup
      .string()
      .required("Please Select State"),
    pincode: yup
      .string()
      .required("Please Enter the Pincode"),
    mobile: yup
      .string()
      .required("Please Provide Your Phone No")
      .min(9)
      .max(11)
    ,
    information: yup.string().required("Please Enter Information.")

  });

  const [stateList, setStateList] = useState({
    AZ: 'Arizona',
    AL: 'Alabama',
    AK: 'Alaska',
    AR: 'Arkansas',
    CA: 'California',
    CO: 'Colorado',
    CT: 'Connecticut',
    DE: 'Delaware',
    FL: 'Florida',
    GA: 'Georgia',
    HI: 'Hawaii',
    ID: 'Idaho',
    IL: 'Illinois',
    IN: 'Indiana',
    IA: 'Iowa',
    KS: 'Kansas',
    KY: 'Kentucky',
    LA: 'Louisiana',
    ME: 'Maine',
    MD: 'Maryland',
    MA: 'Massachusetts',
    MI: 'Michigan',
    MN: 'Minnesota',
    MO: 'Missouri',
    MT: 'Montana',
    NE: 'Nebraska',
    NV: 'Nevada',
    NH: 'New Hampshire',
    NJ: 'New Jersey',
    NM: 'New Mexico',
    NY: 'New York',
    NC: 'North Carolina',
    ND: 'North Dakota',
    OH: 'Ohio',
    OK: 'Oklahoma',
    OR: 'Oregon',
    PA: 'Pennsylvania',
    RI: 'Rhode Island',
    SC: 'South Carolina',
    SD: 'South Dakota',
    TN: 'Tennessee',
    TX: 'Texas',
    UT: 'Utah',
    VT: 'Vermont',
    VA: 'Virginia',
    WA: 'Washington',
    WV: 'West Virginia',
    WI: 'Wisconsin',
    WY: 'Wyoming'
  })



  const formik = useFormik({
    initialValues: {
      restaurant_name: '',
      email: '',
      designation: 'Owner',
      address: '',
      city: '',
      state: 'Select State',
      pincode: '',
      contact_person_name: '',
      mobile: '',
      information: '',
      restaurant_image: [],
      menu_image: [],
      lunch_time_open: '00:00 ',
      lunch_time_close: '00:00 ',
      dinner_time_open: '00:00 ',
      dinner_time_close: '01:00 ',
      view_type: 0,
      latitude: "",
      longitude: "",
      redirect: false,
  
    },
    validationSchema: validationSchema,
    onSubmit: postData,
  });









  const removeImage = index => {
    let restaurant_image = state.restaurant_image
    restaurant_image.splice(index, 1)
    setState({
      ...state,
      restaurant_image,

    });
  };
  const deleteImage = index => {
    let menu_image = state.menu_image
    menu_image.splice(index, 1)
    setState({
      ...state,
      menu_image,

    });
  };

  const dataChange = (ev) => {
    setState({
      ...state,
      [ev.target.name]: ev.target.value
    })
    console.log(ev.target.value);

   // console.log(state);


  }






  const postData = (ev) => {
    ev.preventDefault();



    alert("hello");
console.log(state)
/*
     let restaurant_name = state.restaurant_name
     let email = state.email
     let address = state.address
     let state = state.state
     let designation = state.designation
     let mobile = state.mobile
     let city = state.city
     let pincode = state.pincode
     let information = state.information
     let contact_person_name = state.contact_person_name
     let restaurant_image = state.restaurant_image
     let menu_image = state.menu_image
     let lunch_time_open = state.lunch_time_open
     let lunch_time_close = state.lunch_time_close
     let dinner_time_open = state.dinner_time_open
     let dinner_time_close = state.dinner_time_close
     let longitude = state.longitude
     let latitude = state.latitude
     var fodata = {
       restaurant_name,
       email,
       address,
       state,
       designation,
       mobile,
       city,
       pincode,
       information,
       contact_person_name,
       restaurant_image,
       menu_image,
       lunch_time_open,
       lunch_time_close,
       dinner_time_open,
       dinner_time_close,
       longitude,
       latitude
     }
  */   
    let myForm = ev.target;
   var fd = new FormData(document.getElementById("myForm"));
   // fd.append('api-key', 'myApiKey');
    
   // for (let key of fd.keys()) {
     // console.log(key, fd.get(key));
   // }
    /*let json = convertFD2JSON(fd);*/
    console.log(state.restaurant_image);
    console.log(state.menu_image);
   // fd.set("restaurant_image",state.restaurant_image)
    //fd.set("menu_image",state.menu_image);




/*
    fetch('https://sipcityapi.mobileprogramming.net/admin/restaurant-signup', {
             method: "POST",
             headers: {
                 'Content-Type': 'application/json',
                 'Accept': 'application/json',
                 "Access-Control-Allow-Origin": "*",
                 "Access-Control-Allow-Methods": "POST, GET, PUT, OPTIONS, DELETE",
                 "Access-Control-Allow-Headers": "*",
                 "Accept": "*",
                 'Content-Type': 'multipart/form-data',
                 'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MSwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJlbWFpbCI6Im11ZGl0Lmt1bWFyQG1vYmlsZXByb2dyYW1taW5nLmNvbSJ9LCJpYXQiOjE1OTY3MzgzMjQsImV4cCI6MzE5MzQ4MDI0OH0.7Elcc7IJqeCsmmKFUPy1AXnT_f0Zoeb6yzKkL5eOaWY',
             },
             body:fd
         }).then((response) => {
             console.log(response.status);
             response.json().then((resp) => {
                 console.log(resp.message);
                
             })
         })
*/


    
    let url = 'https://sipcityapi.mobileprogramming.net/admin/restaurant-signup';
    let h = new Headers();

    h.append('Access-Control-Allow-Origin', '*');
   // h.append('Origin','http://localhost:3000');

    h.append('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MSwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJlbWFpbCI6Im11ZGl0Lmt1bWFyQG1vYmlsZXByb2dyYW1taW5nLmNvbSJ9LCJpYXQiOjE1OTY3MzgzMjQsImV4cCI6MzE5MzQ4MDI0OH0.7Elcc7IJqeCsmmKFUPy1AXnT_f0Zoeb6yzKkL5eOaWY');
   // h.append('Content-Type', 'multipart/form-data');
    let req = new Request(url, {
      headers: h,
      body: fd,
      method: 'POST',
    });
    //console.log(req);
    fetch(req)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        alert(state.restaurant_name + " Restaurant Added successfully");
        //props.history.push("/AllMerchantsFragment");


      })
      .catch(console.warn);
    function convertFD2JSON(formData) {
      let obj = {};
      for (let key of formData.keys()) {
        obj[key] = formData.get(key);
      }
      return JSON.stringify(obj);
    }
    /* var bodyFormData = new FormData();
     let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MSwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJlbWFpbCI6Im11ZGl0Lmt1bWFyQG1vYmlsZXByb2dyYW1taW5nLmNvbSJ9LCJpYXQiOjE1OTY3MzgzMjQsImV4cCI6MzE5MzQ4MDI0OH0.7Elcc7IJqeCsmmKFUPy1AXnT_f0Zoeb6yzKkL5eOaWY';
 
 
     axios
       .post('https://sipcityapi.mobileprogramming.net/admin/restaurant-signup', {
 
         data: bodyFormData,
         headers: {
           "Access-Control-Allow-Credentials": true,
           "Access-Control-Allow-Origin": "*",
           "Access-Control-Allow-Methods": "POST, GET, PUT, OPTIONS, DELETE",
           "Access-Control-Allow-Headers": "*",
           "Accept": "*",
           'Content-Type': 'multipart/form-data',
           'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MSwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJlbWFpbCI6ImFzaG9rLmFtYXJhQG1vYmlsZXByb2dyYW1taW5nbGxjLmNvbSJ9LCJpYXQiOjE1OTc5MzU1NzcsImV4cCI6MzE5NTg3NDc1NH0.syJvNZoDvbyTXIvKb2UVYScuuHxxXp3AdEfAXkXoHTs',
         },
       },
         FormData)
       .then(response => {
         console.log(response);
         localStorage.setItem("Authorization", response.data.Authorization);
         localStorage.setItem("token", response.data.token);
 
 
 
         setState({
           redirect: false,
           message: response.data
         });
         setState({ data: response.data });
       })
       .catch(error => {
         console.log(error);
         setState({
           redirect: false
         })
       })*/

  };


  const onAddress = (e) => {

    let text = e.target.value;

    dataChange(e);

    for (var i = 0; i < predictions.length; i++) {

      if (text === predictions[i].description) {
        dataChange(e);
        onPressRowData(predictions[i]);

        return;
      }
    }
    let ele = document.getElementById("suggestions");

    axios({
      method: 'get',
      headers: { 'Access-Control-Allow-Origin': '*', },
      url: 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + encodeURIComponent(text) + '&radius=1000&key=AIzaSyDm61dTqXzF337Y-VsFFDH0gJTFTMQoUxU',
    }).then((data) => {

      ele.innerHTML = "";

      console.log(data.data.predictions)


      console.log("local")

      let pred = data.data.predictions

      setPrediction(pred);

      for (var i = 0; i < pred.length; i++) {
        if (i > 5) {
          break
        }
        let op = document.createElement('option');
        op.value = pred[i].description;
        ele.append(op);
      }
    }).catch((error => {
      console.log(error);
    }))

  }
  const onPressRowData = (rowData) => {
    let auxAddresses;
    console.log('Row Data: ',)
    axios({
      method: 'get',
      headers: { 'Access-Control-Allow-Origin': '*', },
      url: 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=' + encodeURIComponent(rowData.place_id) + '&fields=geometry,name,rating&key=AIzaSyDm61dTqXzF337Y-VsFFDH0gJTFTMQoUxU',
    }).then((data) => {
      console.log(data)
      data = data.data;
      console.log(data)
      console.log('Details: ', data.result.geometry.location);
      const { lat, lng } = data.result.geometry.location;
      auxAddresses = {
        format_address: rowData.description,
        latitude: lat,
        longitude: lng,
      };
      console.log(auxAddresses);
      setAddress(auxAddresses);

      var list = rowData.description.split(",");
      var state1 = stateList[`${list[list.length - 2].trim()}`];

      var city1 = list[list.length - 3];

      setState({ ...state, latitude: lat, longitude: lng, address: rowData.description, state: state1, city: city1 })


    }).catch(error => {
      console.log('Error: ', error);
    })
  }

  return (<div className="AddMerchantmain"><h3 className="AddMerchantHeading">Add New Merchant</h3><br />
    {/* <h6 className="HeadingBottom">Please enter Basic Info</h6> */}

    <Form onSubmit={postData} id="myForm" >
      <Form.Row>
        <Col xs={2}>
          <Form.Group controlId="restaurant_name">
            <Form.Label className="label">Merchant Name</Form.Label>
            <Form.Control type="name" placeholder="" name="restaurant_name" value={state.restaurant_name} required onChange={(e) => dataChange(e)} />

          </Form.Group>
        </Col>

        <Col xs={2}>
          <Form.Group controlId="email">
            <Form.Label className="label">Email</Form.Label>
            <Form.Control type="email" placeholder="" name="email" required onChange={(e) => dataChange(e)} value={state.email} />
          </Form.Group>
        </Col>
        <Col xs={2}>
          <Form.Group controlId="designation">
            <Form.Label className="label">Designation</Form.Label>
            <Form.Control as="select" defaultValue="Select" name="designation" onChange={(e) => dataChange(e)} required value={state.designation}>
              <option>Select</option>
              <option>Owner</option>
              <option>Manager</option>
              <option>Server</option>

            </Form.Control>
          </Form.Group>
        </Col>
      </Form.Row>

      <Form.Row>
        <Col xs={3}>
          <Form.Group controlId="contact_person_name">
            <Form.Label className="label">Contact Person</Form.Label>
            <Form.Control placeholder="" required name="contact_person_name" onChange={(e) => dataChange(e)} value={state.contact_person_name} />

          </Form.Group>
        </Col>
        <Col xs={3}>
          <Form.Group controlId="mobile">
            <Form.Label className="label">Phone Number</Form.Label>
            <Form.Control type="value" required onChange={(e) => dataChange(e)} name="mobile" value={state.mobile} >

            </Form.Control>
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row>
        <Col xs={6}>
        <Form.Group controlId="website_link">
            <Form.Label className="label">Website</Form.Label>
            <Form.Control type="text" placeholder="" name="website_link" required onChange={(e) => dataChange(e)} value={state.website_link} />
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row>
        <Col xs={6}>
          <Form.Group controlId="address">
            <Form.Label className="label">Address </Form.Label>
            <Form.Control placeholder="" autoComplete="off" name="address" list="suggestions" required onChange={(e) => { onAddress(e) }} value={state.address} />
            <datalist id="suggestions">

            </datalist>

          </Form.Group>
        </Col>
      </Form.Row>
    
      {/* <Form.Row>
        <Col xs={3} type='hidden'>
          <Form.Group controlId="latitude" >
            <Form.Label className="label">latitude</Form.Label>
            <Form.Control type="value" required onChange={(e) => dataChange(e)} name="latitude" value={state.latitude} >


            </Form.Control>
          </Form.Group>
        </Col>
        <Col xs={3} type='hidden'>
          <Form.Group >
            <Form.Label className="label">longitude</Form.Label>
            <Form.Control type="value" required onChange={(e) => dataChange(e)} name="longitude" value={state.longitude} >

            </Form.Control>
          </Form.Group>
        </Col>
      </Form.Row> */}
      <Form.Row>
        <Col xs={2}>
          <Form.Group controlId="city">
            <Form.Label className="label">City</Form.Label>
            <Form.Control placeholder="" name="city" required onChange={(e) => dataChange(e)} value={state.city} />
          </Form.Group>
        </Col>
        <Col xs={2}>
          <Form.Group controlId="state">
            <Form.Label className="label">State</Form.Label>
            <Form.Control as="select" defaultValue="Select State" name="state" onChange={(e) => dataChange(e)} required value={state.state} >
              <option>Select State</option>
              <option>Alabama</option>
              <option>Alaska</option>
              <option>Arizona</option>
              <option>Arkansas</option>
              <option>California</option>
              <option>Colorado</option>
              <option>Connecticut</option>
              <option>Delaware</option>
              <option>Florida</option>
              <option>Georgia</option>
              <option>Hawaii</option>
              <option>Idaho</option>
              <option>Illinois</option>
              <option>Indiana</option>
              <option>Iowa</option>
              <option>Kansas</option>
              <option>Kentucky</option>
              <option>Louisiana</option>
              <option>Maine</option>
              <option>Maryland</option>
              <option>Massachusetts</option>
              <option>Michigan</option>
              <option>Minnesota</option>
              <option>Mississippi</option>
              <option>Missouri</option>
              <option>Montana</option>
              <option>Nebraska</option>
              <option>Nevada</option>
              <option>New Hampshire</option>
              <option>New Jersey</option>
              <option>New Mexico</option>
              <option>New York</option>
              <option>North Carolina</option>
              <option>North Dakota</option>
              <option>Ohio</option>
              <option>Oklahoma</option>
              <option>Oregon</option>
              <option>Pennsylvania</option>
              <option>Rhode Island</option>
              <option>South Carolina</option>
              <option>South Dakota</option>
              <option>Tennessee</option>
              <option>Texas</option>
              <option>Utah</option>
              <option>Vermont</option>
              <option>Virginia</option>
              <option>Washington</option>
              <option>West Virginia</option>
              <option>Wisconsin</option>
              <option>Wyoming</option>

            </Form.Control>
          </Form.Group>
        </Col>
        <Col xs={2}>
          <Form.Group controlId="pincode">
            <Form.Label className="label">Zipcode</Form.Label>
            <Form.Control placeholder="" required name="pincode" onChange={(e) => dataChange(e)} value={state.pincode} />

          </Form.Group>
        </Col>
      </Form.Row>

      <Form.Row>
        <Col xs={3}>
          <Form.Group controlId="working_hours_lunch">
            <Form.Label className="label">Working Hours (Lunch)</Form.Label><br />
            <Form.Control as="select" name="lunch_time_open" required onChange={(e) => dataChange(e)} value={state.lunch_time_open} >
            <option>00:00 am</option>
              <option>00:30 am</option>
              <option>01:00 am</option>
              <option>01:30 am</option>
              <option>02:00 am</option>
              <option>02:30 am</option>
              <option>03:00 am</option>
              <option>03:30 am</option>
              <option>04:00 am</option>
              <option>04:30 am</option>
              <option>05:00 am</option>
              <option>05:30 am</option>
              <option>06:00 am</option>
              <option>06:30 am</option>
              <option>07:00 am</option>
              <option>07:30 am</option>
              <option>08:00 am</option>
              <option>08:30 am</option>
              <option>09:00 am</option>
              <option>09:30 am</option>
              <option>10:00 am</option>
              <option>10:30 am</option>
              <option>11:00 am</option>
              <option>11:30 am</option>
              <option>12:00 pm </option>
              <option>00:30 pm</option>
              <option>01:00 pm</option>
              <option>01:30 pm</option>
              <option>02:00 pm</option>
              <option>02:30 pm</option>
              <option>03:00 pm</option>
              <option>03:30 pm</option>
              <option>04:00 pm</option>
              <option>04:30 pm</option>
              <option>05:00 pm</option>
              <option>05:30 pm</option>
              <option>06:00 pm</option>
              <option>06:30 pm</option>
              <option>07:00 pm</option>
              <option>07:30 pm</option>
              <option>08:00 pm</option>
              <option>08:30 pm</option>
              <option>09:00 pm</option>
              <option>09:30 pm</option>
              <option>10:00 pm</option>
              <option>10:30 pm</option>
              <option>11:00 pm</option>
              <option>11:30 pm</option>
              <option>12:00 am </option>

            </Form.Control>
            <Form.Control as="select" name="lunch_time_close" onChange={(e) => dataChange(e)} required value={state.lunch_time_close} >
            <option>00:00 am</option>
              <option>00:30 am</option>
              <option>01:00 am</option>
              <option>01:30 am</option>
              <option>02:00 am</option>
              <option>02:30 am</option>
              <option>03:00 am</option>
              <option>03:30 am</option>
              <option>04:00 am</option>
              <option>04:30 am</option>
              <option>05:00 am</option>
              <option>05:30 am</option>
              <option>06:00 am</option>
              <option>06:30 am</option>
              <option>07:00 am</option>
              <option>07:30 am</option>
              <option>08:00 am</option>
              <option>08:30 am</option>
              <option>09:00 am</option>
              <option>09:30 am</option>
              <option>10:00 am</option>
              <option>10:30 am</option>
              <option>11:00 am</option>
              <option>11:30 am</option>
              <option>12:00 pm </option>
              <option>00:30 pm</option>
              <option>01:00 pm</option>
              <option>01:30 pm</option>
              <option>02:00 pm</option>
              <option>02:30 pm</option>
              <option>03:00 pm</option>
              <option>03:30 pm</option>
              <option>04:00 pm</option>
              <option>04:30 pm</option>
              <option>05:00 pm</option>
              <option>05:30 pm</option>
              <option>06:00 pm</option>
              <option>06:30 pm</option>
              <option>07:00 pm</option>
              <option>07:30 pm</option>
              <option>08:00 pm</option>
              <option>08:30 pm</option>
              <option>09:00 pm</option>
              <option>09:30 pm</option>
              <option>10:00 pm</option>
              <option>10:30 pm</option>
              <option>11:00 pm</option>
              <option>11:30 pm</option>
              <option>12:00 am </option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col xs={3}>
          <Form.Group controlId="working_hours_dinner">
            <Form.Label className="label">Working Hours (Dinner)</Form.Label><br />
            <Form.Control as="select" defaultValue="State" name="dinner_time_open" required onChange={(e) => dataChange(e)} value={state.dinner_time_open} >
            <option>00:00 am</option>
              <option>00:30 am</option>
              <option>01:00 am</option>
              <option>01:30 am</option>
              <option>02:00 am</option>
              <option>02:30 am</option>
              <option>03:00 am</option>
              <option>03:30 am</option>
              <option>04:00 am</option>
              <option>04:30 am</option>
              <option>05:00 am</option>
              <option>05:30 am</option>
              <option>06:00 am</option>
              <option>06:30 am</option>
              <option>07:00 am</option>
              <option>07:30 am</option>
              <option>08:00 am</option>
              <option>08:30 am</option>
              <option>09:00 am</option>
              <option>09:30 am</option>
              <option>10:00 am</option>
              <option>10:30 am</option>
              <option>11:00 am</option>
              <option>11:30 am</option>
              <option>12:00 pm </option>
              <option>00:30 pm</option>
              <option>01:00 pm</option>
              <option>01:30 pm</option>
              <option>02:00 pm</option>
              <option>02:30 pm</option>
              <option>03:00 pm</option>
              <option>03:30 pm</option>
              <option>04:00 pm</option>
              <option>04:30 pm</option>
              <option>05:00 pm</option>
              <option>05:30 pm</option>
              <option>06:00 pm</option>
              <option>06:30 pm</option>
              <option>07:00 pm</option>
              <option>07:30 pm</option>
              <option>08:00 pm</option>
              <option>08:30 pm</option>
              <option>09:00 pm</option>
              <option>09:30 pm</option>
              <option>10:00 pm</option>
              <option>10:30 pm</option>
              <option>11:00 pm</option>
              <option>11:30 pm</option>
              <option>12:00 am </option>

            </Form.Control>
            <Form.Control as="select" required name="dinner_time_close" onChange={(e) => dataChange(e)} value={state.dinner_time_close} >
            <option>00:00 am</option>
              <option>00:30 am</option>
              <option>01:00 am</option>
              <option>01:30 am</option>
              <option>02:00 am</option>
              <option>02:30 am</option>
              <option>03:00 am</option>
              <option>03:30 am</option>
              <option>04:00 am</option>
              <option>04:30 am</option>
              <option>05:00 am</option>
              <option>05:30 am</option>
              <option>06:00 am</option>
              <option>06:30 am</option>
              <option>07:00 am</option>
              <option>07:30 am</option>
              <option>08:00 am</option>
              <option>08:30 am</option>
              <option>09:00 am</option>
              <option>09:30 am</option>
              <option>10:00 am</option>
              <option>10:30 am</option>
              <option>11:00 am</option>
              <option>11:30 am</option>
              <option>12:00 pm </option>
              <option>00:30 pm</option>
              <option>01:00 pm</option>
              <option>01:30 pm</option>
              <option>02:00 pm</option>
              <option>02:30 pm</option>
              <option>03:00 pm</option>
              <option>03:30 pm</option>
              <option>04:00 pm</option>
              <option>04:30 pm</option>
              <option>05:00 pm</option>
              <option>05:30 pm</option>
              <option>06:00 pm</option>
              <option>06:30 pm</option>
              <option>07:00 pm</option>
              <option>07:30 pm</option>
              <option>08:00 pm</option>
              <option>08:30 pm</option>
              <option>09:00 pm</option>
              <option>09:30 pm</option>
              <option>10:00 pm</option>
              <option>10:30 pm</option>
              <option>11:00 pm</option>
              <option>11:30 pm</option>
              <option>12:00 am </option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row>
        <Col xs={6}>
          <Form.Group controlId="information">
            <Form.Label className="label">More Information</Form.Label>
            <Form.Control as="textarea" minLength="50" maxLength="200" rows="3" placeholder="" required name="information" onChange={(e) => dataChange(e)} value={state.information} />
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row>
        <Form.Group controlId="restaurant_image">
          <label name="Add Images" value={state.restaurant_image} className="label" >Add Images(Maximum of 5)</label>
          <Box display="flex" flexwrap="true">

            {
              state.restaurant_image.map((item, index) => (
                <div>
                  <img src={URL.createObjectURL(item)}
                    style={{ height: "100px", width: "100px", margin: "10px" }} /><br />
                  <DeleteIcon onClick={e => removeImage(index)} />
                </div>

              ))}

          </Box>
          <input
            accept="image/*"
            id="contained-button-file"
            hidden
            type="file"
            name="restaurant_image"
            onChange={e => {
              if (e.target.files && e.target.files[0]) {


                console.log(e.target.files);

                if(e.target.files.length>5)
                {
                    alert(`Max 5 Images are Allowed`);
                    e.preventDefault();
                    let restaurant_image = [];

                    for(var i=0;i<5;i++)
                    {
                    restaurant_image.push(e.target.files[i])
                    }
                    setState({
                      ...state,
                      restaurant_image,
                    })
                    return;
                }


                let restaurant_image = [];

                for(var i=0;i<e.target.files.length;i++)
                {
                restaurant_image.push(e.target.files[i])
                }
                setState({
                  ...state,
                  restaurant_image,
                })
              }
            }}
            multiple
          />
          {state.view_type === 0 && state.restaurant_image.length < 5 ? (
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span" startIcon={<AddAPhotoIcon />}>
                Add Images
                    </Button>
            </label>
          ) : null}


        </Form.Group>
      </Form.Row>
      <br />
      <Form.Row>

        <Form.Group controlId="menu_image">
          <label name="menu_image" className="label">Menu Images( Maximum of 5)</label>
          <Box display="flex" flexwrap="true">

            {
              state.menu_image.map((item, index) => (
                <div>
                  <img src={URL.createObjectURL(item)}
                    style={{ height: "100px", width: "100px", margin: "10px", }} /><br />
                  <CancelIcon onClick={e => deleteImage(index)} />
                </div>
              ))}
          </Box>
          <input
            accept="image/*"
            id="contained-button-files"
            hidden
            type="file"
            name="menu_image"
            onChange={e => {
              if (e.target.files && e.target.files[0]) {

                console.log(e.target.files);
                if(e.target.files.length>5)
                {
                    alert(`Max 5 Images are Allowed`);
                    e.preventDefault();
                    let menu_image = state.menu_image;
                for(var i=0;i<5;i++)
                {
                menu_image.push(e.target.files[i])
                }
                setState({
                  ...state,
                  menu_image,
                })
                    return;
                }
                let menu_image = state.menu_image;
                for(var i=0;i<e.target.files.length;i++)
                {
                menu_image.push(e.target.files[i])
                }
                setState({
                  ...state,
                  menu_image,
                })

                console.log(state);
              }
            }}
            multiple
          />
          {state.view_type === 0 && state.menu_image.length < 5 ? (
            <label htmlFor="contained-button-files">
              <Button variant="contained" color="primary" component="span" startIcon={<AddAPhotoIcon />}>
                Add Images
                </Button>
            </label>
          ) : null}
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Button type="submit" style={{ backgroundColor: '#00c9e3' }} onSubmit={postData} >
          Done
          </Button>
      </Form.Row>
    </Form>
  </div >)

}
export default AddMerchantFragment;