import React, { Component } from "react";
import { Container, Box, TextField } from "@material-ui/core";
import logo from "../Images/logo.png";
import Button from "@material-ui/core/Button";
import axios from "axios";

class enterOtp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verification_code: " ",
      redirect: false,
    };
    console.log("otp empty");
  }
  handleChange = event => {
    this.setState({ verification_code: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();
    const verification_code = {
      verification_code: this.state.verification_code
    }
    console.log(this.state);
    axios
      .post('https://sipcityapi.mobileprogramming.net/admin/verify-otp', verification_code)
      .then(res => {
        console.log(res.json);
        console.log(res.data);
        console.log(res.verification_code);
        // this.props.history.push("/changePassword");
        this.props.history.push({
          pathname: '/changePassword',
          state: { verification_code : res.verification_code }
        })
        console.log(res.verification_code);
      })
  }

  render() {
    return (
      <Container maxwidth="lg">
        <img src={logo} height="660px" alt="logo" />
        <Box textAlign="center" ml={61} mt={-75}>
          <h1 className="otpHeading">Enter OTP!</h1>
          <p className="otpPara">
            Enter the 6 digits OTP we just sent you on your phone number
          </p>
          <br />

          <form onSubmit={this.handleSubmit}>
            <br />
            <br />
            <br />

            <TextField
              className="text"
              label="please enter your OTP"
              id="outlined-size-small"
              defaultValue=""
              variant="outlined"
              size="small"
              type="password"
              name="verification_code"
              onChange={this.handleChange}
              block
            />
            <br />
          </form>
          <br />
          <br />
          <p className="resendPara">
            if you dont receive a code!<span className="resend">Resend</span>
          </p>
          <br />
          <div className="btn">
            <button type="submit" className="enterOtpSubmit" onClick={this.handleSubmit}>
              Verify
            </button>
          </div>
        </Box>
      </Container>
    );
  }
}

export default enterOtp;
