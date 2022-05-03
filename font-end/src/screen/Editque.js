import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import CloseButton from 'react-bootstrap/CloseButton'
import {
        useParams
} from "react-router-dom";

export default function Editque() {
        const [editQuestion, setEditQuestion] = useState()
        const [questionList, setQuestionList] = useState()
        const [isLoading, setLoading] = useState(false)
        const [file, setFile] = useState({}) // ใช้เพื่อส่งไปที่ API
        const [imagePreviewUrl, setImagePreviewUrl] = useState(null) //ใช้เพื่อภาพ Preview
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
        // const updateQuestionHandler = async (e) => {
        //         console.log(e.target.QuestionTitle.value)
        //         await fetch("http://localhost:7050/admin/Question", {
        //                 headers: {
        //                         'Content-Type': 'application/json',
        //                 },
        //                 method: "PATCH",
        //                 body: JSON.stringify({
        //                         "questionData": {
        //                                 soqId: soqId,
        //                                 QuestionId: editQuestion,
        //                                 QuestionTitle: e.target.QuestionTitle.value,
        //                                 Choice: [
        //                                         {
        //                                                 "choiceTitle": e.target.ChoiceTitle1.value,
        //                                                 "choiceImg": "ตัวเลือก1"
        //                                         },
        //                                         {
        //                                                 "choiceTitle": e.target.ChoiceTitle2.value,
        //                                                 "choiceImg": "ตัวเลือก1"
        //                                         },
        //                                         {
        //                                                 "choiceTitle": e.target.ChoiceTitle3.value,
        //                                                 "choiceImg": "ตัวเลือก1"
        //                                         },
        //                                         {
        //                                                 "choiceTitle": e.target.ChoiceTitle4.value,
        //                                                 "choiceImg": "ตัวเลือก1"
        //                                         }
        //                                 ],
        //                                 ans: e.target.ans.value
        //                         }
        //                 })
        //         })
        //                 .then(result => {
        //                         return result.json()
        //                 })
        //                 .then(res => {
        //                         console.log(res)
        //                         return setQuestionList(res.Question.questions)
        //                 })

        //         setEditQuestion(false)

        // }
        const updateQuestionHandler = async (e) => {
                console.log(e.target.QuestionTitle.value)
                const formData = new FormData();
                formData.append("img", file)
                formData.append("questionData", JSON.stringify({
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

                }))
                await fetch("http://localhost:7050/admin/Question", {

                        method: "PATCH",
                        body: formData,
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
                // e.preventDefault();
                const formData = new FormData();
                formData.append("img", file);
                formData.append("soqId", soqId);
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

                await fetch("http://localhost:7050/admin/Question", {
                        method: 'POST',
                        body: formData,
                })
                        .then(result => {
                                return result.json()
                        })
                        .then(res => {
                                console.log(res.Question.questions)
                                return setQuestionList(res.Question.questions)
                        })
                        
                setFile("") //ทำการ setState
                setImagePreviewUrl("") //เหมือนด้านบน
                setIsAddQuestion(false)
               
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
                return <div>Loading ...</div>
        }

        return (
                <div>
                        {questionList && questionList?.questions?.map((question, index) => {
                                let content;
                                if (question._id === editQuestion) {
                                        content = <Form className='creques container' onSubmit={updateQuestionHandler} key={index}>
                                                <div className='ediques'>
                                                        <div className='row'>
                                                                <div className='col-1'>
                                                                        <p>คำถาม</p>
                                                                </div>
                                                                <div className='col-11 creques2' >
                                                                        <input className='form-control form-control-lg' placeholder={question.questionstitle} name='QuestionTitle'></input>
                                                                        <img src={`http://localhost:7050/` + question.imgUrl} />
                                                                        <input // ทำ input ไว้ กด เพื่อ find รูปครับ
                                                                                type="file" // type ต้องเป็น file
                                                                                name="image"
                                                                                onChange={handleUploadImage} // เรียก function ด้านบน เมื่อมีรูปเข้ามา                           
                                                                        />
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
                                } else {
                                        content = <div key={question.title} className='groupcreate'>
                                                <div className='questsave'>
                                                        <p>
                                                                ข้อที่...
                                                                <Form.Control id="disabledTextInput" className='inputquest' placeholder={question.questionstitle} disabled />
                                                        </p>
                                                        {/* <img src={`http://localhost:7050/` + question.imgUrl} /> */}
                                                        {question.imgUrl === "images/1x1.png" ? <div></div> : <img src={`http://localhost:7050/` + question.imgUrl} />}

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

                        {isAddQuestion === false ? <div>
                                <button onClick={() => setIsAddQuestion(true)} className="btn btn-primary btn-lg newque">เพิ่มคำถาม</button>
                        </div>
                                :
                                <div>
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
                                                                <button type="submit" className="btn btn-light btn-lg text-dark">Save</button>
                                                        </div>
                                                </div>
                                        </Form>


                                </div>}
                </div>


        )
}