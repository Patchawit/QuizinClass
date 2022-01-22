import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import './Navbar.css';

export default function Navbarlogin() {
    return (
            <div>
                <Navbar bg="light" className='bar'> 
                        <Navbar.Brand className='bar'>Quiz in Class</Navbar.Brand>
                        <Navbar.Brand className='bar2'>เข้าสู่ระบบ</Navbar.Brand>
                </Navbar>               
            </div>
    )
}
