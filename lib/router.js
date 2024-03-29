import { Router } from 'express'

import dataHandler from './dataHandler.mjs'
import spotifyHelper from './spotifyHelper.mjs'

const router = Router()

router.get('/', (req, res) => {
    res.render('index', { username: req.session.username })
})

/* SPOTIFY AUTHORIZATION ROUTES */

router.get('/redirect/spotify', (req, res) => {
    const scopes = 'playlist-modify-public playlist-modify-private playlist-read-private user-read-email user-read-private'
    const client_id = process.env.CLIENT_ID
    const redirect_uri = process.env.SPOTIFY_REDIRECT_URI

    res.redirect(`https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirect_uri)}`)
})

router.get('/authorize/spotify', async (req, res) => {
    try {
        const auth = await spotifyHelper.getSpotifyAuthentication(req.query.code)
        const userInfo = await spotifyHelper.getSpotifyUserInfo(auth.data.access_token)

        dataHandler.verifyUser(auth.data, userInfo.data)

        req.session.username = userInfo.data.id
        req.session.accessToken = auth.data.access_token

        console.log('got spotify authorization token')
    
        res.redirect(`${process.env.REACT_URL}/user/${req.session.username}`)
    } catch (e) {
        console.error('Error authenticating user: ' + e.response.data)
        res.status(400).send('Error occurred during authentication.')
    }
})

/* USER API */

router.get('/api/user/:username', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL)
    res.setHeader('Access-Control-Allow-Credentials', true)

    await dataHandler.updateAccessToken(req.params.username)
    const user = await dataHandler.getUserByName(req.params.username)
    const isCurrentUser = req.params.username === req.session.username

    try {
        await spotifyHelper.handleUserPlaylist(user)
    } catch (e) {
        console.log('Error fetching user playlist ' + e.response.data)
    }

    const playlist = await spotifyHelper.getUserPlaylist(user.playlist_id, user.access_token)

    req.session.accessToken = user.access_token
    req.session.playlistId = user.playlist_id

    // console.log(user)
    
    res.send({ username: req.session.username, displayname: user.display_name, isCurrentUser, songs: playlist.data.tracks.items })
})

router.get('/api/get-current-user', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL)
    res.setHeader('Access-Control-Allow-Credentials', true)

    res.send({ username: req.session.username })
})

/* PLAYLIST API */

router.get('/api/song/:songId', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL)
    res.setHeader('Access-Control-Allow-Credentials', true)

    let songInfo

    try {
        songInfo = await spotifyHelper.getSongById(req.params.songId, req.session.accessToken)
    } catch (e) {
        console.error(`Error getting song by id (${JSON.stringify(e.response.data.error)})`)
        res.status(400).send('Error retrieving song from spotify.')
    }

    try {
        await spotifyHelper.addSongToPlaylist(req.session.playlistId, req.session.accessToken, req.params.songId)
    } catch (e) {
        console.error('Error adding song to playlist: ' + e)
        res.status(400).send('Error adding song to playlist.')
    }
    
    res.send(songInfo.data)
})

export default router