import express from 'express'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import WebSocket from 'ws'

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path: './.env'})
}

import routes from './lib/router'

// MONGOOSE CONFIG
mongoose.connect('mongodb://localhost/spenot', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log(`[${new Date().toUTCString()}] succesful connection to db`)
})

// EXPRESS CONFIG
const app = express()
const port = 5000

app.set('view engine', 'pug')
app.use(express.static('static'))

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(session({
    secret: 'krumpli', resave: true, saveUninitialized: true, cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    }
}))
app.use(cookieParser())

app.use(routes)

const server = app.listen(port, () => {
    console.log(`[${new Date().toUTCString()}] listening on port ${port}`)
})

// WEBSOCKET SETUP
const wss = new WebSocket.Server({ server: server })

wss.on('connection', ws => {
    console.log(`[${new Date().toUTCString()}] successfully connected websocket server`)
    ws.emit('redirect')
})
