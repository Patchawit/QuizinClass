import React from 'react';
import Form from 'react-bootstrap/Form';
import BootstrapSwitchButton from 'react-bootstrap/Switch';
import Nav from 'react-bootstrap/Nav';


export default function Edit() {



  return (
    <div>
      <div className='group'>
        <p className='groupsub'>
          หมวดหมู่วิชา
        </p>
        <Form.Select className='formselect'>
          <option>Default select</option>
           
        </Form.Select>
       
        
      </div>
      
      <div className='groupquest'>
        <div className='quest'>
          <p>ชุดที่ 1 : ชื่อชุดคำถาม</p>
          <Nav.Link href="/editque"><button type="button" className="btn btn-warning btn-lg text-dark btnedit">แก้ไข</button></Nav.Link>
          <button type="button" className="btn btn-dark btn-lg text-light btndel">ลบ</button>
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
