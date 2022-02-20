import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import CloseButton from 'react-bootstrap/CloseButton'
import {
        useParams
} from "react-router-dom";

export default function Editque() {
        const [EditQuestion, setEditQuestion] = useState()
        let { soqId } = useParams();
        useEffect(async () => {
                
                console.log(soqId)
                await fetch(`http://localhost:5000/admin/Editque/${soqId}`)
                .then(res =>{
                        return res.json()
                })
                .then(result =>{
                        setEditQuestion(result.setOfQuestion)
                        console.log(result)
                })
        }, [])
        console.log(EditQuestion)
        return (
                <div className='center'>
                        {       
                        EditQuestion?.soqtitle
                                // EditQuestion && EditQuestion?.map((setofQuestion) => {
                                //         return<div>{setofQuestion.soqtitle}</div>
                                // })
                        }
                        {
                                EditQuestion?.questions?.map(question =>{
                                        return<div>{question.questionstitle}{
                                                question.choices.map(choice => {
                                                return<div>{choice.choiceTitle}</div>
                                                })
                                        }</div>
                                })
                        }
                </div>

        )
}
