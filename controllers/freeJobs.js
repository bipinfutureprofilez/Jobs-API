
const Job = require('../models/job');
const { StatusCodes } = require('http-status-codes');

const getAllJobsFree = async (req, res, next) => {
    const jobs = await Job.find().sort('createdAt')
    res.status(StatusCodes.OK).json({ jobs })
}

module.exports = {
    getAllJobsFree
}