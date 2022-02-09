import React from 'react'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form';

export default function Score() {
    return (
        <div>
            <div className="scorehead">
                <p className='groupsub2'>
                    หมวดหมู่วิชา
                </p>
                <Form.Select className='formselect'>
                    <option>Default select</option>
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
