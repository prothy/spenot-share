import { Router } from 'express'
import { saveUser, checkUserLogin } from './db.js'

const router = Router()

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', async (req, res) => {
    const validLogin = await checkUserLogin(req)

    if (validLogin) {
        res.cookie('name', req.body.username).status(200).send('Successful login. Redirecting...')
    } else {
        res.status(400).send('Login unsuccessful. Try again.')
    }
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', async (req, res) => {
    const dbResponse = await saveUser(req)
    res.status(dbResponse[0]).send(dbResponse[1])
})

export default router