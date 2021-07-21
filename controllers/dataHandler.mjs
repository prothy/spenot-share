import mongoose from 'mongoose'
import spotifyHelper from './spotifyHelper.mjs'

const User = mongoose.model('user', new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    display_name: {
        type: String,
        required: true
    },
    access_token: {
        type: String,
        required: true
    },
    refresh_token: {
        type: String,
        required: true
    },
    playlist_id: {
        type: String
    }
}), 'users')


export default {
    verifyUser: async function (auth, userInfo) {
        if (await User.exists({ userId: userInfo.id })) return true

        try {
            await new User({
                user_id: userInfo.id,
                display_name: userInfo.display_name,
                access_token: auth.access_token,
                refresh_token: auth.refresh_token
            }).save()
            return true
        } catch {
            return false
        }
    },

    updateAccessToken: async function (userId) {
        const user = await this.getUserByName(userId)
        const refreshToken = user.refresh_token
        const accessToken = await spotifyHelper.getNewAccessToken(refreshToken).catch(e => console.log(`Error when fetching new access token (${e.response.data.error})`))
        await User.updateOne({ user_id: userId }, { $set: { access_token: accessToken } })
    },

    getUserByName: async function (userId) {
        return await User.findOne({ user_id: userId })
    },

    setPlaylistId: async function (userId, playlistId) {
        await User.updateOne({ user_id: userId }, { $set: { playlist_id: playlistId } })
    }
}