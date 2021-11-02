import React, {useState, useEffect } from 'react'
import Message from './Message.jsx'
import SongInput from './SongInput.jsx'

import '../styles/components/Chat.scss'

const Chat = ({user}) => {
    const [messages, setMessages] = useState([])
    const [songs, setSongs] = useState([])

    const [loading, setLoading] = useState(false)

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

        if (songs || loading) {
            const messageList = createMessagesList(songs)
            setMessages(messageList)
            setLoading(false)
        }
    }, [user, songs, loading])

    return (
        <article>
            <section className="msg-list">
                {messages.map(e => <Message content={e} />)}
                {loading ? 'Loading...' : ''}
            </section>
            <div className="chat-input">
                <SongInput inputState={{inputValue, setInputValue}} msgState={{messages, setMessages}}/>
            </div>
        </article>
    )
}

export default Chat