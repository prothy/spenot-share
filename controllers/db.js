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
    },
    created: {
        type: Date
    }
}), 'users')


export async function getUserByName(name) {
    return await User.findOne({ username: name })
}

/**
 * Gets user login from database
 * @param {object} req request object
 * @returns {boolean} status whether login is valid
 */
export async function checkUserLogin(req) {
    const { username, password } = req.body

    if (await User.exists({ $or: [{ username: username }, { email: username }] })) {
        const userObject = await User.findOne({ $or: [{ username: username }, { email: username }] })
        return await bcrypt.compare(password, userObject['password'])
    }

    return false
}

/**
 * Saves user data into database
 * @param {object} req request object
 * @returns {[number, string]} two-value array with HTTP response code and message values respectively. 
 */
export async function saveUser(req) {
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
        password: await bcrypt.hash(password, 10),
        created: Date.now()
    })

    try {
        await user.save()
        return [200, 'Success! Redirecting...']
    } catch {
        return [500, 'Something went wrong. Try again.']
    }
}