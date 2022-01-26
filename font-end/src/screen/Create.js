import React,{useState} from 'react'
export default function Create() {
    const [subjectTitle, setSubjectTitle] = useState('')
    const onSubjectChange=(event)=> {
        setSubjectTitle(event.target.value)
    }
    const onSubmit =()=> {
        console.log(subjectTitle)
    }
    return (
        <div>
            <h1>สร้างวิชา</h1>
            <input value={subjectTitle} onChange={onSubjectChange} className="form-control form-control-lg" type="text" placeholder="กรอกชื่อวิชา"></input>
            <button type="button" onClick={onSubmit} className="btn btn-warning btn-lg text-dark mt-5">บันทึก</button>
        </div>
        
        
    )
}
