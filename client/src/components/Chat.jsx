import React, {useState, useEffect} from 'react'
import Message from './Message.jsx'

const Chat = () => {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const messageList = [
            'das', 'asdf', 'asdf'
        ]

        setMessages(messageList)
    }, [messages]);

    return (
        <article>
            <section className="msg-list">
                {messages.map(e => <Message content={e} />)}
            </section>
        </article>
    )
}

export default Chat