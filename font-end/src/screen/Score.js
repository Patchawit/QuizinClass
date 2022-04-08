import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form';
import { useAuthContext } from '../context/AuthContext';

export default function Score() {
    const { user } = useAuthContext();
    const [allSubject, setAllSubject] = useState([])
    const [listOfSoq, setListOfSoq] = useState()
    useEffect(async () => {
        console.log(user.email)
        await fetch(`http://localhost:7050/admin/category/${user.email}`, {
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
    }, [])

    const onSubjectChangeHandler = async (e) => {
        e.preventDefault();
        if (e.target.value !== "default") {
            await fetch(`http://localhost:7050/admin/SetOfQuestion/${user.email}/${e.target.value}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "GET",
            })
                .then(res => { return res.json() })
                .then(result => {
                    console.log(result.SetOfQuestion)
                    setListOfSoq(result.SetOfQuestion)
                    return console.log(result)
                })
        }
    }

    const onSoqChangeHandler = async (e) => {
        await fetch(`http://localhost:7050/admin/Score/${e.target.value}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "GET",
        })
            .then(res => { return res.json() })
            .then(result => {
                console.log(result)
            })
    }

    return (
        <div>
            <div className="scorehead">
                <p className='groupsub2'>
                    หมวดหมู่วิชา
                </p>
                <Form.Select className='formselect' onChange={onSubjectChangeHandler}>
                    <option value="default">default</option>
                    {allSubject?.map((subject) => {
                        return <option value={subject._id} key={subject.subjecttitle}>{subject.subjecttitle}</option>
                    })}

                </Form.Select>F
                <p className='groupsub2'>
                    ชุดคำถาม
                </p>
                <Form.Select className='formselect' onChange={onSoqChangeHandler}>
                    <option value="default">default</option>
                    {listOfSoq?.map((soq) => {
                        console.log(soq.soqtitle)
                        return <option value={soq._id} key={soq.soqtitle}>{soq.soqtitle}</option>
                    })}

                </Form.Select>
                <h3>ค้นหา</h3>
                <input className="form-control form-control-md search" type="text" placeholder=""></input>
            </div>
            <div className='center'>
                <div className='table'>
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>รหัสนักศึกษา ชื่อ-สกุล</th>
                                <th>ชุดที่ 1</th>
                                <th>ชุดที่ 2</th>
                                <th>ชุดที่ 3</th>
                                <th>ชุดที่ 4</th>
                                <th>ชุดที่ 5</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>61000001 กวิน บินได้</td>
                                <td>20</td>
                                <td>19</td>
                                <td>18</td>
                                <td>20</td>
                                <td>20</td>
                            </tr>
                            <tr>
                                <td>61000002 กวิน บินได้</td>
                                <td>20</td>
                                <td>19</td>
                                <td>18</td>
                                <td>19</td>
                                <td>19</td>
                            </tr>
                            <tr>
                                <td>61000003 กวิน บินได้</td>
                                <td>20</td>
                                <td>19</td>
                                <td>18</td>
                                <td>18</td>
                                <td>18</td>
                            </tr>
                            <tr>
                                <td>61000004 กวิน บินได้</td>
                                <td>20</td>
                                <td>19</td>
                                <td>18</td>
                                <td>17</td>
                                <td>17</td>
                            </tr>
                            <tr>
                                <td>61000003 กวิน บินได้</td>
                                <td>20</td>
                                <td>19</td>
                                <td>18</td>
                                <td>16</td>
                                <td>16</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
