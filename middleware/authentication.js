const jwt = require('jsonwebtoken')
const { Unauthenticated } = require('../errors')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new Unauthenticated('Authentication invalid')
        }
        
        const token = authHeader.split(' ')[1]
        const payload = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(payload.userId).select('-password')
        req.user = user

        req.user = { userId: payload.userId, name: payload.userName}
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = auth