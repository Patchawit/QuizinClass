/* eslint-disable */
import React from 'react'
import { useAuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { loginBy, studentid } = useAuthContext()
  const fac = studentid.slice(2,4)
  console.log(fac)
  let src = "https://cdn.discordapp.com/attachments/695119707010891796/977937803860123658/pngtree-user-free-button-png-image-image_1338291.png"
  if (fac == "01") {
    src = "https://cdn.discordapp.com/attachments/695119707010891796/977931923705983036/unknown_44.png"
  }
  if (fac == "02") {
    src = "https://cdn.discordapp.com/attachments/695119707010891796/977933219058032710/263558274_4998837366795131_6486530085656239421_n.png"
  }
  if (fac == "03") {
    src = "https://cdn.discordapp.com/attachments/695119707010891796/977933819564937246/unknown.png"
  }
  if (fac == "04") {
    src = "https://cdn.discordapp.com/attachments/695119707010891796/977934143113535518/unknown.png"
  }
  if (fac == "05") {
    src = "https://cdn.discordapp.com/attachments/695119707010891796/977934511323095040/unknown.png"
  }
  if (fac == "06") {
    src = "https://cdn.discordapp.com/attachments/695119707010891796/977934728730644540/unknown.png"
  }
  if (fac == "07") {
    src = "https://media.discordapp.net/attachments/867880540602368052/936140224852021258/itlogo.png"
  }
  if (fac == "10") {
    src = "https://cdn.discordapp.com/attachments/695119707010891796/977935142947549224/9269f38d5a7a842f.png"
  }
  if (fac == "11") {
    src = "https://cdn.discordapp.com/attachments/695119707010891796/977935217878761542/unknown.png"
  }
  if (fac == "12") {
    src = "https://cdn.discordapp.com/attachments/695119707010891796/977935409118068776/5.-AMI.png"
  }
  if (fac == "13") {
    src = "https://cdn.discordapp.com/attachments/695119707010891796/977935542845067324/2.-IAAI.png"
  }
  if (fac == "14") {
    src = "https://cdn.discordapp.com/attachments/695119707010891796/977937276799713300/unknown.png"
  }
  if (fac == "15") {
    src = "https://cdn.discordapp.com/attachments/695119707010891796/977937373352587365/unknown.png"
  }

  return (

    <div>
      <div className='center'>
        <div className='profile'>
          <img src={src} width="25%" height="70%" />
          <div className="info">
            <p>
              รหัสนักศึกษา : {studentid.substring(0,8)}
            </p>
            <p>
              ชื่อ - นามสกุล : {loginBy}
            </p>
          </div>
        </div>
        <Link to={`/studentscore`}>
        <button type="button" className="btn btn-warning btn-lg text-white mt-5 btnmyscore" >ตรวจสอบคะแนน</button>
        </Link>
      </div>
    </div>


  )
}