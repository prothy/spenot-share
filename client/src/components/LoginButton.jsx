import React from 'react'

const LoginButton = () => {
    // TODO: use websockets to open in new tab
    
    return (
        <a href={process.env.REACT_APP_SERVER_URL + '/redirect/spotify'}>Connect to Spotify</a>
    )
}

export default LoginButton
