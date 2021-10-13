import React, {useState, useEffect } from 'react'
import Message from './Message.jsx'
import SongInput from './SongInput.jsx'

import '../styles/components/Chat.scss'

const Chat = ({user}) => {
    const [messages, setMessages] = useState([])
    const [songs, setSongs] = useState([])

    const [inputValue, setInputValue] = useState('')

    const createMessagesList = (songs) => {
        const messageList = []

        for (let song of songs) {
            messageList.push(song.track.name)
        }

        return messageList
    }

    useEffect(() => {
        setSongs(user.songs)

        if (songs) {
            const messageList = createMessagesList(songs)
            setMessages(messageList)
        }
    }, [user, songs])

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