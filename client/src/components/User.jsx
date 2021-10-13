import React, {useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { useParams } from 'react-router-dom'

import Header from './Header.jsx'
import ChatHeader from './ChatHeader.jsx'
import Sidebar from './Sidebar.jsx'
import Chat from './Chat'

import '../styles/components/User.scss'

const User = () => {
    const history = useHistory()

    const { id } = useParams()

    const [currentUser, setCurrentUser] = useState()

    const [userOnPage, setUserOnPage] = useState({})

    const getCurrentUser = useCallback(async () => {
        const userObj = await fetch(process.env.REACT_APP_SERVER_URL + '/api/get-current-user', {
            credentials: 'include',
            mode: 'cors',
        })
            .then(res => res.json())
            .catch(e => console.error(e))

        userObj.username ? setCurrentUser(userObj.username) : history.push('/')
    }, [history])

    const getUserOnPage = useCallback(async () => {
        const userObj = await fetch(process.env.REACT_APP_SERVER_URL + '/api/user/' + id, {
            credentials: 'include',
            mode: 'cors'
        })
            .then(res => res.json())
            .catch(e => console.error(e))

        setUserOnPage(userObj)
    }, [id])

    useEffect(() => {
        getCurrentUser()
        getUserOnPage()
    }, [getCurrentUser, getUserOnPage])

    return (
        <>
            {console.log(userOnPage)}
            <Header>
                <ChatHeader user={currentUser} />
            </Header>
            <div className="chat">
                <Sidebar />
                <Chat user={userOnPage} />
            </div>
            
        </>
    )
}

export default User
