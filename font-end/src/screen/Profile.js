import React from 'react'

export default function Profile() {
  return (
    <div>
      <h1 className="mb-6 text-5xl font-bold leading-tight uppercase text-center">
        ข้อมูลส่วนตัว
      </h1>
      <div className='center'>
        <div className='profile'>
          <img src="https://media.discordapp.net/attachments/695119707010891796/935944609610219540/iconfinder-send-4341325_120524_1.png" alt="" width="30%" height="70%" />
          <div className="info">
            <p>
              รหัสนักศึกษา :
            </p>
            <p>
              ชื่อ - นามสกุล :
            </p>
          </div>
        </div>
        <button type="button" className="btn btn-warning btn-lg text-white mt-5 btnmyscore">ตรวจสอบคะแนน</button>
      </div>
    </div>
  )
}