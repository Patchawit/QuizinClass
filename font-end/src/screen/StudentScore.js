/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { useAuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import * as loadingData from "../loadingData.json";


const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingData.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

export default function StudentScore() {

    const [allSubject, setAllSubject] = useState([])
    const [isLoading, setLoading] = useState(false)
    const { user, Authcookie } = useAuthContext();
    const [listOfSoq, setListOfSoq] = useState()

    useEffect(async () => {
        console.log(user.email)
        await fetch(`http://localhost:7050/admin/category/${user.email}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authcookie': Authcookie
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

    return (
        <div>
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
                  <Link to={`/ready/${soq._id}`}>
                    <button type="button" className="btn btn-warning btn-lg text-dark btnstart">ตรวจคำตอบ</button>
                  </Link>
                  </div>
                </div>
              </div>
              </FadeIn>
            })
          }
        </div>
      }
        </div>


    )
}