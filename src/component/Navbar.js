import React from 'react';
import "./Navbar.css";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export default function navbar() {
    return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">Quiz in Class</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link to='/'>ชุดคำถาม</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/createquiz'>สร้างคำถาม</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/editquiz'>แก้ไขชุดคำถาม</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/scorequiz'>ผลคะแนน</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Dropdown
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="#">Kuy</a>
                                    <a className="dropdown-item" href="#">Rai</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#">I HERE</a>
                                </div>
                            </li>

                        </ul>
                        

                    </div>
                </nav>
            </div>
    )
}
