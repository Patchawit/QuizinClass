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
                <div>
                        <div className='center qtitle'>
                                {
                                        EditQuestion?.soqtitle
                                        // EditQuestion && EditQuestion?.map((setofQuestion) => {
                                        //         return<div>{setofQuestion.soqtitle}</div>
                                        // })
                                }
                        </div>
                        {
                                EditQuestion?.questions?.map(question => {
                                        return <div className='groupcreate'><div className='questsave'>
                                                <p>ข้อที่...
                                                        {question.questionstitle}
                                                </p>{
                                                        question.choices.map(choice => {
                                                                return <div>
                                                                        <p>ตัวเลือกที่...
                                                                                <Form>
                                                                                        {['radio'].map((type) => (
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

                                                } <button type="button" className="btn btn-warning btn-lg text-dark">ต่อไป</button>

                                        </div></div>
                                })
                        }

                </div>

        )
}
