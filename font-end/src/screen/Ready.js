/* eslint-disable */
import React from 'react'
import QRCode from 'qrcode'
import { useEffect, useState } from 'react'
import {
  useParams
} from "react-router-dom";

import * as database from "firebase/database";
import { db } from "../firebase"
import Modal from "../component/ui/Modal";
import { useAuthContext } from '../context/AuthContext';


export default function Ready() {
  const [src, setSrc] = useState('');
  const [studentCount, setStudentCount] = useState(0);
  const {IsShowModal, onClickHiddenModal, onClickShowModal} = useAuthContext()
  const [datauser, setDatauser] = useState();
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
      setDatauser(data?.users)
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
    <div>
      {IsShowModal && <Modal onCloseModal={onClickHiddenModal} >
        <ui>
        {datauser.map(user => {
          return <li>{user}</li>
        })}
        </ui>
      </Modal>}
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
              <button type="button" className="btn btn-warning btn-lg text-white" onClick={onClickShowModal}>รายชื่อผู้ทำแบบทดสอบ</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}