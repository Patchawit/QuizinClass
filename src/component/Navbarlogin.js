import React from 'react';
import styled from "styled-components";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
const S = {};

S.CategoryText = styled.a`
    text-align: left;
  `

export default function Navbarlogin() {
    return (
        <Router>
            <div>
                <nav className="navbar navbar-expand navbar-light bg-light d-flex flex-row justify-content-center align-items-center">
                    
                    <S.CategoryText className="navbar-brand col-md-auto" href="#">Quiz in Class</S.CategoryText>
                    <S.CategoryText className="navbar-brand col-md-auto mt-5" href="#">เข้าสู่ระบบ</S.CategoryText>
                    
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </nav>
            </div>
        </Router>
    )
}
