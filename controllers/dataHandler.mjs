import mongoose from 'mongoose'

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
    updateAccessToken: async function (accessToken, refreshToken) {
        await User.updateOne({ refresh_token: refreshToken }, { $set: { access_token: accessToken } })
    },
    getUserByName: async function (userId) {
        return await User.findOne({ user_id: userId })
    }
}