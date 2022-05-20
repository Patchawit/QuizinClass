/* eslint-disable */
import React,{useEffect,useState} from 'react'
import {
  useParams,
  useNavigate
} from "react-router-dom";
import io from "socket.io-client";
import { useAuthContext } from '../context/AuthContext';

import * as database from "firebase/database";
import {db} from "../firebase"

export default function Lobby() {
  let { soqId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthContext()
  const starCountRef = database.ref(db, 'lobby/'+soqId)
  const [ users, setUsers ] = useState([]);
  const [soq, setSoq] = useState();
  
  function addUser(name){
      database.get(starCountRef).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          if (data?.users && !data?.users?.includes(name)) {
            database.update(database.ref(db, 'lobby/' + soqId), {
              users: [...data.users, name]
            });
            setUsers([...data.users, name])
          } else {
            database.set(database.ref(db, 'lobby/' + soqId), {
              users: [name]
            });
            setUsers([name])
          }
        } else {
          database.set(database.ref(db, 'lobby/' + soqId), {
            users: [name]
          });
          setUsers([name])
        }
      });
  }

  useEffect(async() => {
    
    await fetch(`http://localhost:7050/admin/Editque/${soqId}`, {
      headers: {
        'Content-Type': 'application/json',
        // 'Authcookie':Authcookie   
    },
      method: "GET",
    })
      .then(res => {
        return res.json()
      }).then(result => {
        console.log(result)
        return setSoq(result.setOfQuestion)
      })

    addUser(user?.email.slice(0, 8))
    
    database.onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      if (data?.state == "start") {
        navigate("/exercise/" + soqId);
      }
      if (data?.users){
        setUsers(data?.users)
      }
    });
  },[]);

  return (
    <div className='lobby'>
      <h1 className="center">
        ชื่อชุดคำถาม {soq.soqtitle}
      </h1>
      <div className='center'>
        <div className='ready container'>
          <div className='room row'>
            <p>จำนวนคน : {users.length}</p>
          </div>
          <div className='room row'>
            {
              users.reverse().map((user) =>
                  <div className='col-2'>
                    <p>{user}</p>
                  </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}