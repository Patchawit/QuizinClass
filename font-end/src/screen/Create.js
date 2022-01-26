import React, { useState } from 'react'
export default function Create() {
    const [subjectTitle, setSubjectTitle] = useState('')
    const onSubjectChange = (event) => {
        setSubjectTitle(event.target.value)
    }
    const onSubmit = async () => {
        await fetch("http://localhost:5000/admin/category", {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify({ "messages": subjectTitle })
        })
            .then(res => res.json())

    }



    return (
        <div>
            <h1>สร้างวิชา</h1>
            <input value={subjectTitle} onChange={onSubjectChange} className="form-control form-control-lg" type="text" placeholder="กรอกชื่อวิชา"></input>
            <button type="button" onClick={onSubmit} className="btn btn-warning btn-lg text-dark mt-5">บันทึก</button>
        </div>

    )
}

