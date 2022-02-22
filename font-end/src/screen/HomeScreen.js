import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import BootstrapSwitchButton from 'react-bootstrap/Switch';
import * as loadingData from "../loadingData.json";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import { Link } from 'react-router-dom';


const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loadingData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

export default function HomeScreen() {
  const [allSubject, setAllSubject] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [listOfSoq, setListOfSoq] = useState()

  useEffect(async () => {

    await fetch("http://localhost:5000/admin/category", {
      headers: {
        'Content-Type': 'application/json',
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
    await fetch(`http://localhost:5000/admin/SetOfQuestion/${e.target.value}`, {
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

              return <FadeIn><div className='groupquest' key={index + soq.soqtitle}>
                <div className='quest'>
                  <p>ชื่อชุดคำถาม : {soq.soqtitle}</p> 
                  <Link to={`/exercise/${soq._id}`}>
                  <button type="button" className="btn btn-warning btn-lg text-dark btnstart">เริ่มทำ</button>
                </Link>
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
              </FadeIn>
            })
          }
        </div>
      }

    </FadeIn >
  )
}
