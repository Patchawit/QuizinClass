/* eslint-disable */
import React,{useEffect,useState} from 'react'
import {
  useParams
} from "react-router-dom";
import io from "socket.io-client";

export default function Lobby() {
  let { soqId } = useParams();
  let [ users, setUsers ] = useState([{stdId:'111'}]);
  function addUser(user){
    setUsers(()=>[...users,user])
  }
  const listUsers = [...users].map((user) =>
  <div className='col-2'>
    <p>{user.stdId}s</p>
  </div>
);
  useEffect(() => {
    const socket = io("http://localhost:3001");
    socket.emit("join_room")
    socket.on("add_user",(user)=>{
      console.log('joined the room')
      addUser(user)
    })
    console.log(users)
  },[]);

  
  return (
    <div className='lobby'>
      <button onClick={()=>console.log(users)}>ssss</button>
      <h1 className="center">
        ชื่อชุดคำถาม {soqId}
      </h1>
      <div className='center'>
        <div className='ready container'>
          <div className='room row'>
            <p>จำนวนคน : 30</p>
          </div>
          <div className='room row'>
            {listUsers}
            <div className='col-2'>
              <p>61070111</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
            <div className='col-2'>
              <p>61070000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}