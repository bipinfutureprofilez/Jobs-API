const User = require('../models/user')
const { StatusCodes } = require('http-status-codes')
const { BadRequest, Unauthenticated } = require('../errors')


const register = async (req, res, next) => {    
    try {
        const {name, email, password} = req.body;
        const user = await User.create({ ...req.body })  
        // create token      
        const token = user.createJWT();
        
        res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })

    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        // if (!email || !password) {
        //     throw new BadRequest('Please provide email and password!');
        // }

        const user = await User.findOne({email})
        if (!user) {
            throw new Unauthenticated('Invalid Credentials')
        }
        // Match password 
        const isCorrectPassword = await user.checkPassword(password);
        if (!isCorrectPassword) {
            throw new Unauthenticated('Password is incorrect!');
        }
        // create token
        const token = user.createJWT();
        res.status(StatusCodes.OK).json({ user: { name: user.name }, token })

    } catch (error) {
        next(error)
    }
}


module.exports = {
    register,
    login,
}