const User = require('../models/user')
const { StatusCodes } = require('http-status-codes')
const { BadRequest } = require('../errors')

const register = async (req, res, next) => {    
    try {
        const user = await User.create({ ...req.body })
        res.status(StatusCodes.CREATED).json({ user })
    } catch (error) {
        next(error)
    }
}

const login = async (req, res) => {
    res.send(req.body)
}


module.exports = {
    register,
    login,
}