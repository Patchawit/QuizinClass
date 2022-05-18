/* eslint-disable */
import React,{useEffect,useState} from 'react'
import {
  useParams
} from "react-router-dom";
import io from "socket.io-client";
import { useAuthContext } from '../context/AuthContext';

import * as database from "firebase/database";
import {db} from "../firebase"

export default function Lobby() {
  let { soqId } = useParams();
  const { user } = useAuthContext()
  const starCountRef = database.ref(db, 'lobby/'+soqId)
  const [ users, setUsers ] = useState([]);
  
  function addUser(name){

      database.get(starCountRef).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          if (!data?.users.includes(name)) {
            database.set(database.ref(db, 'lobby/' + soqId), {
              users: [...data.users, name]
            });
            setUsers([...data.users, name])
          }
        } else {
          database.set(database.ref(db, 'lobby/' + soqId), {
            users: [name]
          });
          setUsers([name])
        }
      });
  }

  useEffect(() => {
    addUser(user?.email.slice(0, 8))
    
    database.onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);

      if (data?.state == "start") {
        // change path history.windows('exercise/soqId')
      }
      setUsers(data.users)
    });
  },[]);

  return (
    <div className='lobby'>
      <button onClick={()=>addUser()}>ssss</button>
      <h1 className="center">
        ชื่อชุดคำถาม {soqId}
      </h1>
      <div className='center'>
        <div className='ready container'>
          <div className='room row'>
            <p>จำนวนคน : 30</p>
          </div>
          <div className='room row'>
            {
              users.map((user) =>
                  <div className='col-2'>
                    <p>{user}</p>
                  </div>
              )
            }
            <div className='col-2'>
              <p>61070111</p>
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