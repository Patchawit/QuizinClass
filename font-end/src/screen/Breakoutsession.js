import React from 'react'

export default function Breakoutsession() {
  return (
    <div className='breakout'>
      <div className='left'>
        <div className='headleft'>
          <h3>ชื่อชุดคำถาม</h3>
        </div>
        <div className='questleft'>
          <div className="namequestion">
                <h3>ข้อที่ 1</h3>
                <input className="form-control form-control-lg nameque3" type="text" placeholder=""></input>
          </div>
          <div className="namequestion">
                <h3>1</h3>
                <input className="form-control form-control-lg nameque2" type="text" placeholder=""></input>
          </div>
          <div className="namequestion">
                <h3>2</h3>
                <input className="form-control form-control-lg nameque2" type="text" placeholder=""></input>
          </div>
          <div className="namequestion">
                <h3>3</h3>
                <input className="form-control form-control-lg nameque2" type="text" placeholder=""></input>
          </div>
          <div className="namequestion">
                <h3>4</h3>
                <input className="form-control form-control-lg nameque2" type="text" placeholder=""></input>
          </div>
          <button type="button" className="btn btn-warning btn-lg text-dark btnnext">ต่อไป</button>
        </div>
      </div>
      <div className='right'>
        <div className='righthead'>
        <h3>61000000</h3>
        <h3>61000000</h3>
        </div>
        <input className="form-control form-control-lg chat" type="text" placeholder=""></input>
      </div>
    </div>
  )
}