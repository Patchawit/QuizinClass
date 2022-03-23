import React, { useState } from 'react';
import Navbarlogin from '../component/Navbarlogin'
import '../App.css'
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';

const clientId = "680137363543-qsg5innvjcd89cc81n7oku0jqljs7iqt.apps.googleusercontent.com";

export default function LOGIN(props) {
  const { loginHandler } = useAuthContext();


  return (

    <div>
      <Navbarlogin />
      <div className="login flex flex-col w-full justify-center text-center lg:text-left lg:w-2/3">
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={loginHandler}
          onFailure={err => console.log(err)}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
        />
      </div>
    </div>
  )
}
