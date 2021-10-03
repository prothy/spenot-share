import { Router } from 'express'
import session from 'express-session'

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
    const redirect_uri = process.env.SPOTIFY_REDIRECT_URI

    res.redirect(`https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirect_uri)}`);
})

router.get('/authorize/spotify', async (req, res) => {
    const auth = await spotifyHelper.getSpotifyAuthentication(req.query.code).catch(e => console.log(e.response.data))
    const userInfo = await spotifyHelper.getSpotifyUserInfo(auth.data.access_token).catch(e => console.log(e.response.data))

    dataHandler.verifyUser(auth.data, userInfo.data)

    req.session.username = userInfo.data.id
    req.session.accessToken = auth.data.access_token
    res.redirect('http://localhost:3000/')
})


/* USER ROUTING */
router.get('/user/:username', async (req, res) => {
    await dataHandler.updateAccessToken(req.params.username)
    const user = await dataHandler.getUserByName(req.params.username)
    const isCurrentUser = req.params.username === req.session.username

    await spotifyHelper.handleUserPlaylist(user).catch(e => console.log(e.response.data))

    req.session.accessToken = user.access_token
    req.session.playlistId = user.playlist_id

    res.render('user', { username: req.session.username, displayname: user.display_name, isCurrentUser })
})

/* FETCH ROUTES */
router.get('/fetch/song/:songId', async (req, res) => {
    const songInfo = await spotifyHelper.getSongById(req.params.songId, req.session.accessToken).catch(e => console.log(`Error getting song by id (${JSON.stringify(e.response.data.error)})`))
    // console.log(songInfo)
    await spotifyHelper.addSongToPlaylist(req.session.playlistId, req.session.accessToken, req.body.songUri)
    res.json(songInfo.data)
})

router.post('/fetch/add-song', async (req, res) => {

})

export default router