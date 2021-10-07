import React, {useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import Message from './Message.jsx'
import SongInput from './SongInput.jsx'

import './css/Chat.css'

const Chat = () => {
    const history = useHistory()

    const [messages, setMessages] = useState([])
    const [currentUser, setCurrentUser] = useState()

    const getCurrentUser = useCallback(async () => {
        const userObj = await fetch(process.env.REACT_APP_SERVER_URL + '/api/get-current-user', {
            credentials: 'include',
            mode: 'cors',
        })
            .then(res => res.json())
            .catch(e => console.error(e))

        userObj.username ? setCurrentUser(userObj.username) : history.push('/')
    }, [history])

    useEffect(() => {
        if (!currentUser) getCurrentUser()

        const messageList = [
            'das', 'asdf', 'asdf'
        ]

        setMessages(messageList)
    }, [currentUser, getCurrentUser])

    return (
        <article>
            <span>Currently logged in: <Link to={{pathname: '/user/' + currentUser}}>{currentUser}</Link></span>
            <section className="msg-list">
                {messages.map(e => <Message content={e} />)}
            </section>
            <SongInput />
        </article>
    )
}

export default Chat