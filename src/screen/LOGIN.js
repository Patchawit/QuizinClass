import React,{useState}from 'react';
import Navbarlogin from '../component/Navbarlogin'

export default function LOGIN(props) {
    return (

        <div>
          <Navbarlogin/>
          <button className='btn btn-success' onClick={() => {props.setIsLogin(true) }}>เข้าสู่ระบบ</button>
            <div className="flex flex-col w-full justify-center text-center lg:text-left lg:w-2/3">
          <h1 className="mb-6 text-5xl font-bold leading-tight uppercase">
            เข้าสู่ระบบ
          </h1>
        </div>
        </div>
    )
}
