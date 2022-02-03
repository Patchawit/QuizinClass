import { Dropdown } from 'bootstrap';
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';

export default function CreateSetOfQuestion() {
    const [soqTitle, setSoqTitle] = useState('');
    const [soq, setSoq] = useState('');
    const [isEdit, setEdit] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [allSubject, setAllSubject] = useState([])

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

    const soqTitleChangeHandler = (e) => {
        setSoqTitle(e.target.value)
    }

    if (isLoading) {
        return <div>Loading ...</div>
    }

    return <div>
        <input type="text" value={soqTitle} onChange={soqTitleChangeHandler} />
        {isEdit == false ? <button onClick={clickNextHandler}>Next</button>
            : <Form.Select className='formselect' onChange={dropdownChangeHandler}>
                <option>Default select</option>
                {allSubject?.map((subject, key) => {
                    return <option value={subject._id}>{subject.subjecttitle}</option>
                })}
            </Form.Select>
        }

    </div>;
}
