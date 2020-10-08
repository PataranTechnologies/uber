import React, { Component } from "react";
import merchants from "../Images/merchants.png";
import members from "../Images/members.png";
import offers from "../Images/offers.png";
import axios from "axios";
import { Link } from 'react-router-dom';
import ViewMerchantFragment from "./ViewMerchantFragment";
import { Bar } from "react-chartjs-2";
import './HomeFragment.css'
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";

// Resolves charts dependancy
charts(FusionCharts);
class HomeFragment extends Component {
  constructor() {
    super();
    this.state = {
      restaurants: null,
      totalResturant: " ",
      totalUsers: " ",
      totalRedeems: " ",
      restaurant_id: " ",
      activeScreen: 1,
      selectedItem: null,
      merchantsData: [
      
      ],
      membersData: [
       

      ],

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


    let restaurant_id = this.state.restaurant_id

    this.setState({
      redirect: true
    })

    let data = {

      restaurant_id,


    };


    let myForm = ev.target;
    var fd = new FormData(myForm);
    /* let json = convertFD2JSON(fd);*/
    let url = 'https://sipcityapi.mobileprogramming.net/admin/enable-disable-account/';
    let h = new Headers();

    h.append('Content-Type', 'application/json');
    h.append('Access-Control-Allow-Origin', '*');
    h.append('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MSwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJlbWFpbCI6Im11ZGl0Lmt1bWFyQG1vYmlsZXByb2dyYW1taW5nLmNvbSJ9LCJpYXQiOjE1OTY3MzgzMjQsImV4cCI6MzE5MzQ4MDI0OH0.7Elcc7IJqeCsmmKFUPy1AXnT_f0Zoeb6yzKkL5eOaWY');

    let req = new Request(url, {
      headers: h,
      body: restaurant_id,
      method: 'PUT',
    });
    //console.log(req);
    fetch(req)
      .then((res) => res.json())

      .then((data) => {
        console.log(data.json);

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
  componentDidMount() {
    let url = "https://sipcityapi.mobileprogramming.net/admin/dashboard";
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MSwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJlbWFpbCI6ImFzaG9rLmFtYXJhQG1vYmlsZXByb2dyYW1taW5nbGxjLmNvbSJ9LCJpYXQiOjE1OTc5MzU1NzcsImV4cCI6MzE5NTg3NDc1NH0.syJvNZoDvbyTXIvKb2UVYScuuHxxXp3AdEfAXkXoHTs',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      response.json().then((result) => {
        console.log(result);

        let membersList = []
        let merchatsList = []

        result.monthlyRegisteredData.map(data => {



          membersList.push( data.total_members )
          merchatsList.push( data.total_merchants )



        })


        console.warn(result.restaurants);
        console.warn(result.totalResturant);

        //console.warn("total restaurants =", result.totalResturant);
        //console.warn("total Users=", result.totalUsers);
        this.setState({ restaurants: result.restaurants });
        this.setState({ totalResturant: result.totalResturant });
        this.setState({ totalUsers: result.totalUsers });
        this.setState({ merchantsData: merchatsList })
        this.setState({ membersData: membersList });
        this.setState({ totalRedeems: result.totalRedeems});

      })
    })

  };
  accept(id,i) {

 


    axios({
      method: 'put',
      url: 'https://sipcityapi.mobileprogramming.net/admin/enable-disable-account',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MSwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJlbWFpbCI6Im11ZGl0Lmt1bWFyQG1vYmlsZXByb2dyYW1taW5nLmNvbSJ9LCJpYXQiOjE1OTY3MzgzMjQsImV4cCI6MzE5MzQ4MDI0OH0.7Elcc7IJqeCsmmKFUPy1AXnT_f0Zoeb6yzKkL5eOaWY',
      },
      data: {
        'restaurant_id': id,
        "status": "1",

      }

      

    });

    alert("Merchant Was Approved");
    
    let lis=this.state.restaurants.splice(i,1);

    this.setState({restaurants:lis})




