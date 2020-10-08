import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Col } from 'react-bootstrap';
import "./ResetPasswordFragment.css";
import axios from "axios";
import { Redirect, Route } from "react-router";
import { Container, Box, TextField } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { createBrowserHistory } from "history";
import { RemoveRedEye } from '@material-ui/icons';
import { InputAdornment, withStyles } from '@material-ui/core';
const history = createBrowserHistory({ forceRefresh: true });


export class ResetPasswordFragment extends Component {
    constructor(props) {
        super(props);
        this.state = {

            new_password: "",
            old_password: "",
            new_password_confirm:'',
            redirect: false,
            refresh: false,
            passwordIsMasked: true,
            passwordIsMasked1: true,
            passwordIsMasked2: true,
        }
    }

    togglePasswordMask = () => {
        this.setState(prevState => ({
          passwordIsMasked: !prevState.passwordIsMasked,
        }));
      };

    togglePasswordMask1 = () => {
        this.setState(prevState => ({
          passwordIsMasked1: !prevState.passwordIsMasked1,
        }));
      };

    togglePasswordMask2 = () => {
        this.setState(prevState => ({
          passwordIsMasked2: !prevState.passwordIsMasked2,
        }));
      };
    dataChange(ev) {
        this.setState({
            [ev.target.name]: ev.target.value

        })
        console.log(this.state);
    }
    postData(ev) {
        ev.preventDefault()


        let new_password = this.state.new_password
        let old_password = this.state.old_password

        if(this.state.new_password_confirm!==new_password)
        {
            alert("Passwords Does not match");
            return;
        }
        
        let data = {

            new_password,
            old_password,

        }


        let myForm = ev.target;
        var fd = new FormData(myForm);
        let json = convertFD2JSON(fd);
        let url = 'https://sipcityapi.mobileprogramming.net/admin/reset-password';
        let h = new Headers();

        h.append('Content-Type', 'Application/json');
        h.append('Access-Control-Allow-Origin', '*');
        h.append('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MSwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJlbWFpbCI6Im11ZGl0Lmt1bWFyQG1vYmlsZXByb2dyYW1taW5nLmNvbSJ9LCJpYXQiOjE1OTY3MzgzMjQsImV4cCI6MzE5MzQ4MDI0OH0.7Elcc7IJqeCsmmKFUPy1AXnT_f0Zoeb6yzKkL5eOaWY');

        let req = new Request(url, {
            headers: h,
            body: json,
            method: 'PUT',
        });
        //console.log(req);
        fetch(req)
            .then((res) => res.json())

            .then((data) => {
                console.log(data.json);
                alert("password changed successfully");
                this.props.onReset();

            })
            .catch(console.warn);
        function convertFD2JSON(formData) {
            let obj = {};
            for (let key of formData.keys()) {
                obj[key] = formData.get(key);
            }
            return JSON.stringify(obj);
        }
    };

    render() {
        return (
            <div className="resetPasswordMain">
                <h3 className="resetPasswordHeading">Reset Password</h3>
                <Form onSubmit={this.postData.bind(this)} id="myForm" >
                    <Form.Row>
                        <Col xs={4}>
                            <Form.Group controlId="old_password">
                                <Form.Label>Enter old Passowrd</Form.Label>
               <br/>                
                                <TextField
              className="text"
              label=""

              id="outlined-size-small"
              defaultValue=""
              variant="outlined"
              size="small"
              name="password"
              id="password"
              autoComplete="current-password"
              onChange={(e)=>{this.setState({old_password:e.target.value})}}
              required
               
              type={this.state.passwordIsMasked ? 'password' : 'text'}
              {...this.props}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <RemoveRedEye
 className='onhover'
                      onClick={this.togglePasswordMask} />
                  </InputAdornment>
                ),
              }}

            />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <br />
                    <Form.Row>
                        <Col xs={4}>
                            <Form.Group controlId="new_password">

                                <Form.Label>Enter New Password</Form.Label>
                                <br/>   
                                <TextField
              className="text"
              label=""

              id="outlined-size-small"
              defaultValue=""
              variant="outlined"
              size="small"
              name="password"
              id="password"
              autoComplete="current-password"
              onChange={(e)=>{this.setState({new_password:e.target.value})}}
              required

              type={this.state.passwordIsMasked1 ? 'password' : 'text'}
              {...this.props}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <RemoveRedEye
 className='onhover'
                      onClick={this.togglePasswordMask1} />
                  </InputAdornment>
                ),
              }}

            />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <br />
                    <Form.Row>
                        <Col xs={4}>
                            <Form.Group controlId="new_password">

                                <Form.Label>Confirm Password</Form.Label>
                                <br/>   
                                <TextField
              className="text"
              label=""

              id="outlined-size-small"
              defaultValue=""
              variant="outlined"
              size="small"
              name="password"
              id="password"
              autoComplete="current-password"
              onChange={(e)=>{this.setState({new_password_confirm:e.target.value})}}
              required

              type={this.state.passwordIsMasked2 ? 'password' : 'text'}
              {...this.props}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <RemoveRedEye
                      className='onhover'
                      onClick={this.togglePasswordMask2} />
                  </InputAdornment>
                ),
              }}

            />
            
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <br />
                    <Form.Row>

                        <Form.Group controlId="submit">
                            <Button type="submit" className="submitButton" onSubmit={this.postData}>
                                Done
                            </Button>
                        </Form.Group>

                    </Form.Row>
                    <br />


                </Form >

            </div >
        )
    }
}

export default ResetPasswordFragment;