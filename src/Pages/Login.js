import React, { Component } from "react";
import { Container, Box, TextField } from "@material-ui/core";
import newlogo from "../Images/newlogo.png";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import axios from 'axios';
import { NotificationManager } from "react-notifications";
import { Link } from 'react-router-dom';
import "./Login.css";
import { InputAdornment, withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { RemoveRedEye } from '@material-ui/icons';
import PropTypes from 'prop-types';

const styles = theme => ({
  eye: {
    cursor: 'pointer',
  },
});
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", redirect: false, passwordIsMasked: true, };
  }
  togglePasswordMask = () => {
    this.setState(prevState => ({
      passwordIsMasked: !prevState.passwordIsMasked,
    }));
  };
  handleForm = e => {
    e.preventDefault();
    if (this.state.email == '' || this.state.password == '') {
      alert("please enter the email id & password correctly");
      return;
    }
    console.log("test1");
    
    if (this.state.email === '' || this.state.password === '') {
      NotificationManager.warning("Email And Password Required");
      return false;
    } 
    console.log("its working");
    const data = { email: this.state.email, password: this.state.password };

    axios
      .post(" https://sipcityapi.mobileprogramming.net/admin-login", data)
      .then(result => {
        console.log(result);
        localStorage.setItem("token", result.data.token);
        console.log(result.data.token);

        localStorage.setItem("user", JSON.stringify(result.data.user));
        this.props.setLogin(JSON.stringify(result.data.user));
        NotificationManager.success(result.data.msg);
        if (result.data.status == '200')
          this.props.history.push("/Dashboard");
        else
          alert("Invalid Email Id or Password");
        //  this.props.history.push("/Dashboard");

      })
      .catch(err => {
        if (err.response && err.response.status === 404)
          NotificationManager.error(err.response.data.msg);

        else
          alert("please enter the email id & password correctly");
          this.props.history.push("/Dashboard");
        NotificationManager.error("Something Went Wrong");
        this.setState({ errors: err.response })
      });
  };
  handleInput = e => {
    e.preventDefault();
    const email = e.target.email;
    const password = e.target.password;
    console.log(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value })
    this.setState({ [email]: password })
    console.log(email, password);
  };

  render() {
    const { classes } = this.props;
    const { passwordIsMasked } = this.state;
    console.log("test", this.state);
    return (
      <Container maxwidth="lg">
        <img src={newlogo} height="660px" alt="login" />
        <Box textAlign="center" ml={55} mt={-75}>
          <h1 className="heading">Login</h1>
          <p className="para">Please fill your information below </p>
          <br />

          <form onSubmit={this.handleForm}>
            <TextField
              className="text"
              label="Enter Email ID"
              id="outlined-size-small"

              variant="outlined"
              size="small"
              name="email"

              onChange={this.handleInput}

            />
            <br />
            <br />
            <br />

            <TextField
              className="text"
              label="Password"

              id="outlined-size-small"
              defaultValue=""
              variant="outlined"
              size="small"
              name="password"
              id="password"
              autoComplete="current-password"
              onChange={this.handleInput}
              required

              type={passwordIsMasked ? 'password' : 'text'}
              {...this.props}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <RemoveRedEye

                      onClick={this.togglePasswordMask} />
                  </InputAdornment>
                ),
              }}

            />
            <br />

            <br />
            <div className="forgot">
              <input type="checkbox" id="remember me" name="remember me" value="remember me" className="check" />
              <label for="remember me"> &nbsp; Remember me</label>
              <h5 classname="forgotPassword"><Link to={'/forgotPassword'}>Forgot password?</Link></h5>
            </div><br />
            <div className="btn">
              <input type="submit" value="Login" className="loginButton" onClick={this.handleForm} />


            </div>
          </form>
        </Box>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setLogin: user => dispatch({ type: "SET_LOGIN", payload: user })
  };
};
export default connect(
  null,
  mapDispatchToProps
)(Login);
Login.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
};