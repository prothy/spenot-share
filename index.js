import express from 'express'
import mongoose from 'mongoose'

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

app.use(routes)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
