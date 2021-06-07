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


export async function checkUserLogin(req) {
    /**
     * Gets user login from database
     * @param {Object} req - Request object
     * @returns {boolean} status - Returns whether login is valid
     */
    const { username, password } = req.body

    if (await User.exists({ $or: [{ username: username }, { email: username }] })) {
        const userObject = await User.findOne({ $or: [{ username: username }, { email: username }] })
        return await bcrypt.compare(password, userObject['password'])
    }

    return false
}

export async function saveUser(req) {
    /**
     * Saves user data into database
     * @param {Object} req - Request object
     * @returns {Array} status - Returns a two-value array with HTTP response code and message values respectively. 
     */

    const { username, email, password } = req.body

    // check if email and username exist in database
    if (await User.exists({ email: email })) {
        return [400, 'E-mail already exists. Use another one.']
    }
    if (await User.exists({ username: username })) {
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