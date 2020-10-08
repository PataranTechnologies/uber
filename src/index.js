import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import store from "./store/index";
import { Provider } from "react-redux";
import jwt from "jsonwebtoken";
const jwt_secret =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MSwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJlbWFpbCI6Im11ZGl0Lmt1bWFyQG1vYmlsZXByb2dyYW1taW5nLmNvbSJ9LCJpYXQiOjE1OTY1NzUyNDAsImV4cCI6MzE5MzE1NDA4MH0.7F2vbRcrCQio-FT2R6wfY-I7hHPiXffOpc3dbBWuiJU";
let token = localStorage.getItem('token');
if (token) {
  jwt.verify(token, jwt_secret, (err, decoded) => {
    // if (err) {
    //   localStorage.removeItem("token");
    //   token = null;
    // } else {
    //   if (decoded.iss !== " https://sipcityapi.mobileprogramming.net/admin-login") {
    //     localStorage.removeItem("token");
    //     token = null;
    //   }
    // }
  });
}

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
      
    </Provider>,
    document.getElementById("root")
  );
};
if (token) {
  // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  // axios.post(" https://sipcityapi.mobileprogramming.net/admin-login").then(res => {
  //   store.dispatch({ type: "SET_LOGIN", payload: res.data });
  //   render();
  // });

  // fetch(' https://sipcityapi.mobileprogramming.net/admin-login', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       "Authorization":`${token}`
  //     }
  //   })
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //         localStorage.setItem("token", result.token);
  //         localStorage.setItem("user", JSON.stringify(result.user));
  //         this.props.setLogin(result.user);
  //         this.props.history.push("/Dashboard");
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     )
  //     .catch(err => {
  //       this.setState({ errors: err });
  //     });

  render();

} else {
  render();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
