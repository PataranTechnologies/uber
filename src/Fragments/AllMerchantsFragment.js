import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './AllMerchant.css'
import { Table ,Row,Col} from 'react-bootstrap';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'; 
import jsPDF from "jspdf";
import "jspdf-autotable";
import ManageMerchantFragment from './ManageMerchantFragment';
import Switch from '@material-ui/core/Switch';
import axios from "axios";
import { createBrowserHistory } from "history";
import { KeyboardArrowLeft, Email } from '@material-ui/icons';

import ToggleButton from 'react-toggle-button'
import PropTypes from 'prop-types';
const propTypes = {
    table: PropTypes.string.isRequired,
    filename: PropTypes.string.isRequired,
    sheet: PropTypes.string.isRequired,
    id: PropTypes.string,
    className: PropTypes.string,
    buttonText: PropTypes.string,
  };
  
  const styles={

    thumbStyle:{
        width:'25px',
        height:'25px',
     
        
    },
    trackStyle:{
        backgroundColor:'red',
    }
  }
  const defaultProps = {
    id: 'button-download-as-xls',
    className: 'button-download',
    buttonText: 'Download',
  };
const history = createBrowserHistory({ forceRefresh: true });

export class AllMerchantsFragment extends Component {
    constructor() {
        super();
        this.state = {
            restaurants: null,
            restaurant_id: null,
            activeScreen: 1,
            selectedItem: null,
            error: null,
            results: null,
            search: ''
        }
    }
    handleClick = (id, status) => {
        console.log('handleClick', id, status);
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
                "status": status,


            }

        });


    //    this.getMerchantList()



    }
    searchMenbers = (text) => {
        this.setState({ search: text })
    }
    componentDidMount() {
        this.getMerchantList();
    }
    getMerchantList = () => {
        let url = "https://sipcityapi.mobileprogramming.net/admin/get-merchants";
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MSwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJlbWFpbCI6Im11ZGl0Lmt1bWFyQG1vYmlsZXByb2dyYW1taW5nLmNvbSJ9LCJpYXQiOjE1OTY3MzgzMjQsImV4cCI6MzE5MzQ4MDI0OH0.7Elcc7IJqeCsmmKFUPy1AXnT_f0Zoeb6yzKkL5eOaWY',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            response.json().then((result) => {
                console.log(result.restaurants);
                localStorage.setItem("token", result.restaurants.token);
                localStorage.setItem("restarant_id", result.restaurant_id);
                this.setState({ restaurants: result.restaurants });
                this.setState({ restaurant_id: result.restaurant_id });
            })
        })

    }
    inactive(id) {
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
                "status": "3",

            }

        });

        alert("Merchant Deactivated");
    }
    active(id) {
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

        alert("Merchant activated");
    }

    /* manage(id) {
         fetch('https://sipcityapi.mobileprogramming.net/admin/get-restaurant/' + id, {
             method: "GET",
             headers: {
                 'Content-Type': 'application/json',
                 // 'Accept': 'application/json',
                 'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MSwibmFtZSI6IkFkbWluaXN0cmF0b3IiLCJlbWFpbCI6Im11ZGl0Lmt1bWFyQG1vYmlsZXByb2dyYW1taW5nLmNvbSJ9LCJpYXQiOjE1OTY3MzgzMjQsImV4cCI6MzE5MzQ4MDI0OH0.7Elcc7IJqeCsmmKFUPy1AXnT_f0Zoeb6yzKkL5eOaWY',
             },
         }).then((result) => {
             result.json().then((resp) => {
 
                 alert("you can manage merchant details here");
 
             })
         })*/

    showManageMerchant = (item) => {
        this.setState({ activeScreen: 2, selectedItem: item });

    }
    onBack = () => {

        this.setState({ activeScreen: 1 });
    }
    exportPDF = () => {

        if (!this.state.restaurants) return
        const unit = "pt";
        const size = "A4";
        const orientation = "landscape";

        const marginLeft = 30;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(13);

        const title = "Report";

        let lis=[]
        for(var k in this.state.restaurants[0])
        {

            lis.push(k);
        }

        console.log(lis)
        const headers = [["Merchant Name","Email","Contact Person Name","Designation","Contact Number","Date of Joining"]];

        const data = this.state.restaurants.map(elt => [elt.restaurant_name, elt.email, elt.contact_person_name, elt.designation, elt.mobile, elt.create_date,]);

        let content = {
            startY: 50,
            head: headers,
            body: data
        };

        doc.text(title, marginLeft, 30);
        doc.autoTable(content);
        doc.save("Merchants.pdf")
    }



    handleDownload=()=> {
       
       
        const sheet = "Sheet";
        const filename = `MerchantsExcel.xls`;
    
        const uri = 'data:application/vnd.ms-excel;base64,';
        const template =
          '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-mic' +
          'rosoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta cha' +
          'rset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:Exce' +
          'lWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/>' +
          '</x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></' +
          'xml><![endif]--></head><body>{table}</body></html>';
    
        const context = {
          worksheet: sheet || 'Worksheet',
          table:this.state.restaurants,
        };
    
        // If IE11
        if (window.navigator.msSaveOrOpenBlob) {
          const fileData = [
            `${'<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-mic' + 'rosoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta cha' + 'rset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:Exce' + 'lWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/>' + '</x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></' + 'xml><![endif]--></head><body>'}${this.state.restaurants}</body></html>`,
          ];
          const blobObject = new Blob(fileData);
          
         window.navigator.msSaveOrOpenBlob(blobObject, filename);
         
    
          return true;
        }
    
        const element = window.document.createElement('a');
        element.href =
          uri +
          AllMerchantsFragment.base64(
            AllMerchantsFragment.format(template, context),
          );
        element.download = filename;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    
        return true;
      }
      static base64(s) {
        return window.btoa(unescape(encodeURIComponent(s)));
      }
    
      static format(s, c) {
        return s.replace(/{(\w+)}/g, (m, p) => c[p]);
      }

    render() {
        const { error, restaurants } = this.state;
        console.log(this.state.index, "--------------", this.state.active);
        if (this.state.activeScreen === 1) {
            return (
                <div className="AllMerchantsMain">
                    <div className="Merch">
                        <div className='allMemberHeader'>
                            <h3>All Merchant List</h3>
                            <div className='allMemberHeaderRightContent'>

                                <input className='searchInput' onChange={(e) => { this.searchMenbers(e.target.value) }} value={this.state.search} placeholder="Search By Name" />
                                


                            <button className="exportButton" onClick={() => { document.getElementById("excelButton").click() }} >Excel</button>


<button className="exportButton" onClick={() => { this.exportPDF() }} >PDF</button>


<ReactHTMLTableToExcel  
className="excelhide"  
id='excelButton'
table="merchants"  
filename="merchants_Excel"  
sheet="Sheet"  
buttonText="EXCEL" />

                                {/* <button className="exportButton" onClick={() => { this.exportPDF() }} >Export</button> */}


                            </div>
                        
                        
                        </div>

                        <Table id='merchants' className='merchantsView' hidden>
                        <thead>
                            <tr>
                               
                                <th>Merchant Name</th>
                                <th>Email </th>
                                <th>Contact Person Name</th>
                                <th>Designation</th>
                                <th>Contact Number</th>
                                <th>Date of Joining</th>
                            </tr>
                        </thead>
                        <tbody className="tableBody">
                            {
                                this.state.restaurants ?
                                    this.state.restaurants.map((item, i) =>


                                        <tr>
                                            <td>{item.restaurant_name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.contact_person_name}</td>
                                            <td>{item.designation}</td>
                                            <td>{item.mobile}</td>
                                            <td>{item.create_date}</td>
                                        </tr>
                                    )
                                    :
                                    null
                            }
                        </tbody>
                    </Table>

                        <div className="dataTable">
                            {/* <h4>All Merchants</h4> */}
                            {
                                this.state.restaurants ?
                                    this.state.restaurants.filter((item, i) => {
                                        if (item.restaurant_name.toLowerCase().startsWith(this.state.search.toLowerCase())) {
                                            return true;
                                        }
                                        else {
                                            return false;
                                        }
                                    }).map((item, i) =>

                                        <div className="flex-container" keys={i}>
                                            <div className=''><img src={item.restaurant_images[0]} className="image" alt="rest" /></div>
                                            <div className="rest">
                                                <p className="restName">{item.restaurant_name}</p>
                                                <p className="restPara">{item.information}</p>
                                                {/*<p className="restPara">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>*/}
                                            </div>
                                            <div className='manageDiv'>
                                            <p className="">Approved On:{item.account_approved_date} </p>
<div className='box'>
 <ToggleButton
  inactiveLabel={''}
  activeLabel={''}
  colors={{
    activeThumb: {
      base: 'rgb(250,250,250)',
    },
    inactiveThumb: {
      base: 'rgb(62,130,247)',
    },
    active: {
      base: 'green',
      hover: 'green',
    },
    inactive: {
      base: 'blue',
      hover: 'red',
    }
  }}

  thumbIcon={<p className='iconthumb'>✓</p>}

  trackStyle={styles.trackStyle}
  thumbStyle={styles.thumbStyle}
  thumbAnimateRange={[-8, 36]}
  animateThumbStyleHover={(n) => {
    return {
      boxShadow: `0 0 ${2 + 4*n}px rgba(0,0,0,.16),0 ${2 + 3*n}px ${4 + 8*n}px rgba(0,0,0,.32)`,
    }}}
  value={item.account_status==1?true:false}
  onToggle={(value) => {
    if(item.account_status===1)
    {
        item.account_status=3
        var lis=this.state.restaurants;
        lis[i].account_status=3;
        this.setState({restaurants:lis})

        this.handleClick(item.id,'3')
    
    }
    else
    {
        item.account_status=1

        var lis=this.state.restaurants;
        lis[i].account_status=1;
        this.setState({restaurants:lis})
     this.handleClick(item.id,'1')

    }

  }} />
                                                <img className='icon' src={require('../Images/edit2.png')} onClick={() => { this.showManageMerchant(item) }} className='editIcon' />
                                                </div>
                                            </div>
                                            
                                            {/* <p className="fixeddate">Approved On: {item.account_approved_date} </p> */}
                                        </div>
                                    )
                                    :
                                    null
                            }
                        </div>
                    </div>
                </div >

            );

        }
        else {
            return (

                <ManageMerchantFragment back={this.onBack} id={this.state.selectedItem.id} />
            )

        }
    }

}
export default AllMerchantsFragment