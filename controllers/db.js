import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const User = mongoose.model('user', new mongoose.Schema({
    username: String,
    email: String,
    password: String
}), 'users')

export function getUserLogin(req) {
    return false
}

export function validateUsername(req) {

}

export async function saveUser(req) {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10)
    })
    user.save()
}