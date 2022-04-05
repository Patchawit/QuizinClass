import React from 'react'
import { useAuthContext } from '../context/AuthContext';

export default function Profile() {
  const { loginBy, studentid } = useAuthContext()
  return (

    <div>
      <h1 className="mb-6 text-5xl font-bold leading-tight uppercase text-center">
        ข้อมูลส่วนตัว
      </h1>
      <div className='center'>
        <div className='profile'>
          <img src="https://media.discordapp.net/attachments/867880540602368052/936140224852021258/itlogo.png" alt="" width="25%" height="70%" />
          <div className="info">
            <p>
              รหัสนักศึกษา : {studentid.substring(0,8)}
            </p>
            <p>
              ชื่อ - นามสกุล : {loginBy}
            </p>
          </div>
        </div>
        <button type="button" className="btn btn-warning btn-lg text-white mt-5 btnmyscore">ตรวจสอบคะแนน</button>
      </div>
    </div>
  )
}