/* eslint-disable */
import { Form } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import {
    useParams,
    useNavigate,
    useLocation,
    createSearchParams
} from "react-router-dom";
import Itembox from '../component/quiz/Itembox';
import QuestionPanel from '../component/quiz/QuestionPanel';
import Chat from '../component/quiz/Chat';
import { useQuery } from '../hook/useQuery';
import { useAuthContext } from '../context/AuthContext';

import * as database from "firebase/database";
import { db } from "../firebase"

export default function Exercise() {

    const query = useQuery()
    let { soqId } = useParams();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { user } = useAuthContext()
    const currentUser = user?.email.slice(0, 8)
    const room = database.ref(db, 'lobby/' + soqId + "/room")

    const [EditQuestion, setEditQuestion] = useState()
    const [usersName, setUsersName] = useState([])
    const [chats, setChats] = useState([])
    const [thisRoom, setThisRoom] = useState([])
    const [questionsNumber, setQuestionsNumber] = useState(1)

    let item = query.get("item")

    useEffect(async () => {

        console.log(soqId)
        await fetch(`http://localhost:7050/admin/Editque/${soqId}`)
            .then(res => {
                return res.json()
            })
            .then(result => {
                setEditQuestion(result.setOfQuestion)
                console.log(result)
            })

        database.get(room).then((snapshot) => {
            const data = snapshot.val();
            const userKey = Object.keys(data).find(x => x.includes(currentUser))
            const userPair = data[userKey]

            setUsersName(userPair.users)

            const _thisRoom = database.ref(db, `lobby/${soqId}/room/${userKey}`)
            setThisRoom(_thisRoom)
            database.onValue(_thisRoom, (snapshot) => {
                const data = snapshot.val();
                setChats(data?.chat)
                // setQuestionsNumber(data?.questionsNumber || 1)
            });
        })
    }, [])

    useEffect(() => {
        navigate({
            pathname: pathname,
            search: `?${createSearchParams({
                item: questionsNumber
            })}`
        });
    }, [questionsNumber]);

    function handleSubmitChat(array) {
        database.update(thisRoom, {
            chat: array
        });
    }

    function handleUpdateQuestion(number) {
        // database.update(thisRoom, {
        //     questionsNumber: number
        // });
    }
    return (<>
        <div className='breakout'>
            {/* <div className='left'>
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
            </div> */}

            <div className='left'>
                <div className='headleft container'>
                    <div className='row'>
                        <div className='col-2'>
                            <p>ชุดคำถาม:</p>
                        </div>
                        <div className='col-10'>
                            {
                                EditQuestion?.soqtitle
                                // EditQuestion && EditQuestion?.map((setofQuestion) => {
                                //         return<div>{setofQuestion.soqtitle}</div>
                                // })
                            }
                        </div>
                    </div>
                </div>
                {/* <QuestionPanel item={EditQuestion?.questions[item-1]}  /> */}

                <QuestionPanel
                    questions={EditQuestion?.questions}
                    item={item - 1} 
                    handleUpdateQuestion={handleUpdateQuestion}
                    />
            </div>

            <div className='right'>
                <Chat
                    usersName={usersName}
                    chats={chats}
                    currentUser={currentUser}
                    handleSubmitChat={handleSubmitChat}
                />
            </div>


        </div>

        {/* <Itembox  /> */}
    </>


    )
}
