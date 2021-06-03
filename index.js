import express from 'express'
import mongoose from 'mongoose'
import routes from './controllers/routes'

const app = express()
const port = 3000

// MONGOOSE INIT
mongoose.connect('mongodb://localhost/spenot', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('Connection to MongoDB succeeded.')
})

// EXPRESS INIT
app.set('view engine', 'pug')
app.use(express.static('static'))

app.use(routes)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
