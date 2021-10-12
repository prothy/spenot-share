import React, {useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router'

import Header from './Header.jsx'
import ChatHeader from './ChatHeader.jsx'
import Sidebar from './ChatHeader.jsx'
import Chat from './Chat'

import './css/User.scss'

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



    useEffect(() => {
        getCurrentUser()
    }, [currentUser, getCurrentUser])

    return (
        <>
            <Header>
                <ChatHeader user={currentUser} />
            </Header>
            <main>
                <Sidebar />
                <Chat />
            </main>
            
        </>
    )
}

export default User
