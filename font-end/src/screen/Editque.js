import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import CloseButton from 'react-bootstrap/CloseButton'
import {
        useParams
} from "react-router-dom";

export default function Editque() {
        const [editQuestion, setEditQuestion] = useState()
        const [questionList, setQuestionList] = useState()
        const [isAddQuestion, setIsAddQuestion] = useState(false)
        let { soqId } = useParams();

        useEffect(async () => {
                console.log(soqId)
                await fetch(`http://localhost:7050/admin/Editque/${soqId}`)
                        .then(res => {
                                return res.json()
                        })
                        .then(result => {
                                setQuestionList(result.setOfQuestion)
                                console.log(result)
                        })
        }, [])

        const onClickEditQuestion = (question) => {
                setEditQuestion(question._id);
        }
        const deleteQuestionHandler = async (question) => {
                await fetch("http://localhost:7050/admin/Question", {
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
                                return setQuestionList(res?.Question)
                        })
        }
        const updateQuestionHandler = async (e) => {
                console.log(e.target.QuestionTitle.value)
                await fetch("http://localhost:7050/admin/Question", {
                        headers: {
                                'Content-Type': 'application/json',
                        },
                        method: "PATCH",
                        body: JSON.stringify({
                                "questionData": {
                                        soqId: soqId,
                                        QuestionId: editQuestion,
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

        const submitQuestionHandler = async (e) => {
                e.preventDefault()
                await fetch("http://localhost:7050/admin/Question", {
                        headers: {
                                'Content-Type': 'application/json',
                        },
                        method: "POST",
                        body: JSON.stringify({
                                "soqId": soqId,
                                "questionData": {
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
                                // setSoqId(res.SetOfQuestionId)
                                return result.json()
                        })
                        .then(res => {
                                // console.log(res)
                                // console.log(res.Question.questions)
                                return setQuestionList(res?.Question)
                        })
                setIsAddQuestion(false)
        }

        return (

                <div>
                        {questionList && questionList?.questions?.map((question, index) => {
                                let content;
                                if (question._id === editQuestion) {
                                        content = <Form className='creques' onSubmit={updateQuestionHandler} key={index}>

                                                <input placeholder={question.questionstitle} name='QuestionTitle'></input>
                                                {question.choices.map((choice, index) => {
                                                        return <p key={choice.QuestionTitle} >
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


                                } else {
                                        content = <div className='groupcreate'><div className='questsave' key={index}>
                                                <p>ข้อที่...
                                                        <Form.Control id="disabledTextInput" className='inputquest' placeholder={question.questionstitle} disabled />
                                                </p>{
                                                        question.choices.map((choice, index) => {
                                                                return <div key={index}>
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
                                }
                                return content
                        })}

                        {isAddQuestion === false ? <div>
                                <button onClick={() => setIsAddQuestion(true)} className="btn btn-primary">new</button>
                        </div>
                                :
                                <div>
                                        <Form onSubmit={submitQuestionHandler} className='creques'>
                                                <div className="namequestion">
                                                        <p>คำถาม</p>
                                                        <input placeholder='กรอกคำถาม' className="form-control form-control-lg nameque" name='QuestionTitle'></input>
                                                </div>
                                                <div className="namequestion">
                                                        <p>ตัวเลือกที่1</p>
                                                        <input placeholder='ตัวเลือก1' className="form-control form-control-lg nameque" name='ChoiceTitle1'></input>
                                                </div>
                                                <div className="namequestion">
                                                        <p>ตัวเลือกที่2</p>
                                                        <input placeholder='ตัวเลือก2' className="form-control form-control-lg nameque" name='ChoiceTitle2'></input>
                                                </div>
                                                <div className="namequestion">
                                                        <p>ตัวเลือกที่3</p>
                                                        <input placeholder='ตัวเลือก3' className="form-control form-control-lg nameque" name='ChoiceTitle3'></input>
                                                </div>
                                                <div className="namequestion">
                                                        <p>ตัวเลือกที่4</p>
                                                        <input placeholder='ตัวเลือก4' className="form-control form-control-lg nameque" name='ChoiceTitle4'></input>
                                                </div>
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
                                        </Form>

                                       
                                </div>}
                </div>


        )
}