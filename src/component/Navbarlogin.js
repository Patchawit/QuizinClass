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
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>
    )
}
