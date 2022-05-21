import React, { useEffect, useState } from 'react'

export default function Chat({ usersName, chats, currentUser, handleSubmitChat }) {
    const [text, setText] = useState("")

    function handleChange(e) {
        setText(e.target.value);
    }

    function handleEnter() {
        chats.push({
            by: currentUser,
            text: text
        })
        console.log(chats);
        setText("")
        handleSubmitChat(chats)
    }
    return <>
        <div className='righthead'>
            <h3>{usersName[0]}</h3>
            <h3>{usersName?.[1]}</h3>
        </div>
        <div className='chatname'>
        {
            chats.map(chat => {
                return <>
                    <h5>
                    {chat.by} : {chat.text}
                    </h5>
                </>                
            })
        }
        </div>

        <input className="form-control form-control-lg chat" type="text" placeholder=""
            onChange={e => handleChange(e)}
            value={text}
            onKeyPress={event => {
                if (event.key === 'Enter') {
                    handleEnter()
                }
            }}
        />



    </>

}