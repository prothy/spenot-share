import { Router } from 'express'
import { render } from 'pug'
import { saveUser, checkUserLogin, getUserByName } from './db.js'

const router = Router()

router.get('/', (req, res) => {
    res.render('index')
})


/* LOGIN/REGISTER ROUTES */
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

router.get('/logout', (req, res) => {
    res.clearCookie('name')
    res.redirect('/')
})


/* USER ROUTING */
router.get('/user/:username', async (req, res) => {
    const user = await getUserByName(req.params.username)
    res.render('index', user)
})

export default router