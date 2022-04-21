import React from 'react'


export default function Ready() {
    return (
    <div className='center'>
      <div className='container'>
        <div className='row'>
          <div className='col-6 qrcodestyle'>
            <div className='qrcode'>
            </div>
            <p>จำนวนคน : 0</p>
          </div>
          <div className='col-6 qrcodestart'>
            <div className='starting'> 
              <button type="button" className="btn btn-warning btn-lg text-white">เริ่มทำแบบทดสอบ</button>
            </div>
            <div className='namestart'>
              <button type="button" className="btn btn-warning btn-lg text-white">รายชื่อผู้ทำแบบทดสอบ</button>    
            </div>        
          </div>
        </div>
      </div>
    </div>
    )
  }