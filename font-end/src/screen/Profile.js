import React from 'react'

export default function Profile() {
  return (
    <div className="flex flex-col w-full justify-center text-center lg:text-left lg:w-2/3">
      <h1 className="mb-6 text-5xl font-bold leading-tight uppercase">
        ข้อมูลส่วนตัว
      </h1>
      <div className='center'>
        <div className='profile'>
          <div>
            <img src="https://media.discordapp.net/attachments/695119707010891796/935944609610219540/iconfinder-send-4341325_120524_1.png" alt="" width="10%" height="10%" />
          </div>
          <p className="leading-normal text-xl mb-8">
            รหัสนักศึกษา :
          </p>
          <p className="leading-normal text-xl mb-8">
            ชื่อ - นามสกุล :
          </p>
        </div>
        <button type="button" class="btn btn-warning btn-lg text-white mt-5">ตรวจสอบคะแนน</button>
      </div>
    </div>
  )
}