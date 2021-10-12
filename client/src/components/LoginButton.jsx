import React from 'react'

import '../styles/components/LoginButton.scss'

const LoginButton = () => {
    // TODO: use websockets to open in new tab
    
    return (
        <a className="btn btn-login" href={process.env.REACT_APP_SERVER_URL + '/redirect/spotify'}>Connect to Spotify</a>
    )
}

export default LoginButton
