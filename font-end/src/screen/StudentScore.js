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

  let counter = -1;
  const [isLoading, setLoading] = useState(false)
  const { user, Authcookie } = useAuthContext();
  const [allSubject, setAllSubject] = useState([])
  const [listOfSoq, setListOfSoq] = useState()
  const [Studentlist, setStudentList] = useState()
  const [soqId, setSoqId] = useState()
  const [soq, setSoq] = useState()
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

  const onSubjectChangeHandler = async (e) => {
    e.preventDefault();
    console.log(user)
    if (e.target.value !== "default") {
      await fetch(`http://localhost:7050/admin/GetEverDoSoq/${user.email}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: "GET",
      })
        .then(res => { return res.json() })
        .then(result => {
          console.log(result.listOfSoq)
          // const filteredSoq = result.SetOfQuestion.filter(soq)
          setListOfSoq(result.listOfSoq)
          return console.log(result.listOfSoq)
        })
    }
  }


  // const onSubjectChangeHandler = async (e) => {
  //   e.preventDefault();
  //   if (e.target.value !== "default") {
  //     await fetch(`http://localhost:7050/admin/SetOfQuestion/${user.email}/${e.target.value}`, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       method: "GET",
  //     })
  //       .then(res => { return res.json() })
  //       .then(result => {
  //         console.log(result.SetOfQuestion)
  //         // const filteredSoq = result.SetOfQuestion.filter(soq)
  //         setListOfSoq(result.SetOfQuestion)
  //         return console.log(result)
  //       })
  //   }
  // }

  const onSoqChangeHandler = async (e) => {
    setSoqId(e.target.value)
    counter = -1
    await fetch(`http://localhost:7050/admin/Editque/${e.target.value}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: "GET",
    })
      .then(res => { return res.json() })
      .then(result => {
        console.log(result.setOfQuestion)
        setSoq(result.setOfQuestion)
      })

    await fetch(`http://localhost:7050/admin/Score/${e.target.value}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: "GET",
    })
      .then(res => { return res.json() })
      .then(result => {
        console.log(result)
        setStudentList(result)
      })
  }




  return (
    <div>
      <div className="scorehead">
        <p className='groupsub2'>
          หมวดหมู่วิชา
        </p>
        <Form.Select className='formselect' onChange={onSubjectChangeHandler}>
          <option value="default">เลือกวิชา</option>
          {allSubject?.map((subject) => {
            return <option value={subject._id} key={subject.subjecttitle}>{subject.subjecttitle}</option>
          })}

        </Form.Select>
        <p className='groupsub2'>
          ชุดคำถาม
        </p>
        <Form.Select className='formselect' onChange={onSoqChangeHandler}>
          <option value="default">เลือกคำถาม</option>
          {listOfSoq?.map((soq) => {
            console.log(soq.soqtitle)
            return <option value={soq._id} key={soq.soqtitle}>{soq.soqtitle}</option>
          })}

        </Form.Select>
        {/* <h3>ค้นหา</h3>
                <input className="form-control form-control-md search" type="text" placeholder=""></input> */}

      </div>
      <div>
        {soq && soq.questions.map(question => {
          return <div>
            <h2>Title : {question.questionstitle}</h2>
            {question.choices.map(choice => {
              return <div>
                {choice.isCorrect == true ?
                  <h3 style={{ color: "green" }}>
                    {choice.choiceTitle}
                  </h3> :
                  <h3 style={{ color: "red" }}>
                    {choice.choiceTitle}
                  </h3>

                }

              </div>
            })}
            <div>
              {Studentlist && Studentlist?.users?.map((student) => {
                const studentAnswer = student?.history.filter(data => {
                  return data.soqid === soqId;
                })
                let content = studentAnswer.map((ans, index) => {
                  return ans.studentAns
                })
                content = content[0].map(data => {
                  return { Title: data.ans.choiceTitle, Correct: data.ans.isCorrect }
                })
                counter++
                // return (content[counter])
                if (content[counter].Correct === true) {
                  return <h1 style={{ color: "green" }}>User ans : {content[counter].Title} ถูก</h1>
                } else {
                  return <h1 style={{ color: "red" }}>User ans : {content[counter].Title} ผิด</h1>
                }





              })}
            </div>

          </div>
        })}

      </div>


    </div>

  )
}