/* eslint-disable */
import React, { useEffect, useState } from 'react'
import CloseButton from 'react-bootstrap/CloseButton'
import { useAuthContext } from '../context/AuthContext';

export default function Create() {
    const [subjectTitle, setSubjectTitle] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [allSubject, setAllSubject] = useState([])
    const {user, Authcookie} = useAuthContext();
    const onSubjectChange = (event) => {
        setSubjectTitle(event.target.value)
    }
    const onSubmit = async () => {
        await fetch("http://localhost:7050/admin/category", {
            headers: {
                'Content-Type': 'application/json',
                'Authcookie':Authcookie
                
            },
            method: "POST",
            body: JSON.stringify({ "messages": subjectTitle, 'email':user.email })
        })
            .then(res => res.json())

    }
    const onDelete = async (categoryId) => {
        await fetch("http://localhost:7050/admin/category", {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "DELETE",
            body: JSON.stringify({ "categoryId": categoryId })
        })
            .then(res => res.json())

    }
    useEffect(async () => {
        setLoading(true)
        await fetch(`http://localhost:7050/admin/category/${user.email}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authcookie':Authcookie   
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
    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <div className="center">
                <div className="namesubject">
                    <h3>ชื่อหมวดหมู่วิชา</h3>
                    <input value={subjectTitle} onChange={onSubjectChange} className="form-control form-control-lg namesub" type="text" placeholder="กรอกชื่อวิชา"></input>
                </div>
                <button type="button" onClick={onSubmit} className="btn btn-warning btn-lg text-dark btnsave">บันทึก</button>
                <ul className="name">
                    <h3>ชื่อหมวดหมู่วิชา</h3>
                    {allSubject?.map((subject, key) => {
                        console.log(subject)
                        return <li key={key}>{subject.subjecttitle}
                                    <CloseButton onClick={()=>onDelete(subject._id)} aria-label="Hide" className="btnclose"/>
                                </li>
                    })}
                </ul>
            </div>
        </div>
    )
}


