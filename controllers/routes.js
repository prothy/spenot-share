import { Router } from 'express'

import dataHandler from './dataHandler.mjs'
import spotifyHelper from './spotifyHelper.mjs'

const router = Router()

router.get('/', (req, res) => {
    if (req.cookies.name && !req.session.username) req.session.username = req.cookies.name
    res.render('index')
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
    console.log(auth.data)
    dataHandler.verifyUser(auth.data.access_token, auth.data.refresh_token)
    res.redirect('/')
})


/* USER ROUTING */
router.get('/user/:username', async (req, res) => {
    const user = await dataHandler.getUserByName(req.params.username)
    const isCurrentUser = req.params.username === req.session.username

    // console.log(user.spotify.access_token)
    // console.log(await getSpotifyUserPlaylists(user.spotify.access_token).catch(e => console.log(e.data)))

    res.render('user', { user, isCurrentUser })
})

export default router