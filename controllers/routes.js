import { Router } from 'express'
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

router.post('/register', (req, res) => {
    saveUser(req)
    res.send('Successful registration! Redirecting...')
})

export default router