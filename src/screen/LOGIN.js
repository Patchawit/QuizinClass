import React,{useState}from 'react';
import Navbarlogin from '../component/Navbarlogin'

export default function LOGIN(props) {
    return (

        <div>
          <Navbarlogin/>
            <div className="flex flex-col w-full justify-center text-center lg:text-left lg:w-2/3 ">
            <button className='btn btn-light p-3 mt-5 text-dark' onClick={() => {props.setIsLogin(true) }}>😅 Sign in with Google</button>
          <h1 className="mb-6 text-5xl font-bold leading-tight uppercase ">
            เข้าสู่ระบบ
          </h1>
        </div>
        </div>
    )
}
