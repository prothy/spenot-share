import axios from 'axios'
import dataHandler from './dataHandler.mjs'

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
                'redirect_uri': process.env.SPOTIFY_REDIRECT_URI,
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
    },

    handleUserPlaylist: async function (user) {
        if (!user.playlist_id) {
            const response = await axios({
                method: 'post',
                url: `https://api.spotify.com/v1/users/${user.user_id}/playlists`,
                headers: {
                    'Authorization': `Bearer ${user.access_token}`,
                    'Content-Type': 'application/json'
                },
                params: {
                    'user_id': user.user_id
                },
                data: {
                    'name': 'Songs shared with me',
                    'description': 'Generated with Luka\'s spotify tool'
                }
            })

            await dataHandler.setPlaylistId(user.user_id, response.data.id)
        }
    },

    addSongToPlaylist: async function (playlistId, accessToken, songUri) {
        try {
            await axios({
                method: 'post',
                url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                params: {
                    'playlist_id': playlistId,
                    'uris': `spotify:track:${songUri}`
                }
            })
        } catch (e) {
            console.error(e.response.data)
        }
    },

    getUserPlaylist: async function (playlistId, accessToken) {
        return await axios({
            url: `https://api.spotify.com/v1/playlists/${playlistId}`,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            params: {
                'playlist_id': playlistId
            }
        }).catch(e => console.error(e.response.data))
    }

}
