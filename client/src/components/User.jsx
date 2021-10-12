import React, {useCallback, useLayoutEffect, useState } from 'react'
import { useHistory } from 'react-router'

import Header from './Header.jsx'
import ChatHeader from './ChatHeader.jsx'
import Sidebar from './ChatHeader.jsx'
import Chat from './Chat'

import '../styles/components/User.scss'

const User = () => {
    const history = useHistory()

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



    useLayoutEffect(() => {
        getCurrentUser()
    }, [currentUser, getCurrentUser])

    return (
        <>
            <Header>
                <ChatHeader user={currentUser}></ChatHeader>
            </Header>
            <main className="chat">
                <Sidebar />
                <Chat />
            </main>
            
        </>
    )
}

export default User
