import React from 'react'

import ChatHeader from './ChatHeader.jsx'
import Sidebar from './ChatHeader.jsx'
import Chat from './Chat'

import './css/User.scss'

const User = () => {
    return (
        <>
            <ChatHeader />
            <main>
                <Sidebar />
                <Chat />
            </main>
            
        </>
    )
}

export default User
