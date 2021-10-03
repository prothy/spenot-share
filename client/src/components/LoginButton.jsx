import React, { useEffect } from 'react'
import { useHistory } from 'react-router'

const LoginButton = () => {
    const history = useHistory()
    
    useEffect(() => {
        window.addEventListener('message', () => {
            history.push('/user/0')
        })
    })

    const loginToSpotify = (event) => {
        const button = event.target
        button.value = 'Waiting...'
        window.open('http://localhost:5000/redirect/spotify')
    }
    
    return (
        <input type="button" 
            id="spotify-login-button" 
            value="Log into Spotify" 
            onClick={loginToSpotify}
        />
    )
}

export default LoginButton
