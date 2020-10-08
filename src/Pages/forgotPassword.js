import React, { Component } from "react";
import { Container, Box, TextField } from "@material-ui/core";
import logo from "../Images/logo.png";
import Button from "@material-ui/core/Button";
import axios from "axios";

class forgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      redirect: false,
    };
    console.log("mail id empty");
  }


  handleChange = event => {
    this.setState({ email: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const email = {
      email: this.state.email
    }
    console.log(this.state);

    axios
      .post('https://sipcityapi.mobileprogramming.net/admin/forgot', email)
      .then(res => {
        console.log(res.json);
        console.log(res.data);
        this.props.history.push("/enterOtp");
        console.log("its working");
      })
  }

  /*componentDidMount() {
    const apiUrl = 'https://sipcityapi.mobileprogramming.net/admin/forgot';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => console.log('This is your data', data));
  };
*/
  render() {
    console.log("test");
    return (
      <div classname="forgotMain">
        <Container maxwidth="lg">
          <img src={logo} height="660px" alt="logo" />
          <Box textAlign="center" ml={61} mt={-75}>
            <h1 className="forgotHeading">Forgot Password?</h1>
            <p className="forgotPara">
              Please Enter your Email associated with your account
              we will send you OTP to reset your password
          </p>
            <br />

            <form onSubmit={this.handleSubmit}>
              <br />
              <br />
              <br />

              <TextField
                className="text"
                label="please enter your Email"
                id="outlined-size-small"
                defaultValue=""
                variant="outlined"
                size="small"
                onChange={this.handleChange}
                block
              />
              <br />
            </form>
            <br />
            <br />

            <div className="btn">
              <button type="submit" className="forgotSubmitButton" onClick={this.handleSubmit}>
                Submit
            </button>
            </div>
          </Box>
        </Container>
      </div>
    );
  }
}

export default forgotPassword;
