/* eslint-disable */
import React from 'react'
import QRCode from 'qrcode'
import { useEffect, useState } from 'react'
import {
  useParams
} from "react-router-dom";


export default function Ready() {
    const [src, setSrc] = useState('');
    let { soqId } = useParams();
    console.log(soqId)
    const text = `http://localhost:5000/Lobby/${soqId}`
    useEffect(() => {
      QRCode.toDataURL(text).then((setSrc));
    }, []);

    return (
    <div className='center'>
      <div className='container'>
        <div className='row'>
          <div className='col-6 qrcodestyle'>
            <div className='qrcode'>
              <img src={src}/>
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