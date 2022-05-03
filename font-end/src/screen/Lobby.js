import React from 'react'
import {
  useParams
} from "react-router-dom";

export default function Lobby() {
  let { soqId } = useParams();
  return (
    <div className='lobby'>
      <h1 className="center">
        ชื่อชุดคำถาม {soqId}
      </h1>
      <div className='center'>
        <div className='ready container'>
          <div className='room row'>
            <p>จำนวนคน : 30</p>
          </div>
          <div className='room row'>
            <div className='col-2'>
              <p>61070099</p>
            </div>
            <div className='col-2'>
              <p>61070111</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}