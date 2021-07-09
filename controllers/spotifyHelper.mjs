import axios from "axios";

const appAuthorization = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')

export default {
    getSpotifyAuthentication: async function (accessCode) {
        return await axios({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params: {
                'grant_type': 'authorization_code',
                'code': accessCode,
                'redirect_uri': 'http://localhost:3000/authorize/spotify',
                'client_id': process.env.CLIENT_ID,
                'client_secret': process.env.CLIENT_SECRET
            }
        })
    },
    getSpotifyUserInfo: async function (accessToken) {
        return await axios({
            method: 'get',
            url: 'https://api.spotify.com/v1/me',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
    },
    getSpotifyUserPlaylists: async function (accessToken) {
        return await axios({
            method: 'get',
            url: 'https://api.spotify.com/v1/me/playlists',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
    },
    getSongById: async function (songId, accessToken) {
        return await axios({
            method: 'get',
            url: 'https://api.spotify.com/v1/tracks/' + songId,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
    },
    getNewAccessToken: async function (refreshToken) {
        const response = await axios({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params: {
                'grant_type': 'refresh_token',
                'refresh_token': refreshToken,
                'client_id': process.env.CLIENT_ID,
                'client_secret': process.env.CLIENT_SECRET
            }
        })

        return response.data.access_token
    }
}
