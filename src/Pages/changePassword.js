import React, { Component } from "react";
import { Container, Box, TextField } from "@material-ui/core";
import logo from "../Images/logo.png";
import axios from "axios";
import { Form, Col, Button } from 'react-bootstrap';

class changePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      new_password: "",
      redirect: false,
      
    }
  }
  dataChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value

    })
    console.log(this.state);
  }
  postData(ev) {
    ev.preventDefault()


    let new_password = this.state.new_password

    this.setState({
      redirect: true
    })

    let data = {

      new_password,


    }


    let myFormData = ev.target;
    var fd = new FormData(myFormData);
    let json = convertFD2JSON(fd);
    let url = 'https://sipcityapi.mobileprogramming.net/admin/change-password';
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
        this.props.history.push("/Login");

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
      <Container maxwidth="lg">
        <img src={logo} height="660px" alt="logo" />
        <Box textAlign="center" ml={61} mt={-75}>
          <Form onSubmit={this.postData.bind(this)} id="myFormData"  >
            <Form.Row>
              <h3>Change Password!</h3>


            </Form.Row>
            <Form.Row>
              <p>Welcome! now you can change your password</p>


            </Form.Row>

            <Form.Row >
              <Form.Group as={Col} controlId="new_password">
                <Col xs={6}>
                  <Form.Label>Enter Verification Code</Form.Label>
                  <Form.Control type="password" required name="verification_code" value={this.state.name} onChange={this.dataChange.bind(this)} />
                </Col>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="new_password">
                <Col xs={6}>
                  <Form.Label>Enter New Password</Form.Label>
                  <Form.Control type="password" required name="new_password" value={this.state.name} onChange={this.dataChange.bind(this)} />
                </Col>
              </Form.Group>
            </Form.Row>
            <br />
            <Form.Row>
              <Form.Group as={Col} controlId="new_password">
                <Col xs={6}>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" required name="new_password" value={this.state.name} onChange={this.dataChange.bind(this)} />
                </Col>
              </Form.Group>
            </Form.Row>
            <br />
            <Form.Row>
              <Col xs={3}>
                <button type="submit" className="doneButton" onSubmit={this.postData}>
                  Done
                </button>
              </Col>
            </Form.Row>


          </Form >

        </Box>
      </Container>
    );
  }
}

export default changePassword;
