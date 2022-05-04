import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import BootstrapSwitchButton from 'react-bootstrap/Switch';
import Nav from 'react-bootstrap/Nav';
import * as loadingData from "../loadingData.json";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { useAuthContext } from '../context/AuthContext';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loadingData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};


export default function Edit() {
  const [allSubject, setAllSubject] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [listOfSoq, setListOfSoq] = useState()
  const {user, Authcookie} = useAuthContext();

  useEffect(async () => {
    await fetch(`http://localhost:7050/admin/category/${user.email}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authcookie':Authcookie   
    },
      method: "GET",
    })
      .then(res => {
        return res.json()
      }).then(result => {
        console.log(result)
        return setAllSubject(result.allSubject)
      })
  }, [])

  const dropdownChangeHandler = async (e) => {
    e.preventDefault();
    setLoading(true)
    await fetch(`http://localhost:7050/admin/SetOfQuestion/${user.email}/${e.target.value}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: "GET",
    })
      .then(res => { return res.json() })
      .then(result => {
        console.log(result.SetOfQuestion)
        setListOfSoq(result.SetOfQuestion)
        return console.log(result)
      })
    setLoading(false)

  }

  const clickCreateSoqHandler = () => {
    console.log("from clickCreateSoqHandler")
  }

  const deleteSoqHandler = async (soqId) => {
    console.log(soqId)
    setLoading(true)
    await fetch(`http://localhost:7050/admin/SetOfQuestion/${soqId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: "DELETE",
      body: JSON.stringify({
        "questionData": {
          soqId: soqId,
        }
      })
    })
      .then(res => { 
        return res.json() 
      })
      .then(result => {
        // return console.log(result)
        return setListOfSoq(result?.listOfSoq)
      })
    setLoading(false)
  }

  if (isLoading) {
    return <div>Loading ...</div>
  }

  return (
    <FadeIn>
      <div className='group'>
        <p className='groupsub'>
          หมวดหมู่วิชา
        </p>

        <Form.Select className='formselect' onChange={dropdownChangeHandler}>
          <option>เลือกวิชา</option>
          {allSubject?.map((subject, key) => {
            return <option value={subject._id} key={subject.subjecttitle}>{subject.subjecttitle}</option>
          })}
        </Form.Select>

        <a className='btn btn-light btncre' href="/create-soq" >สร้างชุดคำถาม</a>
      </div>

      {isLoading ? <FadeIn><Lottie options={defaultOptions} height={500} width={500} /></FadeIn>
        : <div>

      {
      listOfSoq?.map((soq, index) => {
        return <FadeIn><div className='groupquest container' key={index + soq.soqtitle}>
          <div className='quest row'>
          <div className='col-10'>
            <p>ชื่อชุดคำถาม : {soq.soqtitle}</p>
            </div>
            <div className='col-2'>
            <Link to={`/editque/${soq._id}`}>
              <button type="button" className="btn btn-warning btn-lg text-dark btnedit">
                แก้ไข
              </button>
            </Link>
            <button type="button" className="btn btn-dark btn-lg text-light btndel" onClick={() => deleteSoqHandler(soq._id)}>ลบ</button>
          </div>
          </div>
          <div className='datecreate'>
            <p>
              วันที่สร้าง : {soq.date}
            </p>
            <Form>
              <Form.Check
                type="switch"
                id="custom-switch"
                label=" แสดงคะแนน"
              />
            </Form>
          </div>
        </div>
        </FadeIn>
        
      })
      }

    </div>
    }
    </FadeIn>
  )
}
