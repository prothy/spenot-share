import React from 'react'

import Header from './Header.jsx'

import '../styles/components/Login.scss'
import LoginButton from './LoginButton'

const Login = () => {

    return (
        <main>
            <Header />
            <article className="login-welcome-text">
                <p>Welcome to this spotify song share app thing. Connect to your spotify account to begin.</p>
                <LoginButton />
            </article>
        </main>
    )
}

export default Login
