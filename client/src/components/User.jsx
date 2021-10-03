import React from 'react'

import Header from './Header.jsx'
import Sidebar from './Header.jsx'
import Chat from './Chat'

const User = () => {
    return (
        <>
            <Header />
            <main>
                <Sidebar />
                <Chat />
            </main>
            
        </>
    )
}

export default User
