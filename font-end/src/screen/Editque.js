import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import CloseButton from 'react-bootstrap/CloseButton'
import {
        useParams
} from "react-router-dom";

export default function Editque() {
        const [EditQuestion, setEditQuestion] = useState()
        const [questionList, setQuestionList] = useState()
        const [isEditQuestion, setIsEditQuestion] = useState(false)
        let { soqId } = useParams();
        const onClickEditQuestion = (question) => {
                setEditQuestion(question._id);
        }
        const deleteQuestionHandler = async (question) => {
                await fetch("http://localhost:5000/admin/Question", {
                        headers: {
                                'Content-Type': 'application/json',
                        },
                        method: "DELETE",
                        body: JSON.stringify({
                                "questionData": {
                                        soqId: soqId,
                                        QuestionId: question._id,
                                }
                        })
                })
                        .then(result => {
                                return result.json()
                        })
                        .then(res => {
                                console.log(res)
                                return setQuestionList(res.Question.questions)
                        })
        }
        const updateQuestionHandler = async (e) => {
                e.preventDefault()
                console.log(e.target.QuestionTitle.value)
                await fetch("http://localhost:5000/admin/Question", {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: "PATCH",
                    body: JSON.stringify({
                        "questionData": {
                            soqId: soqId,
                            QuestionId: EditQuestion,
                            QuestionTitle: e.target.QuestionTitle.value,
                            Choice: [
                                {
                                    "choiceTitle": e.target.ChoiceTitle1.value,
                                    "choiceImg": "ตัวเลือก1"
                                },
                                {
                                    "choiceTitle": e.target.ChoiceTitle2.value,
                                    "choiceImg": "ตัวเลือก1"
                                },
                                {
                                    "choiceTitle": e.target.ChoiceTitle3.value,
                                    "choiceImg": "ตัวเลือก1"
                                },
                                {
                                    "choiceTitle": e.target.ChoiceTitle4.value,
                                    "choiceImg": "ตัวเลือก1"
                                }
                            ],
                            ans: e.target.ans.value
                        }
                    })
                })
                    .then(result => {
                        return result.json()
                    })
                    .then(res => {
                        console.log(res)
                        return setQuestionList(res.Question.questions)
                    })
                setEditQuestion(false)
        
            }
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
        console.log(EditQuestion)
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
                        {isEditQuestion == false ?
                                <div>
                                        {
                                                EditQuestion?.questions?.map(question => {
                                                        return <div className='groupcreate'><div className='questsave'>
                                                                <p>ข้อที่...
                                                                        <Form.Control id="disabledTextInput" className='inputquest' placeholder={question.questionstitle} disabled />
                                                                </p>{
                                                                        question.choices.map(choice => {
                                                                                return <div>
                                                                                        <p>ตัวเลือกที่...
                                                                                                <Form.Control id="disabledTextInput" className='inputques' placeholder={choice.choiceTitle} disabled />
                                                                                        </p>
                                                                                </div>
                                                                        })

                                                                } <p>คำตอบ
                                                                        <Form.Control id="disabledTextInput" className='inputquest' placeholder={question.ans} disabled />
                                                                </p>
                                                                <button type="button" className="btn btn-warning btn-lg text-dark"
                                                                        onClick={() => { onClickEditQuestion(question) }}>edit</button>
                                                                <button type="button" className="btn btn-danger btn-lg text-dark"
                                                                        onClick={() => { deleteQuestionHandler(question) }}>delete</button>
                                                        </div></div>
                                                })
                                        }
                                </div>

                                : <div>
                                        {questionList?.map(question => {
                                                let content;
                                                if (question._id === EditQuestion) {

                                                        content = <div>
                                                                <Form className='creques' onSubmit={updateQuestionHandler}>

                                                                        <input placeholder={question.questionstitle} name='QuestionTitle'></input>
                                                                        {question.choices.map((choice, index) => {
                                                                                return <p key={choice.QuestionTitle}>
                                                                                        <input placeholder={'ตัวเลือก' + (index + 1)}
                                                                                                placeholder={choice.choiceTitle}
                                                                                                name={'ChoiceTitle' + (index + 1)}></input>
                                                                                </p>
                                                                        })}
                                                                        <div className="namequestion">
                                                                                <p>ข้อถูก</p>
                                                                                <Form.Select className='formsel' name="ans">
                                                                                        <option>Default select</option>
                                                                                        <option value={1}>1</option>
                                                                                        <option value={2}>2</option>
                                                                                        <option value={3}>3</option>
                                                                                        <option value={4}>4</option>
                                                                                </Form.Select>
                                                                        </div>

                                                                        <button type="submit" className="btn btn-light btn-lg text-dark">Save</button>
                                                                        <button className="btn btn-light btn-lg text-dark" onClick={() => { setEditQuestion(false) }}>cancel</button>
                                                                </Form>

                                                        </div>
                                                }
                                        })
                                        }
                                </div>

                        }

                </div >

        )
}