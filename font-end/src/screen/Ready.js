/* eslint-disable */
import React from 'react'
import QRCode from 'qrcode'
import { useEffect, useState } from 'react'
import {
  useParams
} from "react-router-dom";

import * as database from "firebase/database";
import { db } from "../firebase"

export default function Ready() {
  const [src, setSrc] = useState('');
  const [studentCount, setStudentCount] = useState(0);

  let { soqId } = useParams();
  console.log(soqId)
  const text = `http://localhost:5000/Lobby/${soqId}`

  useEffect(() => {
    QRCode.toDataURL(text).then((setSrc));
    const ref = database.ref(db, `lobby/${soqId}`)
    database.onValue(ref, (snapshot) => {
      const data = snapshot.val();
      // console.log("->",data?.users.length);
      setStudentCount(data?.users.length)
      console.log(data?.users)
  });
  }, []);

  const handleStart = async () => {
    // Call API CreateRoom
    await fetch(`http://localhost:7050/admin/CreateRoom/${soqId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: "POST",
      body: JSON.stringify({})
    })
      .then(res => console.log(res.json()))
  }

  return (
    <div className='center'>
      <div className='container'>
        <div className='row'>
          <div className='col-6 qrcodestyle'>
            <div className='qrcode'>
              <img src={src} />
            </div>
            <p>จำนวนคน : {studentCount}</p>
          </div>
          <div className='col-6 qrcodestart'>
            <div className='starting'>
              <button type="button" className="btn btn-warning btn-lg text-white" onClick={() => handleStart()}>เริ่มทำแบบทดสอบ</button>
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