import mongoose from 'mongoose'

const tokenSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    expireAt: {
        type: Date,
        expires: '60s',
        default: Date.now
    }
})
const Tokens = mongoose.model('tokens', tokenSchema)

export default Tokens
