
import React, { Component } from 'react';
import { Form, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from "axios";
import logo from "../Images/logo.png";
import DeleteIcon from '@material-ui/icons/Delete';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useFormik } from "formik";
import * as yup from "yup";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { GoogleComponent } from "react-google-location";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import CancelIcon from '@material-ui/icons/Cancel';

import './manmer.css'   
export class ManageMerchantFragment extends Component {

    constructor() {
        super();
        this.state = {
            manageData: [],
            id: null,
            restaurant_name: null,
            restaurant_id: null,
            email: null,
            designation: null,
            address: null,
            city: null,
            state: null,
            pincode: null,
            contact_person_name: null,
            mobile: null,
            information: null,
            lunch_time_open: null,
            lunch_time_close: null,
            dinner_time_open: null,
            dinner_time_close: null,
            lat: null,
            lng: null,
            restaurant_images: [],
            restaurant_image:[],
            menu_image:[],
            menu_images: [],
            redirect: false,
            refresh: false,
            view_type: 0,


        }
    }
    
    componentDidMount() {
        console.log(window.location.href);
        const url = window.location.href;
        const id = this.props.id;
        fetch('https://sipcityapi.mobileprogramming.net/admin/get-restaurant/' + id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                // 'Accept': 'application/json',
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MSwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJlbWFpbCI6Im11ZGl0Lmt1bWFyQG1vYmlsZXByb2dyYW1taW5nLmNvbSJ9LCJpYXQiOjE1OTY3MzgzMjQsImV4cCI6MzE5MzQ4MDI0OH0.7Elcc7IJqeCsmmKFUPy1AXnT_f0Zoeb6yzKkL5eOaWY',
            },
        }).then((result) => {
            console.log(result.restaurant_name);
            result.json().then((resp) => {

                console.log(resp.restaurant_name);
                this.setState({ manageData: resp });
                console.log(this.state.manageData);
                this.setState({ restaurant_name: resp.restaurant_name });
                this.setState({ restaurant_id: resp.restaurant_id });
                this.setState({ pincode: resp.pincode });
                this.setState({ mobile: resp.mobile });
                this.setState({ address: resp.address });
                this.setState({ latitude: resp.latitude });
                this.setState({ longitude: resp.longitude });
                this.setState({ email: resp.email });
                this.setState({ information: resp.information });
                this.setState({ city: resp.city });
                this.setState({ state: resp.state });
                this.setState({ designation: resp.designation });
                this.setState({ contact_person_name: resp.contact_person_name });
                this.setState({ lunch_time_open: resp.lunch_time_open });
                this.setState({ lunch_time_close: resp.lunch_time_close });
                this.setState({ dinner_time_open: resp.dinner_time_open });
                this.setState({ dinner_time_close: resp.dinner_time_close });
                this.setState({ restaurant_images: resp.restaurant_images });
                this.setState({ menu_images: resp.menu_images });
                this.setState({ id: resp.id });

            })
        })
    }



    /* dataChange(ev) {
         this.setState({
             [ev.target.name]: ev.target.value
 
         })
         console.log(this.state);
     }*/
      deleteImage(index,deleteFrom) {

        let delImage;
        if(deleteFrom==='menu')
        {
        let menu_image=this.state.menu_images;
        delImage=this.state.menu_images[index];
        menu_image.splice(index,1);

        this.setState({
            ...this.state,
            menu_images:menu_image,
        })

        }
        else
        {
        let restaurant_images = this.state.restaurant_images
        delImage=this.state.restaurant_images[index];
        restaurant_images.splice(index, 1)
        
        this.setState({
          ...this.state,
          restaurant_images,
    
        });

        console.log(delImage);
    } 
        
        fetch('https://sipcityapi.mobileprogramming.net/admin/delete-image', {
             method: "DELETE",
             headers: {
                 'Content-Type': 'application/json',
                 'Accept': 'application/json',
                 'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MSwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJlbWFpbCI6Im11ZGl0Lmt1bWFyQG1vYmlsZXByb2dyYW1taW5nLmNvbSJ9LCJpYXQiOjE1OTY3MzgzMjQsImV4cCI6MzE5MzQ4MDI0OH0.7Elcc7IJqeCsmmKFUPy1AXnT_f0Zoeb6yzKkL5eOaWY',
             },
             body:JSON.stringify({
              "image_id": delImage.id,
          },),
         }).then((response) => {
             console.log(response.status);
             response.json().then((resp) => {

                 console.log(resp.message);
                

             })
         })

      };
    postData(ev) {
        ev.preventDefault();
           /*    let restaurant_id = this.state.restaurant_id
                let restaurant_name = this.state.restaurant_name
                let email = this.state.email
                let address = this.state.address
                let state = this.state.state
                let designation = this.state.designation
                let mobile = this.state.mobile
                let city = this.state.city
                let pincode = this.state.pincode
                let information = this.state.information
                let contact_person_name = this.state.contact_person_name
                let lunch_time_open = this.state.lunch_time_open
                let lunch_time_close = this.state.lunch_time_close
                let dinner_time_open = this.state.dinner_time_open
                let dinner_time_close = this.state.dinner_time_close
        
               
 
        let fodata = {
          restaurant_id,
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
            lunch_time_open,
            lunch_time_close,
            dinner_time_open,
            dinner_time_close,
            id:this.state.id,
            restaurant_image:this.state.restaurant_image,
            menu_image:this.state.menu_image
            
 
        } 
 */
        let myForm = ev.target;
     var fd = new FormData(document.getElementById('myForm'));
        fd.append("restaurant_category", "First");
       
       
      
        /*fd.append('api-key', 'myApiKey');
         
        for (let key of fd.keys()) {
          console.log(key, fd.get(key));
        }
        let json = convertFD2JSON(fd);*/
       
        let url = 'https://sipcityapi.mobileprogramming.net/admin/update-merchant';
        let h = new Headers();

    // h.append('Content-Type', 'multipart/form-data');
        h.append('Access-Control-Allow-Origin', '*');
        h.append('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MSwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJlbWFpbCI6Im11ZGl0Lmt1bWFyQG1vYmlsZXByb2dyYW1taW5nLmNvbSJ9LCJpYXQiOjE1OTY3MzgzMjQsImV4cCI6MzE5MzQ4MDI0OH0.7Elcc7IJqeCsmmKFUPy1AXnT_f0Zoeb6yzKkL5eOaWY');

        console.log(fd.get("menu_image"))
        fd.delete("menu_image")
        
        for (var i in this.state.menu_image)
        {
          fd.append("menu_image",this.state.menu_image[i]);
        }
        console.log(fd.getAll("menu_image"))

        fd.delete("restaurant_image")
        
        for (var i in this.state.restaurant_image)
        {
          fd.append("restaurant_image",this.state.restaurant_image[i]);
        }
       
       // fd.set("restaurant_image",this.state.restaurant_images);
    //fd.set("menu_image",this.state.menu_images);
        let req = new Request(url, {
            headers: h,
            body: fd,
            method: 'PUT',
        });
        //console.log(req);
        fetch(req)
            .then((res) => res.json())
            .then((result) => {
                console.warn(result);

                alert(this.state.restaurant_name + " Restaurant updated successfully");
                /* this.props.history.push("/Dashboard");
                 this.setState({
 
                 })
 */
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
         
         
         
             this.setState({
               redirect: false,
               message: response.data
             });
             this.setState({ data: response.data });
           })
           .catch(error => {
             console.log(error);
             this.setState({
               redirect: false
             })
           })*/
        const loadUser = async () => {
            const result = await axios.get("https://sipcityapi.mobileprogramming.net/admin/get-restaurant/" + this.state.id);
            console.log(result.data);
        }
    };


    removeImage = index => {
        let restaurant_image = this.state.restaurant_image
        restaurant_image.splice(index, 1)
        this.setState({
          ...this.state,
          restaurant_image,
    
        });
      };
      removeImage2 = index => {
   

/*
        console.log(document.getElementById("menu-file").files);
        let el=document.getElementById("menu-file");
        let lis={}
        for(var i in el.files)
        {
          if(i!=index)
          {
            console.log(i+"   "+index)
            lis[i]=el.files[i];
          }
        }
        console.log(lis);
       el.setAttribute("files",lis)
       el.value=lis;
   
  */ 
   
        let menu_image = this.state.menu_image
        menu_image.splice(index, 1)
        this.setState({
          ...this.state,
          menu_image,
    
        });




      };


    render() {
        console.warn(this.state);

        return (


            <div className="manageForm">


                <Form onSubmit={this.postData.bind(this)} id="myForm" className="myForm">
                    <Form.Row>

                        <button onClick={() => { this.props.back() }} className="backToDashboard">Back</button>
                    </Form.Row>
                    <br />
                    <Form.Row>
                        <Col xs={2}>
                            <Form.Group controlId="restaurant_name">
                                <Form.Label>Merchant Name</Form.Label>
                                <Form.Control type="name" placeholder="Enter Merchant Name" name="restaurant_name" value={this.state.restaurant_name} onChange={(event) => { this.setState({ restaurant_name: event.target.value }) }} />

                            </Form.Group>
                        </Col>

                        <Col xs={2}>
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="abcd@gmail.com" name="email" value={this.state.email} onChange={(event) => { this.setState({ email: event.target.value }) }} />
                            </Form.Group>
                        </Col>
                        <Col xs={2}>

                            <Form.Group controlId="designation">
                                <Form.Label>Designation</Form.Label>
                                <Form.Control as="select" defaultValue="General Manager" name="designation" value={this.state.designation} onChange={(event) => { this.setState({ designation: event.target.value }) }}>
                                    <option>General manager</option>
                                    <option>MD</option>
                                    <option>Employee</option>
                                    <option>Supervisor</option>
                                    <option>Daily Labour</option>
                                    <option>Floor Manager</option>
                                    <option>Marketing</option>
                                    <option>Sales</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col xs={6}>
                            <Form.Group controlId="address">
                                <Form.Label>Address </Form.Label>
                                <Form.Control placeholder="Enter Your Full Address" name="address" value={this.state.address} onChange={(event) => { this.setState({ address: event.target.value }) }} />
                            </Form.Group>
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col xs={2}>
                            <Form.Group controlId="city">
                                <Form.Label>City</Form.Label>
                                <Form.Control placeholder="Enter City Name" name="city" value={this.state.city} onChange={(event) => { this.setState({ city: event.target.value }) }} />
                            </Form.Group>
                        </Col>
                        <Col xs={2}>

                            <Form.Group controlId="state">
                                <Form.Label>State</Form.Label>
                                <Form.Control as="select" defaultValue="Select State" name="state" value={this.state.state} onChange={(event) => { this.setState({ state: event.target.value }) }}>
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
                                <Form.Label>Zipcode</Form.Label>
                                <Form.Control placeholder="000000" required name="pincode" value={this.state.pincode} onChange={(event) => { this.setState({ pincode: event.target.value }) }} />

                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col xs={3}>
                            <Form.Group controlId="contact_person_name">
                                <Form.Label>Contact Person</Form.Label>
                                <Form.Control placeholder="Enter Your Name" required name="contact_person_name" value={this.state.contact_person_name} onChange={(event) => { this.setState({ contact_person_name: event.target.value }) }} />

                            </Form.Group>
                        </Col>
                        <Col xs={3}>

                            <Form.Group controlId="mobile">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control type="value" value={this.state.mobile} onChange={(event) => { this.setState({ mobile: event.target.value }) }} name="mobile" >

                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col xs={3}>
                            <Form.Group controlId="working_hours_lunch">
                                <Form.Label>Work Hours(Lunch)</Form.Label><br />
                                <Form.Control as="select" name="lunch_time_open" value={this.state.lunch_time_open} onChange={(event) => { this.setState({ lunch_time_open: event.target.value }) }}>
                                <option>00:00</option>
                  <option>01:00</option>
                  <option>01:30</option>
                  <option>02:00</option>
                  <option>02:30</option>
                  <option>03:00</option>
                  <option>03:30</option>
                  <option>04:00</option>
                  <option>04:30</option>
                  <option>05:00</option>
                  <option>05:30</option>
                  <option>06:00</option>
                  <option>06:30</option>
                  <option>07:00</option>
                  <option>07:30</option>
                  <option>08:00</option>
                  <option>08:30</option>
                  <option>09:00</option>
                  <option>09:30</option>
                  <option>10:00</option>
                  <option>10:30</option>
                  <option>11:00</option>
                  <option>11:30</option>
                  <option>12:00</option>
                  <option>12:30</option>
                  <option>13:00</option>
                  <option>13:30</option>
                  <option>14:00</option>
                  <option>14:30</option>
                  <option>15:00</option>
                  <option>15:30</option>
                  <option>16:00</option>
                  <option>16:30</option>
                  <option>17:00</option>
                  <option>17:30</option>
                  <option>18:00</option>
                  <option>18:30</option>
                  <option>19:00</option>
                  <option>19:30</option>
                  <option>20:00</option>
                  <option>20:30</option>
                  <option>21:00</option>
                  <option>21:30</option>
                  <option>22:00</option>
                  <option>22:30</option>
                  <option>23:00</option>
                  <option>23:30</option>
                  <option>24:00</option>

                                </Form.Control><br />
                                <Form.Control as="select" name="lunch_time_close" value={this.state.lunch_time_close} onChange={(event) => { this.setState({ lunch_time_close: event.target.value }) }}>
                                <option>00:00</option>
                  <option>01:00</option>
                  <option>01:30</option>
                  <option>02:00</option>
                  <option>02:30</option>
                  <option>03:00</option>
                  <option>03:30</option>
                  <option>04:00</option>
                  <option>04:30</option>
                  <option>05:00</option>
                  <option>05:30</option>
                  <option>06:00</option>
                  <option>06:30</option>
                  <option>07:00</option>
                  <option>07:30</option>
                  <option>08:00</option>
                  <option>08:30</option>
                  <option>09:00</option>
                  <option>09:30</option>
                  <option>10:00</option>
                  <option>10:30</option>
                  <option>11:00</option>
                  <option>11:30</option>
                  <option>12:00</option>
                  <option>12:30</option>
                  <option>13:00</option>
                  <option>13:30</option>
                  <option>14:00</option>
                  <option>14:30</option>
                  <option>15:00</option>
                  <option>15:30</option>
                  <option>16:00</option>
                  <option>16:30</option>
                  <option>17:00</option>
                  <option>17:30</option>
                  <option>18:00</option>
                  <option>18:30</option>
                  <option>19:00</option>
                  <option>19:30</option>
                  <option>20:00</option>
                  <option>20:30</option>
                  <option>21:00</option>
                  <option>21:30</option>
                  <option>22:00</option>
                  <option>22:30</option>
                  <option>23:00</option>
                  <option>23:30</option>
                  <option>24:00</option>

                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col xs={3}>
                            <Form.Group controlId="working_hours_dinner">
                                <Form.Label>Work Hours(Dinner)</Form.Label><br />
                                <Form.Control as="select" defaultValue="State" name="dinner_time_open" value={this.state.dinner_time_open} onChange={(event) => { this.setState({ dinner_time_open: event.target.value }) }}>
                                <option>00:00</option>
                  <option>01:00</option>
                  <option>01:30</option>
                  <option>02:00</option>
                  <option>02:30</option>
                  <option>03:00</option>
                  <option>03:30</option>
                  <option>04:00</option>
                  <option>04:30</option>
                  <option>05:00</option>
                  <option>05:30</option>
                  <option>06:00</option>
                  <option>06:30</option>
                  <option>07:00</option>
                  <option>07:30</option>
                  <option>08:00</option>
                  <option>08:30</option>
                  <option>09:00</option>
                  <option>09:30</option>
                  <option>10:00</option>
                  <option>10:30</option>
                  <option>11:00</option>
                  <option>11:30</option>
                  <option>12:00</option>
                  <option>12:30</option>
                  <option>13:00</option>
                  <option>13:30</option>
                  <option>14:00</option>
                  <option>14:30</option>
                  <option>15:00</option>
                  <option>15:30</option>
                  <option>16:00</option>
                  <option>16:30</option>
                  <option>17:00</option>
                  <option>17:30</option>
                  <option>18:00</option>
                  <option>18:30</option>
                  <option>19:00</option>
                  <option>19:30</option>
                  <option>20:00</option>
                  <option>20:30</option>
                  <option>21:00</option>
                  <option>21:30</option>
                  <option>22:00</option>
                  <option>22:30</option>
                  <option>23:00</option>
                  <option>23:30</option>
                  <option>24:00</option>

                                </Form.Control><br />
                                <Form.Control as="select" name="dinner_time_close" value={this.state.dinner_time_close} onChange={(event) => { this.setState({ dinner_time_close: event.target.value }) }}>
                                <option>00:00</option>
                  <option>01:00</option>
                  <option>01:30</option>
                  <option>02:00</option>
                  <option>02:30</option>
                  <option>03:00</option>
                  <option>03:30</option>
                  <option>04:00</option>
                  <option>04:30</option>
                  <option>05:00</option>
                  <option>05:30</option>
                  <option>06:00</option>
                  <option>06:30</option>
                  <option>07:00</option>
                  <option>07:30</option>
                  <option>08:00</option>
                  <option>08:30</option>
                  <option>09:00</option>
                  <option>09:30</option>
                  <option>10:00</option>
                  <option>10:30</option>
                  <option>11:00</option>
                  <option>11:30</option>
                  <option>12:00</option>
                  <option>12:30</option>
                  <option>13:00</option>
                  <option>13:30</option>
                  <option>14:00</option>
                  <option>14:30</option>
                  <option>15:00</option>
                  <option>15:30</option>
                  <option>16:00</option>
                  <option>16:30</option>
                  <option>17:00</option>
                  <option>17:30</option>
                  <option>18:00</option>
                  <option>18:30</option>
                  <option>19:00</option>
                  <option>19:30</option>
                  <option>20:00</option>
                  <option>20:30</option>
                  <option>21:00</option>
                  <option>21:30</option>
                  <option>22:00</option>
                  <option>22:30</option>
                  <option>23:00</option>
                  <option>23:30</option>
                  <option>24:00</option>

                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col xs={2}>
                            <Form.Group controlId="latitude">
                                <Form.Label>latitude</Form.Label>
                                <Form.Control type="value" value={this.state.latitude} onChange={(event) => { this.setState({ latitude: event.target.value }) }} name="latitude"  >

                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col xs={2}>
                            <Form.Group>
                                <Form.Label>longitude</Form.Label>
                                <Form.Control type="value" name="longitude" value={this.state.longitude} onChange={(event) => { this.setState({ longitude: event.target.value }) }} >

                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col xs={2}>
                            <Form.Group controlId="restaurant_id">
                                <Form.Label>Merchant Id</Form.Label>
                                <Form.Control placeholder="Enter Your Id" name="restaurant_id" value={this.state.id} key="restaurant_id" />

                            </Form.Group>
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col xs={6}>

                            <Form.Group controlId="information">
                                <Form.Label>Add More Information</Form.Label>
                                <Form.Control as="textarea" rows="3" minlength="50" maxlength="200" placeholder="Info Here" name="information" value={this.state.information} onChange={(event) => { this.setState({ information: event.target.value }) }} />
                            </Form.Group>
                        </Col>

                    </Form.Row>
                    <Form.Row>
        <Form.Group controlId="restaurant_image">
          <label name="Add Images" value={this.state.restaurant_image} className="label" >Add Images</label>
          <Box display="flex" flexwrap="true">
            {
              this.state.restaurant_images.map((item, index) => (
                <div>
                  <img src={item.image}
                    style={{ height: "100px", width: "100px", margin: "10px" }} />
                  <DeleteIcon className='delButton' onClick={e => this.deleteImage(index,"restro")} />
                </div>

              ))}
              {
                  this.state.restaurant_image.map((item, index) => (
                    <div>
                      <img src={URL.createObjectURL(item)}
                        style={{ height: "100px", width: "100px", margin: "10px" }} />
                      <DeleteIcon className='delButton' onClick={e => this.removeImage(index)} />
                    </div>
    
                  ))
              }

          </Box>
          <input
            accept="image/*"
            id="restro-file"
            hidden
            type="file"
            name="restaurant_image"
            onChange={e => {
              if (e.target.files && e.target.files[0]) {

                let restaurant_image =[...this.state.restaurant_image];
                if(this.state.restaurant_images.length+e.target.files.length+restaurant_image.length>5)
                {
                    alert(`Max 5 Images are Allowed, ${this.state.restaurant_images.length+restaurant_image.length} images already exist , ${5-(this.state.restaurant_images.length+restaurant_image.length)} more allowed to upload `);
                    e.preventDefault();
                    for(var i=0;i<5-(this.state.restaurant_images.length+this.state.restaurant_image.length);i++)
                {
                   
                    restaurant_image.push(e.target.files[i]);
                }
                this.setState({
                    ...this.state,
                    restaurant_image,
                  })
                    return;
                }

               
                for(var i=0;i<e.target.files.length;i++)
                {
                    restaurant_image.push(e.target.files[i]);
                }
                
                this.setState({
                  ...this.state,
                  restaurant_image,
                })
              }
            }}
            multiple
          />&nbsp;
          { this.state.menu_image.length < 5 ?
            <label >
              <Button variant="contained" color="primary" onClick={()=>{document.getElementById('restro-file').click();}} component="span" startIcon={<AddAPhotoIcon />}>
                Add Restaurant Images
                    </Button>
            </label>:null
    }
           <Box display="flex" flexwrap="true">
            {
              this.state.menu_images.map((item, index) => (
                <div>
                  <img src={item.image}
                    style={{ height: "100px", width: "100px", margin: "10px" }} />
                  <DeleteIcon className='delButton' onClick={e => this.deleteImage(index,"menu")} />
                </div>

              ))}

              {
                  this.state.menu_image.map((item, index) => (
                    <div>
                      <img src={URL.createObjectURL(item)}
                        style={{ height: "100px", width: "100px", margin: "10px" }} />
                      <DeleteIcon className='delButton' onClick={e => this.removeImage2(index)} />
                    </div>
    
                  ))
              }
              

          </Box>

          <input
            accept="image/*"
            id="menu-file"
            type="file"
            hidden
            name="menu_image"
            onChange={e => {
              if (e.target.files && e.target.files[0]) {

                let menu_image = [...this.state.menu_image];
                if(this.state.menu_images.length+menu_image.length+e.target.files.length>5)
                {
                    alert(`Max 5 Images are Allowed, ${this.state.menu_images.length+menu_image.length} images already exist ,${5-(this.state.menu_images.length+menu_image.length)} more allowed to upload `);
                    e.preventDefault();
                    for(var i=0;i<5-(this.state.restaurant_images.length+this.state.menu_image.length);i++)
                    {
                    menu_image.push(e.target.files[i]);
                    } 
                    this.setState({
                        ...this.state,
                        menu_image,
                      })
                    return;
                }


                for(var i=0;i<e.target.files.length;i++)
                {
                menu_image.push(e.target.files[i]);
                }
                this.setState({
                  ...this.state,
                  menu_image,
                })
              }
            }}
            multiple
          />&nbsp;
          {this.state.menu_image.length < 5 ?
            <label >
               <Button variant="contained" color="primary" component="span" onClick={()=>{document.getElementById('menu-file').click();}}  startIcon={<AddAPhotoIcon />}>
                Add Menu Images
                    </Button>
            </label>:null
    }

        </Form.Group>
      </Form.Row>
      <br />


                    <Form.Row>
                        <button type="submit" className="SubmitButton" onSubmit={this.postData}>
                            Update
                            </button>
                    </Form.Row>
                </Form>
            </div>
        )
    }
}

export default ManageMerchantFragment;