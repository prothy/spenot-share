import axios from "axios";

export async function getSpotifyAuthentication(accessCode) {
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
}