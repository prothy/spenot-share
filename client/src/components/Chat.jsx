import React, {useState, useEffect } from 'react'
import Message from './Message.jsx'
import SongInput from './SongInput.jsx'

import '../styles/components/Chat.scss'

const Chat = ({user}) => {
    const [messages, setMessages] = useState([])

    const [inputValue, setInputValue] = useState('')

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
            <div className="chat-input">
                <SongInput val={{inputValue, setInputValue}} />
                <button className="btn">Send</button>
            </div>
        </article>
    )
}

export default Chat