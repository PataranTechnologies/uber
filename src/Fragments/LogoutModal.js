
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./LogoutFragment.css";
import { useEffect, useState } from 'react';

export function LogoutModel(props) {
   
    return (
  
        <Modal
        className='modal-dialog'
          show={props.show}
          onHide={()=>props.onNoClick()}
        >
          <Modal.Header >
            <Modal.Title >Logout Confirmation</Modal.Title>
             <div className='header'>
             <button type='button' onClick={()=>{props.onNoClick()}} className='headerButton' >X</button>
               </div>
          </Modal.Header>
          <Modal.Body>
           <h6>Are you sure,do you want to Logout.</h6>
          </Modal.Body>
          <Modal.Footer className='buttonFooter' >

          <Button className='button'  onClick={()=>{props.onYesClick()}}>Ok </Button>

            <Button className='button'  onClick={()=>{props.onNoClick()}}>
              Cancel
            </Button>
           
          </Modal.Footer>
        </Modal>
   
    );
  }

export default LogoutModel;