    /*fetch('https://sipcityapi.mobileprogramming.net/admin/enable-disable-account', {
      method: "PUT",
      headers: {
        //'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MSwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJlbWFpbCI6Im11ZGl0Lmt1bWFyQG1vYmlsZXByb2dyYW1taW5nLmNvbSJ9LCJpYXQiOjE1OTY3MzgzMjQsImV4cCI6MzE5MzQ4MDI0OH0.7Elcc7IJqeCsmmKFUPy1AXnT_f0Zoeb6yzKkL5eOaWY',
      },
      body: JSON.stringify({
        'restaurant_id': id,
        "status": "1",
      })
    }).then((result) => {
      result.json().then((resp) => {
        alert("merchant accepted");
        console.log("merchant accepted");
        this.setState({ accept: result.id });
      })
    })*/

  }
  reject(id,i) {
    axios({
      method: 'put',
      url: 'https://sipcityapi.mobileprogramming.net/admin/enable-disable-account',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MSwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJlbWFpbCI6Im11ZGl0Lmt1bWFyQG1vYmlsZXByb2dyYW1taW5nLmNvbSJ9LCJpYXQiOjE1OTY3MzgzMjQsImV4cCI6MzE5MzQ4MDI0OH0.7Elcc7IJqeCsmmKFUPy1AXnT_f0Zoeb6yzKkL5eOaWY',
      },
      data: {
        'restaurant_id': id,
        "status": "2",

      }



    });

    alert("Merchant Rejected");


    let lis=this.state.restaurants.splice(i,1);

    this.setState({restaurants:lis})

    /*fetch('https://sipcityapi.mobileprogramming.net/admin/enable-disable-account/' + id, {
      method: "PUT",
      headers: {
        //'Content-Type': 'application/json',
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MSwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJlbWFpbCI6Im11ZGl0Lmt1bWFyQG1vYmlsZXByb2dyYW1taW5nLmNvbSJ9LCJpYXQiOjE1OTY3MzgzMjQsImV4cCI6MzE5MzQ4MDI0OH0.7Elcc7IJqeCsmmKFUPy1AXnT_f0Zoeb6yzKkL5eOaWY',
      },
      body: {
        'restaurant_id': '',
      }
    }).then((result) => {
      result.json().then((resp) => {
        localStorage.setItem("reject", this.state.result);
        alert("merchant rejected");
        console.log("merchant rejected");
      })
    })*/

  }
  view(id) {

    fetch('https://sipcityapi.mobileprogramming.net/admin/get-restaurant/' + id, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        // 'Accept': 'application/json',
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MSwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJlbWFpbCI6Im11ZGl0Lmt1bWFyQG1vYmlsZXByb2dyYW1taW5nLmNvbSJ9LCJpYXQiOjE1OTY3MzgzMjQsImV4cCI6MzE5MzQ4MDI0OH0.7Elcc7IJqeCsmmKFUPy1AXnT_f0Zoeb6yzKkL5eOaWY',
      },
    }).then((result) => {
      result.json().then((resp) => {
        /* alert("merchant details view");*/
        console.log(result.data)
        localStorage.setItem("data", result.data);
        this.setState({ result: result.data });
        this.setState(this.state.resp);
      })
    })

  }
  showViewMerchant = (item) => {
    this.setState({ activeScreen: 2, selectedItem: item });

  }
  onBack = () => {

    this.setState({ activeScreen: 1 });
  }


  render() {
    console.log(this.state.restaurants);
    console.log(this.state.totalResturant);
    console.log(this.state.totalUsers);



   const data= {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          label: "Merchants",
          backgroundColor: "rgba(97, 213, 255, 1)",
          borderColor: "rgba(97,213,255,1)",
          borderWidth: 1,

          hoverBackgroundColor: "rgba(97, 213, 255, 1)",
          hoverBorderColor: "rgba(97,213,255,1)",
          data: this.state.merchantsData
        },

        {
          label: "Members",
          backgroundColor: "rgba(44,130,201,1)",
          borderColor: "rgba(44,130,201,1)",
          borderWidth: 1,

          hoverBackgroundColor: "rgba(44, 130, 201, 1)",
          hoverBorderColor: "rgba(44,130,201,1)",
          data: this.state.membersData
        }
      ]
    }
  




   
    const options = {
      responsive: true,
      legend: {
        display: true
      },
      type: "bar"
   
    };




    if (this.state.activeScreen === 1) {

      return (
        <div className="Main">
          {/*<div className="TotalMerchants"><img src={merchants} className="total-merchants" alt="merchants" /><span className="merchantNumbers">08</span><br /><span> Total Merchants</span></div>
        <div className="TotalMembers"><img src={members} className="total-members" alt="members" /><span className="memberNumbers">15</span><br /><span> Total Members</span></div>
        <div className="TotalOffers"><img src={offers} className="total-offers" alt="offers" /><span className="offerNumbers">00</span><br /><span> Total offers</span></div>
    */}
          <div className="cardss">
            <div className="cards1">
              <div className="cardsImg"><img src={merchants} className="total-merchants" alt="merchants" /></div>
              <div className="totalMerch"><span className="merchNumb">{this.state.totalResturant}</span><br /><span className="merchText">Total Merchants</span></div>
              <div></div>
            </div>
            <div className="cards2">
              <div className="cardsImg2"><img src={members} className="total-members" alt="members" /></div>
              <div className="totalUser"><span className="userNumb">{this.state.totalUsers}</span><br /><span className="userText">Total Members</span></div>
              <div></div>
            </div>
            <div className="cards3">
              <div className="cardsImg3"><img src={offers} className="total-offers" alt="offers" /></div>
  <div><span className="offerNumb">{this.state.totalRedeems}</span><br /><span className="offerText">Total Offers</span></div>
              <div></div>
            </div>
          </div>


          {<div className="graphs">

          <Bar
        data={data}
        width={null}
        height={65}
        options={options}
      />

          </div> }

          {/* <h4 className="signupRequests">New Signup Requests</h4> */}
          <div className="datatablea">
          <h4 className="signupRequests">New Signup Requests</h4>

            {
              this.state.restaurants ?
                this.state.restaurants.map((item, i) =>
                  <div className="mainPage">
                    <div className="containera">
                   
                      <div><img src={item.restaurant_images[0]} className="image" /></div>
                      <div className="dash">
                        <p className="dashName">{item.restaurant_name}  {item.totalResturant}</p>
                        <p className="dashPara">{item.information} </p>
                     
                        
                        {/*<p className="dashPara">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>*/}
                      </div>
                     
                      <div className="buttonsdiv">
                      <p className="">Requested On: {item.create_date} </p>

                        <div className='boxx'>
                        <div><button type="button"  onClick={() => this.accept(item.id,i)}  className="acceptButton">Accept</button>
                        </div>
                       <div> <button type="button"  onClick={() => this.reject(item.id,i)}  className="rejectButton" >Reject</button>
                        </div>
                        <div className="view"><button type="button" className="viewButton" onClick={() => { this.showViewMerchant(item) }} >View</button>
                        </div>
                        
                       
                     
                      
                      </div>
                     
                      </div>
                      {/* <p className="fixedPa">Requested On: {item.create_date} </p> */}
                    </div>
                  </div>
                )
                :
                null
            }
          </div>

        </div >

      );
    }
    else {
      return (

        <ViewMerchantFragment back={this.onBack} id={this.state.selectedItem.id} />
      )

    }

  }

}

export default HomeFragment;