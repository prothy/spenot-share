import axios from "axios";

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
    getSpotifyUserInfo: async function (authToken) {
        return await axios({
            method: 'get',
            url: 'https://api.spotify.com/v1/me',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
    },
    getSpotifyUserPlaylists: async function (authToken) {
        return await axios({
            method: 'get',
            url: 'https://api.spotify.com/v1/me/playlists',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
    }
}
