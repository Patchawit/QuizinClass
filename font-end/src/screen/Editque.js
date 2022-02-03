import React from 'react'
import Form from 'react-bootstrap/Form';
import CloseButton from 'react-bootstrap/CloseButton'

export default function Editque() {
    return (
        <div className='center'>
            <div className='group'>
                <p className='groupsub2'>
                    หมวดหมู่วิชา
                </p>
                <Form.Select className='formselect'>
                    <option>Default select</option>
                </Form.Select>
            </div>
            <div className="namequestion">
                <h3>ชื่อชุดคำถาม</h3>
                <input className="form-control form-control-lg nameque" type="text" placeholder=""></input>
            </div>
            <div className="namequestion">
                <h3>ข้อที่ 1</h3>
                <input className="form-control form-control-lg nameque2" type="text" placeholder=""></input>
                <CloseButton aria-label="Hide" className="btnclose"/>
            </div>
            <div className="namequestion">
                <h3>ตัวเลือกที่ 1</h3>
                <input className="form-control form-control-lg nameque3" type="text" placeholder=""></input>
                <CloseButton aria-label="Hide" className="btnclose"/>
            </div>
            <button type="button" className="btn btn-warning btn-lg text-dark btnaddchoice">เพิ่มตัวเลือก</button>
            <button type="button" className="btn btn-warning btn-lg text-dark btnaddque">เพิ่มข้อ</button>
            <button type="button" className="btn btn-warning btn-lg text-dark btnsave">บันทึก</button>
        </div>

    )
}
