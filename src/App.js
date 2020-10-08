import React from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import AddNewMerchant from "./Pages/AddNewMerchant";
import forgotPassword from "./Pages/forgotPassword";
import enterOtp from "./Pages/enterOtp";
import changePassword from "./Pages/changePassword";
import ResetPasswordFragment from "./Fragments/ResetPasswordFragment";
import LogoutFragment from "./Fragments/LogoutFragment";
import HomeFragment from "./Fragments/HomeFragment";
import ManageMerchantFragment from "./Fragments/ManageMerchantFragment";
import AllMerchantsFragment from "./Fragments/AllMerchantsFragment";
import AllMembersFragment from "./Fragments/AllMembersFragment";
import ViewMerchantFragment from "./Fragments/ViewMerchantFragment";
import { HashRouter } from 'react-router-dom';



function App() {
  return (

    <HashRouter>
      <Switch>
      <Route path="/MerchantSignup" component={AddNewMerchant} />

        <Route exact path="/">
          <Redirect to="/Login" />
        </Route>
        <Route exact path="/Login" component={Login} />
        <Route path="/Dashboard" component={Dashboard} />
        <Route path="/AddNewMerchant" component={AddNewMerchant} />
        <Route path="/forgotPassword" component={forgotPassword} />
        <Route path="/enterOtp" component={enterOtp} />
        <Route path="/changePassword" component={changePassword} />
        <Route path="/ResetPassword" component={ResetPasswordFragment} />
        <Route path="/Logout" component={LogoutFragment} />
        <Route path="/Home" component={HomeFragment} />
        <Route path="/ManageMerchantFragment" component={ManageMerchantFragment} />
        <Route path="/AllMerchantsFragment" component={AllMerchantsFragment} />
        <Route path="/AllMembersFragment" component={AllMembersFragment} />
        <Route path="/ViewMerchantFragment/:item_id" component={ViewMerchantFragment} />
        <Route path="*" render={() => "404 error page not found"} />
      </Switch>
    </HashRouter>

  );
}

export default App;
