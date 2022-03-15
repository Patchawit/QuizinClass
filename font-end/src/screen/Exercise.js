import { Form } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import {
        useParams
} from "react-router-dom";

export default function Exercise() {
        const [EditQuestion, setEditQuestion] = useState()
        let { soqId } = useParams();
        useEffect(async () => {

                console.log(soqId)
                await fetch(`http://localhost:5000/admin/Editque/${soqId}`)
                        .then(res => {
                                return res.json()
                        })
                        .then(result => {
                                setEditQuestion(result.setOfQuestion)
                                console.log(result)
                        })
        }, [])
        return (
                <div className='breakout'>
                        <div className='left'>
                                <div className='headleft'>
                                        {
                                                EditQuestion?.soqtitle
                                                // EditQuestion && EditQuestion?.map((setofQuestion) => {
                                                //         return<div>{setofQuestion.soqtitle}</div>
                                                // })
                                        }
                                </div>
                                {
                                        EditQuestion?.questions?.map(question => {
                                                return <div className='questleft'><div className='questsave2'>
                                                        <p className='numquest'>ข้อที่...
                                                                {question.questionstitle}
                                                        </p>{
                                                                question.choices.map(choice => {
                                                                        return <div className='namequestion'>
                                                                                <p>ตัวเลือกที่...
                                                                                        <Form>
                                                                                                {['checkbox'].map((type) => (
                                                                                                        <div className="mb-3">
                                                                                                                <Form.Check
                                                                                                                        label={choice.choiceTitle}
                                                                                                                        name="group1"
                                                                                                                        type={type}
                                                                                                                />
                                                                                                        </div>
                                                                                                ))}
                                                                                        </Form>
                                                                                </p>
                                                                        </div>
                                                                })

                                                        } <button type="button" className="btn btn-warning btn-lg text-dark ">ต่อไป</button>

                                                </div></div>
                                        })
                                }
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