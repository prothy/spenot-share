import express from 'express'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

import routes from './controllers/routes'

// MONGOOSE CONFIG
mongoose.connect('mongodb://localhost/spenot', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('succesful connection to db.')
})

// EXPRESS CONFIG
const app = express()
const port = 3000

app.set('view engine', 'pug')
app.use(express.static('static'))

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(session({
    secret: 'krumpli', resave: true, saveUninitialized: true, cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000
    }
}))
app.use(cookieParser())

app.use(routes)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
