import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'

import './styles/App.scss'

import Login from './components/login/Login'
import User from './components/chat/User'

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/user/:id">
                    <User/>
                </Route>
                <Route path="/">
                    <Login />
                </Route>
            </Switch>
        </Router>
    )
}

export default App
