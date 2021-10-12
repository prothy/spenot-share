import React, {useState, useEffect } from 'react'
import Message from './Message.jsx'
import SongInput from './SongInput.jsx'

import '../styles/components/Chat.scss'

const Chat = () => {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const messageList = [
            'das', 'asdf', 'asdf'
        ]

        setMessages(messageList)
    }, [])

    return (
        <article>
            <section className="msg-list">
                {messages.map(e => <Message content={e} />)}
            </section>
            <SongInput />
        </article>
    )
}

export default Chat