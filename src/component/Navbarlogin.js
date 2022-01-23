import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import './Navbar.css';

export default function Navbarlogin() {
    return (
            <div>
                <Navbar bg="light" className='bar'> 
                        <Navbar.Brand className='bar'><h5>Quiz  <font color="#FFAD32"> in </font> Class</h5></Navbar.Brand>
                        <Navbar.Brand className='bar2 text-warning '><h2><strong>เข้าสู่ระบบ</strong></h2></Navbar.Brand>
                </Navbar>               
            </div>
    )
}
