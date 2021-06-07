import { Router } from 'express'
import { MongoError } from 'mongodb'
import { saveUser } from './db.js'

const router = Router()

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', (req, res) => {
    checkUserLogin(req)
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', async (req, res) => {
    const dbResponse = await saveUser(req)
    res.status(dbResponse[0]).send(dbResponse[1])
})

export default router