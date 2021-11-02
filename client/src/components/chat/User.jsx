import React, {useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { useParams } from 'react-router-dom'

import Header from '../Header'
import ChatHeader from './ChatHeader'
import Sidebar from '../contacts/Sidebar'
import Chat from './Chat'

import '../../styles/components/User.scss'

const User = () => {
    const history = useHistory()

    const { id } = useParams()

    const [currentUser, setCurrentUser] = useState()

    const [userOnPage, setUserOnPage] = useState({})

    const getCurrentUser = useCallback(async () => {
        try {
            const res = await fetch(process.env.REACT_APP_SERVER_URL + '/api/get-current-user', {
                credentials: 'include',
                mode: 'cors',
            })
            const userObj = await res.json()

            userObj.username ? setCurrentUser(userObj.username) : history.push('/')
        } catch (e) {
            console.error(e)
        }
    }, [history])

    const getUserOnPage = useCallback(async () => {
        try {
            const res = await fetch(process.env.REACT_APP_SERVER_URL + '/api/user/' + id, {
                credentials: 'include',
                mode: 'cors'
            })
            const userObj = await res.json()

            setUserOnPage(userObj)
        } catch (e) {
            console.error(e)
        }
    }, [id])

    useEffect(() => {
        getCurrentUser()
        getUserOnPage()
    }, [getCurrentUser, getUserOnPage])

    return (
        <>
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
