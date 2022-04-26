import { Dropdown } from 'bootstrap';
import React, { useState, useEffect } from 'react';
import BootstrapSwitchButton from 'react-bootstrap/Switch';
import * as loadingData from "../loadingData.json";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import Form from 'react-bootstrap/Form';
import { useAuthContext } from '../context/AuthContext';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingData.default,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};

export default function CreateSetOfQuestion() {
    const { user, Authcookie } = useAuthContext();
    const [soqTitle, setSoqTitle] = useState('');
    const [soq, setSoq] = useState('');
    const [isEdit, setEdit] = useState(false)
    const [editQuestion, setEditQuestion] = useState()
    const [isEditQuestion, setIsEditQuestion] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [allSubject, setAllSubject] = useState([])
    const [file, setFile] = useState({}) // ใช้เพื่อส่งไปที่ API
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null) //ใช้เพื่อภาพ Preview
    const [questionData, setQuestionData] = useState({})
    // const [editData, setEditData] = useState({})

    const [questionList, setQuestionList] = useState()

    const dropdownChangeHandler = async (e) => {
        e.preventDefault();
        setLoading(true)
        await fetch("http://localhost:7050/admin/SetOfQuestion", {
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
        setLoading(false)

    }, [isEdit])


    const clickNextHandler = async () => {
        setLoading(true)
        setEdit(true)
        await fetch("http://localhost:7050/admin/SetOfQuestion", {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify({
                "SetOfQuestionTitle": soqTitle,
                "user": user
            })
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
        const formData = new FormData();
        // console.log(file)
        formData.append("img", file)
        formData.append("soqId", soq._id)
        formData.append("questionData", JSON.stringify({
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
        }))
        // for (var [key, value] of formData.entries()) {
        //     console.log(key, value);
        // }

        await fetch("http://localhost:7050/admin/Question", {
            method: 'POST',
            body: formData,

        })
            .then(result => {
                // setSoqId(res.SetOfQuestionId)
                return result.json()
            })
            .then(res => {
                // console.log(res)
                // console.log(res.Question.questions)
                return setQuestionList(res.Question.questions)
            })
        setLoading(false)

    }


    const onClickEditQuestion = (question) => {
        setEditQuestion(question._id);
    }

    const deleteQuestionHandler = async (question) => {
        setLoading(true)
        await fetch("http://localhost:7050/admin/Question", {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "DELETE",
            body: JSON.stringify({
                "questionData": {
                    soqId: soq._id,
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
        setLoading(false)
    }

    const updateQuestionHandler = async (e) => {
        e.preventDefault()
        console.log(e.target.QuestionTitle.value)
        setLoading(true)
        await fetch("http://localhost:7050/admin/Question", {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "PATCH",
            body: JSON.stringify({
                "questionData": {
                    soqId: soq._id,
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
        setLoading(false)
        setEditQuestion(false)

    }

    const soqTitleChangeHandler = (e) => {
        setSoqTitle(e.target.value)
    }
    const ansChangeHandler = (e) => {
        console.log(e.target.value)
    }



    const handleUploadImage = (e) => {
        const file = e.target.files[0] // เก็บไว้ setState ลงใน file
        const reader = new FileReader(); // เรียก Class FileReader เพื่อแปลง file image ที่รับเข้ามา
        reader.onloadend = () => { // เป็น eventของFileReaderเมื่อโหลดภาพเสร็จ
            setFile(file) // ทำการ setState
            setImagePreviewUrl(reader.result) //เหมือนด้านบน
        }
        reader.readAsDataURL(file) // เป็นส่วนของการแสดงรูป ไม่ค่อยแน่ใจครับ ผู้รู้ช่วยคอมเม้นบอกด้วยนะครับ
    }


    if (isLoading) {
        return <FadeIn><Lottie options={defaultOptions} height={500} width={500} /></FadeIn>
    }

    return <FadeIn>
        {isEdit == false ?
            <FadeIn>
                <div className='nameset'>
                    <p>ชื่อชุดคำถาม</p>
                    <input type="text" value={soqTitle} onChange={soqTitleChangeHandler} />
                    <button className='btn btn-light' onClick={clickNextHandler}>ต่อไป</button>
                </div>
            </FadeIn>

            : isEditQuestion == true ?
                <div>
                    {questionList?.map(question => {
                        let content;
                        if (question._id === editQuestion) {

                            content = <div>
                                <Form className='creques container' onSubmit={updateQuestionHandler}>
                                    <div className='ediques'>
                                        <div className='row'>
                                            <div className='col-1'>
                                                <p>คำถาม</p>
                                            </div>
                                            <div className='col-11 creques2' >
                                                <input className='form-control form-control-lg' placeholder={question.questionstitle} name='QuestionTitle'></input>
                                                <img src={`http://localhost:7050/` + question.imgUrl} />
                                                {/* <input // ทำ input ไว้ กด เพื่อ find รูปครับ
                                                    type="file" // type ต้องเป็น file
                                                    name="image"
                                                    onChange={handleUploadImage} // เรียก function ด้านบน เมื่อมีรูปเข้ามา                           
                                                /> */}
                                            </div>
                                        </div>

                                        {question.choices.map((choice, index) => {
                                            return <p key={choice.QuestionTitle}>
                                                <div className='row'>
                                                    <div className='col-1'>ตัวเลือกที่</div>

                                                    <div className='col-11 creques2'>
                                                        <input className='form-control form-control-lg' placeholder={'ตัวเลือก' + (index + 1)}
                                                            placeholder={choice.choiceTitle}
                                                            name={'ChoiceTitle' + (index + 1)}></input>
                                                    </div>
                                                </div>
                                            </p>

                                        })}
                                    </div>

                                    <div className="namequestion row">
                                        <div className='col-1'>
                                            <p>ข้อถูก</p>
                                        </div>
                                        <div className='col-11' >
                                            <Form.Select className='formsel' name="ans">
                                                <option>Default select</option>
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                                <option value={3}>3</option>
                                                <option value={4}>4</option>
                                            </Form.Select>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-10'></div>
                                        <div className='col-2'>
                                            <button type="submit" className="btn btn-light btn-lg text-dark edibutt">บันทึก</button>
                                            <button className="btn btn-light btn-lg text-dark" onClick={() => { setEditQuestion(false) }}>ยกเลิก</button>
                                        </div>
                                    </div>
                                </Form>

                            </div>
                        } else {
                            content = <div key={question.title} className='groupcreate'>
                                <div className='questsave'>
                                    <p>
                                        ข้อที่...
                                        <Form.Control id="disabledTextInput" className='inputquest' placeholder={question.questionstitle} disabled />
                                    </p>
                                    <img src={`http://localhost:7050/` + question.imgUrl} />

                                    {question.choices.map(choice => {
                                        return <p key={choice.choiceTitle}>
                                            ตัวเลือกที่...
                                            <Form.Control id="disabledTextInput" className='inputques' placeholder={choice.choiceTitle} disabled />
                                        </p>
                                    })}
                                    <p>
                                        คำตอบ
                                        <Form.Control id="disabledTextInput" className='inputquest' placeholder={question.ans} disabled />
                                    </p>
                                    <button type="button" className="btn btn-warning btn-lg text-dark"
                                        onClick={() => { onClickEditQuestion(question) }}>แก้ไข</button>
                                    <button type="button" className="btn btn-danger btn-lg text-dark"
                                        onClick={() => { deleteQuestionHandler(question) }}>ลบ</button>
                                </div>
                            </div>
                        }
                        return content
                    })}
                    <Form onSubmit={submitQuestionHandler} className='creques container'>
                        <div className="namequestion row">

                            <div className='col-1'>
                                <p>คำถาม</p>
                            </div>
                            <div className='queimg col-11'>
                                <input placeholder='กรอกคำถาม' className="form-control form-control-lg nameque" name='QuestionTitle'></input>
                                <img
                                    src={imagePreviewUrl ? imagePreviewUrl : ""
                                    }
                                />
                                <input // ทำ input ไว้ กด เพื่อ find รูปครับ
                                    type="file" // type ต้องเป็น file
                                    name="image"
                                    onChange={handleUploadImage} // เรียก function ด้านบน เมื่อมีรูปเข้ามา                           
                                />
                            </div>

                        </div>
                        <div className="namequestion row">
                            <div className='col-1'>
                                <p>ตัวเลือกที่1</p>
                            </div>
                            <div className='col-11'>
                                <input placeholder='ตัวเลือก1' className="form-control form-control-lg nameque" name='ChoiceTitle1'></input>
                            </div>
                        </div>
                        <div className="namequestion row">
                            <div className='col-1'>
                                <p>ตัวเลือกที่2</p>
                            </div>
                            <div className='col-11'>
                                <input placeholder='ตัวเลือก2' className="form-control form-control-lg nameque" name='ChoiceTitle2'></input>
                            </div>
                        </div>
                        <div className="namequestion row">
                            <div className='col-1'>
                                <p>ตัวเลือกที่3</p>
                            </div>
                            <div className='col-11'>
                                <input placeholder='ตัวเลือก3' className="form-control form-control-lg nameque" name='ChoiceTitle3'></input>
                            </div>
                        </div>
                        <div className="namequestion row">
                            <div className='col-1'>
                                <p>ตัวเลือกที่4</p>
                            </div>
                            <div className='col-11'>
                                <input placeholder='ตัวเลือก4' className="form-control form-control-lg nameque" name='ChoiceTitle4'></input>
                            </div>
                        </div>
                        <div className="namequestion row">
                            <div className='col-1'>
                                <p>ข้อถูก</p>
                            </div>
                            <div className='col-11'>
                                <Form.Select className='formsel' name="ans">
                                    <option>Default select</option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                </Form.Select>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-11'>
                            </div>
                            <div className='col-1'>
                                <button type="submit" className="btn btn-light btn-lg text-dark">บันทึก</button>
                            </div>
                        </div>
                    </Form>

                </div >
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

    </FadeIn >;
}
