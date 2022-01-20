import React,{useState}from 'react';
import Navbarlogin from '../component/Navbarlogin'
import '../App.css'

export default function LOGIN(props) {
    return (

        <div>
          <Navbarlogin/>
            <div className="login flex flex-col w-full justify-center text-center lg:text-left lg:w-2/3 ">
            <button className='btn btn-light rounded-pill border border-light  p-3 my-5 text-dark' onClick={() => {props.setIsLogin(true) }}><img src="https://media.discordapp.net/attachments/695119707010891796/932949647360684063/kisspng-google-logo-google-search-google-images-g-suite-google-adwords-5b5695e501bbf6.0297111215324011250071.png?width=869&height=633"  width="65" height="50" />
            <a>  Sign in with Google</a></button>
          {/* <h1 className="mb-6 text-5xl font-bold leading-tight uppercase ">
            
            เข้าสู่ระบบ
          </h1> */}
        </div>
        </div>
    )
}
