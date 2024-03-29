import React from 'react'

const ChatHeader = ({user}) => {
    const logoutUser = () => {
        console.log('hello im doing something')
    }

    return(
        <span>
            <span>
                <span>Hello, </span>
                <span className="hdr-username">
                    {user}
                </span>.
            </span>
            <button className="logout-btn hdr-btn" onClick={logoutUser}>Logout</button>
        </span>)
    
}

export default ChatHeader
