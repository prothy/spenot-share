import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Message from './Message.jsx'
import SongInput from './SongInput.jsx'

const Chat = () => {
    const [messages, setMessages] = useState([])
    const [user, setUser] = useState()

    const getCurrentUser = async () => {
        const userObj = await fetch(process.env.REACT_APP_SERVER_URL + '/api/get-current-user', {
            credentials: 'include',
            mode: 'cors',
        })
            .then(res => res.json())
            .catch(e => console.error(e))

        setUser(userObj.username)
    }

    useEffect(() => {
        getCurrentUser()

        const messageList = [
            'das', 'asdf', 'asdf'
        ]

        setMessages(messageList)
    }, [])

    return (
        <article>
            <span>Currently logged in: <Link to={{pathname: '/user/' + user}}>{user}</Link></span>
            <section className="msg-list">
                {messages.map(e => <Message content={e} />)}
            </section>
            <SongInput />
        </article>
    )
}

export default Chat