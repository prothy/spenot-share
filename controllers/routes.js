import { Router } from 'express'
import axios from 'axios'
import qs from 'qs';

import { saveUser, checkUserLogin, getUserByName, saveSpotifyToUser } from './db.js'
import { getSpotifyAuthentication, SpotifyAuthenticator } from './util.js'

const router = Router()

router.get('/', (req, res) => {
    if (req.cookies.name && !req.session.username) req.session.username = req.cookies.name
    res.render('index')
})


/* LOGIN/REGISTER ROUTES */
router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', async (req, res) => {
    const validLogin = await checkUserLogin(req)

    if (validLogin) {
        req.session.username = req.body.username
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
    req.session.username = undefined;
    res.redirect('/')
})

router.get('/redirect/spotify', (req, res) => {
    const scopes = 'playlist-modify-public playlist-modify-private playlist-read-private user-read-email user-read-private'
    const client_id = '1a684c820d244310807c3d717204e049'
    const redirect_uri = 'http://localhost:3000/authorize/spotify'

    res.redirect(`https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirect_uri)}`);
})

router.get('/authorize/spotify', async (req, res) => {
    console.log(req.query.code)
    const response = await getSpotifyAuthentication(req.query.code).catch(e => console.log(e.response.data))
    console.log(response.data)
    await saveSpotifyToUser(req.cookies.name, response.data).catch(e => console.log(e))
    res.redirect('/')
})


/* USER ROUTING */
router.get('/user/:username', async (req, res) => {
    const user = await getUserByName(req.params.username)
    const isCurrentUser = req.params.username === req.session.username

    console.log(user)

    res.render('user', { user, isCurrentUser })
})

export default router