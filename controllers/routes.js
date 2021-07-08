import { Router } from 'express'

import dataHandler from './dataHandler.mjs'
import spotifyHelper from './spotifyHelper.mjs'

const router = Router()

router.get('/', (req, res) => {
    res.render('index', { username: req.session.username })
})

/* LOGIN/REGISTER ROUTES */
router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/logout', (req, res) => {
    res.clearCookie('name')
    req.session.username = undefined;
    res.redirect('/')
})

router.get('/redirect/spotify', (req, res) => {
    const scopes = 'playlist-modify-public playlist-modify-private playlist-read-private user-read-email user-read-private'
    const client_id = process.env.CLIENT_ID
    const redirect_uri = 'http://localhost:3000/authorize/spotify'

    res.redirect(`https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirect_uri)}`);
})

router.get('/authorize/spotify', async (req, res) => {
    const auth = await spotifyHelper.getSpotifyAuthentication(req.query.code).catch(e => console.log(e.response))
    const userInfo = await spotifyHelper.getSpotifyUserInfo(auth.data.access_token).catch(e => console.log(e.response))
    dataHandler.verifyUser(auth.data, userInfo.data)
    req.session.username = userInfo.data.id
    req.session.accessToken = auth.data.access_token
    res.redirect('/')
})


/* USER ROUTING */
router.get('/user/:username', async (req, res) => {
    const user = await dataHandler.getUserByName(req.params.username)
    const isCurrentUser = req.params.username === req.session.username

    console.log(user)
    res.render('user', { username: req.session.username, displayname: user.display_name, isCurrentUser })
})

export default router