import React from 'react';
import Form from 'react-bootstrap/Form';
import BootstrapSwitchButton from 'react-bootstrap/Switch';

export default function HomeScreen() {
  const clickCreateSoqHandler = () => {
    console.log("from clickCreateSoqHandler")
  }
  return (
    <div>
      <div className='group'>
        <p className='groupsub'>
          หมวดหมู่วิชา
        </p>
        <Form.Select className='formselect'>
          <option>Default select</option>
        </Form.Select>
        <a className='btn btn-primary' href="/create-soq" >สร้างชุดคำถาม</a>
      </div>
      <div className='groupquest'>
        <div className='quest'>
          <p>ชุดที่ 1 : ชื่อชุดคำถาม</p>
          <button type="button" className="btn btn-warning btn-lg text-dark btnstart">เริ่มทำ</button>
        </div>
        <div className='datecreate'>
          <p>
            วันที่สร้าง : 2/2/2022
          </p>
          <p>
            แสดงคะแนน
          </p>
          <BootstrapSwitchButton checked={true} size="xs" />
        </div>
      </div>
    </div>
  )
}
