import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import sidenav from "../Images/sidenav.png";
import buttonMain from "../Images/buttonMain.png";


export class ViewMerchantFragment extends Component {

    constructor() {
        super();
        this.state = {
            restaurant_name: '',
            restaurant_id: '',
            email: '',
            designation: '',
            address: '',
            city: '',
            state: '',
            pincode: '',
            contact_person_name: '',
            mobile: '',
            information: '',
            lunch_time_open: '',
            lunch_time_close: '',
            dinner_time_open: '',
            dinner_time_close: '',
            restaurant_images: [],
            menu_images: [],
            redirect: false,



        }
    }
    componentDidMount() {
        console.log("success");
        /*console.log(window.location.href);*/
        const url = window.location.href;
        const id = this.props.id;
        fetch('https://sipcityapi.mobileprogramming.net/admin/get-restaurant/' + id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MSwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJlbWFpbCI6Im11ZGl0Lmt1bWFyQG1vYmlsZXByb2dyYW1taW5nLmNvbSJ9LCJpYXQiOjE1OTY3MzgzMjQsImV4cCI6MzE5MzQ4MDI0OH0.7Elcc7IJqeCsmmKFUPy1AXnT_f0Zoeb6yzKkL5eOaWY',
            },
        }).then((result) => {
            console.log(result);
            result.json().then((resp) => {
                console.log(resp);
                this.setState(result);
                this.setState({ restaurant_name: resp.restaurant_name });
                this.setState({ contact_person_name: resp.contact_person_name });
                this.setState({ address: resp.address });
                this.setState({ mobile: resp.mobile });
                this.setState({ pincode: resp.pincode });
                this.setState({ state: resp.state });
                this.setState({ city: resp.city });
                this.setState({ email: resp.email });
                this.setState({ designation: resp.designation });
                this.setState({ information: resp.information });
                this.setState({ lunch_time_open: resp.lunch_time_open });
                this.setState({ lunch_time_close: resp.lunch_time_close });
                this.setState({ dinner_time_open: resp.dinner_time_open });
                this.setState({ dinner_time_close: resp.dinner_time_close });
                this.setState({ restaurant_images: resp.restaurant_images });
                this.setState({ menu_images: resp.menu_images });
            })
        })
    }
    /*view(id) {
        fetch('https://sipcityapi.mobileprogramming.net/admin/get-restaurant/' + id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MSwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJlbWFpbCI6Im11ZGl0Lmt1bWFyQG1vYmlsZXByb2dyYW1taW5nLmNvbSJ9LCJpYXQiOjE1OTY3MzgzMjQsImV4cCI6MzE5MzQ4MDI0OH0.7Elcc7IJqeCsmmKFUPy1AXnT_f0Zoeb6yzKkL5eOaWY',
            },
        }).then((response) => {
            console.log(response);
            response.json().then((result) => {
                console.warn(this.state.result);
                console.log(result);
                alert("merchant details view");
                localStorage.setItem("data", response.data);
            })
});
};*/
    render() {
        return (
            <div className="viewPageMain">


                {/*  <div className="sidePannel">
                    <ul>
                        <li><img src={sidenav} className="sideNav" alt="sidenav" /></li>
                        <li><img src={buttonMain} className="button" alt="buttonMain" /></li>
                        <li><Link to={"/Dashboard"}>Back To Home Page</Link><br /></li>
                        <li>Dashboard</li>
                        <li>Merchants</li>
                        <li>Members</li>
                        <li>Forgot Password</li>
                        <li>Logout</li>
                    </ul>
                </div>
        */}
                {/*<div className="imagesView">


                    <div><img src={this.state.restaurant_images[0]?.image} className="viewImage1" alt="rest" /></div>
                    <div>
                        <div><img src={this.state.restaurant_images[1]?.image} className="viewImage2" alt="rest" /></div>
                        <div>
                            <img src={this.state.restaurant_images[2]?.image} className="viewImage3" alt="rest" />
                            <img src={this.state.restaurant_images[3]?.image} className="viewImage4" alt="rest" />
                            <img src={this.state.restaurant_images[4]?.image} className="viewImage5" alt="rest" />

                        </div>
                    </div>

                </div>
        */}
                <div className="asideView">
                    <button onClick={() => { this.props.back() }} className="backToDashboard">Back</button><br /><br />
                    < div >
                        <Carousel className="carousel">
                            <Carousel.Item>
                                <img
                                    className="viewImage1"
                                    src={this.state.restaurant_images[0]?.image}
                                    alt="First slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="viewImage1"
                                    src={this.state.restaurant_images[1]?.image}
                                    alt="second slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="viewImage1"
                                    src={this.state.restaurant_images[2]?.image}
                                    alt="Third slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="viewImage1"
                                    src={this.state.restaurant_images[3]?.image}
                                    alt="fourth slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="viewImage1"
                                    src={this.state.restaurant_images[4]?.image}
                                    alt="fifth slide"
                                />
                            </Carousel.Item>
                        </Carousel>
                    </div >
                    <div className="viewMain">
                        <div className="restaurantName">{this.state.restaurant_name}</div><br />
                        <div className="addressContainer"><div className="addressHeading">Address :</div><div className="addressDetails"> {this.state.address}-{this.state.pincode}</div></div><br />
                    </div>
                    <div className="topField">
                        <div><span className="spanOne"> Phone Number</span><br /><span className="spanTwo"> {this.state.mobile}</span><br /></div>
                        <div>
                            <span className="spanOne"> Lunch Hours</span><br /><span className="spanTwo"> Open {this.state.lunch_time_open}-
                        Close {this.state.lunch_time_close}</span>
                        </div>
                        <div>
                            <span className="spanOne"> Dinner Hours</span><br /> <span className="spanTwo"> open {this.state.dinner_time_open}-
                        close{this.state.dinner_time_close}</span>
                        </div>
                    </div>
                    <div className="bottomField">
                        <div>
                            <span className="spanOne">  Contact Person</span> <br /><span className="spanTwo">{this.state.contact_person_name}</span>
                        </div>
                        <div>
                            <span className="spanOne">  Designation</span><br /><span className="spanTwo">{this.state.designation}</span>
                        </div>
                        <div>
                            <span className="spanOne">  Email ID</span><br /><span className="spanTwo">{this.state.email}</span>
                        </div>
                    </div>
                    <div className="viewinfo">
                        <span className="spanOne"> Information</span> <br /><span className="spanTwo">{this.state.information}</span>
                    </div>
                    <br /><br /><br />

                </div >
            </div>
        )
    }

};

export default ViewMerchantFragment;

