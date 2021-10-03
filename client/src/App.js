import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'
import './App.css'

import Login from './components/Login.jsx'
import User from './components/User.jsx'

function App() {

    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/user/0">User</Link>
                        </li>
                    </ul>
                </nav>

                <Switch>
                    <Route path="/user/:id">
                        <User />
                    </Route>
                    <Route path="/">
                        <Login />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App
