import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const User = mongoose.model('user', new mongoose.Schema({
    username: {
        type: String,
        required: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
}), 'users')


export function getUserLogin(req) {
    return false
}

export function usernameExists(req) {

}

export async function saveUser(req) {
    /**
     * Saves user data into database
     * @param req - Request object
     * @returns {Array} status - Returns a two-value array with HTTP response code and message values respectively. 
     */

    const { username, email, password } = req.body

    // check if email and username exist in database
    if (await User.findOne({ email })) {
        return [400, 'E-mail already exists. Use another one.']
    }
    if (await User.findOne({ username })) {
        return [400, 'Username already exists. Use another one.']
    }

    const user = new User({
        username: username,
        email: email,
        password: await bcrypt.hash(password, 10)
    })

    try {
        await user.save()
        return [200, 'Success! Redirecting...']
    } catch {
        return [500, 'Something went wrong. Try again.']
    }
}