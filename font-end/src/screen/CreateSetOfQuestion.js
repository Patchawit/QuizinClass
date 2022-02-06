import { Dropdown } from 'bootstrap';
import React, { useState, useEffect } from 'react';
import BootstrapSwitchButton from 'react-bootstrap/Switch';
import Form from 'react-bootstrap/Form';

export default function CreateSetOfQuestion() {
    const [soqTitle, setSoqTitle] = useState('');
    const [soq, setSoq] = useState('');
    const [isEdit, setEdit] = useState(false)
    const [isEditQuestion, setIsEditQuestion] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [allSubject, setAllSubject] = useState([])
    const [questionData, setQuestionData] = useState({})

    const [questionList, setQuestionList] = useState()


    const dropdownChangeHandler = async (e) => {
        e.preventDefault();
        setLoading(true)
        await fetch("http://localhost:5000/admin/SetOfQuestion", {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "PATCH",
            body: JSON.stringify({
                "subjectId": e.target.value,
                "soq": soq
            })
        })
            .then(res => { return res.json() })
            .then(result => {
                return console.log(result)
            })

        setIsEditQuestion(true)
        setLoading(false)

    }



    useEffect(async () => {
        setLoading(true)
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
        setLoading(false)

    }, [isEdit])


    const clickNextHandler = async () => {
        setLoading(true)
        setEdit(true)
        await fetch("http://localhost:5000/admin/SetOfQuestion", {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify({ "SetOfQuestionTitle": soqTitle })
        })
            .then(result => {
                // setSoqId(res.SetOfQuestionId)
                return result.json()
            })
            .then(res => {
                console.log(res)
                return setSoq(res.SetOfQuestion)
            })
        setLoading(false)
    }



    const submitQuestionHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        await fetch("http://localhost:5000/admin/Question", {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify({
                "soqId": soq._id,
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
                    ]
                }
            })
        })
            .then(result => {
                // setSoqId(res.SetOfQuestionId)
                return result.json()
            })
            .then(res => {
                console.log(res.Question.questions)
                return setQuestionList(res.Question.questions)
            })
        setLoading(false)

        // setDummyQuestionList(previousState => {
        //     return [...previousState, {
        //         QuestionTitle: e.target.QuestionTitle.value,
        //         Choice: {
        //             Choice1: {
        //                 ChoiceTitle: e.target.ChoiceTitle1.value,
        //                 ChoiceImg: ""
        //             },
        //             Choice2: {
        //                 ChoiceTitle: e.target.ChoiceTitle2.value,
        //                 ChoiceImg: ""
        //             },
        //             Choice3: {
        //                 ChoiceTitle: e.target.ChoiceTitle3.value,
        //                 ChoiceImg: ""
        //             },
        //             Choice4: {
        //                 ChoiceTitle: e.target.ChoiceTitle4.value,
        //                 ChoiceImg: ""
        //             }
        //         }
        //     }]
        // })

        // console.log(DummyQuestionList)



    }

    const soqTitleChangeHandler = (e) => {
        setSoqTitle(e.target.value)
    }



    if (isLoading) {
        return <div>Loading ...</div>
    }

    return <div>


        {isEdit == false ?
            <div className='nameset'>
                <p>ชื่อชุดคำถาม</p>
                <input type="text" value={soqTitle} onChange={soqTitleChangeHandler} />
                <button className='btn btn-light' onClick={clickNextHandler}>ต่อไป</button>
            </div>

            : isEditQuestion == true ?
                <div>
                    <div>
                        {questionList?.map(question => {
                            return <div key={question.title}><div className='group'>
                                <p className='groupsub'>
                                    {question.questionstitle}
                                </p>
                                {question.choices.map(choice => {
                                    return <p className='groupsub' key={choice.choiceTitle}>
                                        {choice.choiceTitle}
                                    </p>
                                })}


                            </div>

                            </div>
                        })}
                    </div>
                    <div>
                        <Form onSubmit={submitQuestionHandler} >
                            <input placeholder='กรอกคำถาม' name='QuestionTitle'></input>
                            <input placeholder='ตัวเลือก1' name='ChoiceTitle1'></input>
                            <input placeholder='ตัวเลือก2' name='ChoiceTitle2'></input>
                            <input placeholder='ตัวเลือก3' name='ChoiceTitle3'></input>
                            <input placeholder='ตัวเลือก4' name='ChoiceTitle4'></input>
                            <button type="submit">Save</button>
                        </Form>
                    </div>

                </div>
                :
                <div className='nameset'>
                <p>หมวดหมู่วิชา</p>
                <Form.Select className='formsel' onChange={dropdownChangeHandler}>
                    <option>Default select</option>
                    {allSubject?.map((subject, key) => {
                        return <option value={subject._id} key={subject.subjecttitle}>{subject.subjecttitle}</option>
                    })}
                </Form.Select>
                </div>
        }

    </div>;
}
