import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import './Navbar.css';

export default function navbar() {
    return (
        <div>
            <Navbar bg="light" expand="lg" className='mainbar'>
                <Navbar.Brand href="#home" className='logo'>Quiz in Class</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home" className='subbar2'>ชุดคำถาม</Nav.Link>
                        <NavDropdown title="สร้างคำถาม" id="basic-nav-dropdown" className='subbar2'>
                            <NavDropdown.Item href="#action/3.1">สร้างวิชา</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">สร้างชุดคำถาม</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#link" className='subbar2'>แก้ไขคำถาม</Nav.Link>
                        <Nav.Link href="#link" className='subbar2'>ผลคะแนน</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text className='subbar3'>
                        เข้าสู่ระบบโดย : <a href="#login">admin</a>
                    </Navbar.Text>
                    <Button variant="dark">ออกจากระบบ</Button>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
