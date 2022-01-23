import React, { useState } from 'react';
import Navbarlogin from '../component/Navbarlogin'
import '../App.css'
import GoogleLogin from 'react-google-login';

const clientId = "680137363543-qsg5innvjcd89cc81n7oku0jqljs7iqt.apps.googleusercontent.com";

export default function LOGIN(props) {

  const onSuccess = (res) => {
    console.log('[Login Success] currentUser:', res.profileObj);
    props.setIsLogin(true)
    props.setLoginBy(res.profileObj.name)
  }
  const onFailure = (res) => {
    console.log('[Login failed] res:', res);
  }

  return (
    // <GoogleLogin
    //   clientId="680137363543-qsg5innvjcd89cc81n7oku0jqljs7iqt.apps.googleusercontent.com"
    //   buttonText="Login"
    //   onSuccess={responseGoogle}
    //   onFailure={responseGoogle}
    //   cookiePolicy={'single_host_origin'}
    // />

    // <div>
    //   <Navbarlogin />
    //   <div className="login flex flex-col w-full justify-center text-center lg:text-left lg:w-2/3">
    //     <button className='btn btn-light rounded-pill p-3' onClick={() => { props.setIsLogin(true) }}>
    //       <img src="https://media.discordapp.net/attachments/695119707010891796/932949647360684063/kisspng-google-logo-google-search-google-images-g-suite-google-adwords-5b5695e501bbf6.0297111215324011250071.png?width=869&height=633" width="55" height="40" />
    //       <a>  Sign in with Google</a>
    //     </button>
    //   </div>
    // </div>

    <div>
      <Navbarlogin />
      <div className="login flex flex-col w-full justify-center text-center lg:text-left lg:w-2/3">
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
        />
      </div>
    </div>
  )
}
