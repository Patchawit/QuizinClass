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
  }, [])


  const onSoqChangeHandler = async (e) => {
    if (e.target.value === 'default') {
      return;
    }
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
        setStudentList(result)
      })
  }




  return (
    <div>
      <div className="scorehead">
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
          return <div className='answeruser groupcreate'>
            <h3>คำถาม : {question?.questionstitle}</h3>
            {question?.imgUrl === "images/1x1.png" ? <div></div> : <img src={`http://localhost:7050/` + question?.imgUrl} />}
            {question?.choices.map(choice => {
              return <div className='container'><div className='row'><div className='col-1'><p>ตัวเลือก:</p></div>
                <div className='col-2'>
                  {choice?.isCorrect == true ?
                    <h3 style={{ color: "green" }}>
                      {choice?.choiceTitle}
                    </h3> :
                    <h3 style={{ color: "red" }}>
                      {choice?.choiceTitle}
                    </h3>

                  }
                </div>

              </div></div>
            })}
            <div>
              {Studentlist && Studentlist?.users?.map((student) => {
                let content;
                const studentAnswer = student?.history?.filter(data => {
                  return data.soqid === soqId;
                })
                content = studentAnswer?.map((ans, index) => {
                  return ans.studentAns
                })

                content = content[0]?.map(data => {
                  return { Title: data?.ans?.choiceTitle, Correct: data?.ans?.isCorrect }
                })


                counter++
                
                if (content) {
                  if (content[counter]?.Correct === true) {
                    return <h2 style={{ color: "green" }}>คำตอบ : {content[counter]?.Title} ถูก</h2>
                  } else {
                    return <h2 style={{ color: "red" }}>คำตอบ : {content[counter]?.Title} ผิด</h2>
                  }
                }

              })}
            </div>

          </div>
        })}

      </div>


    </div>

  )
}