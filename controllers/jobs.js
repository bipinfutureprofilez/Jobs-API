const {StatusCodes} = require('http-status-codes')
const Job = require('../models/job');
const { NotFound, BadRequest } = require('../errors')


const getAllJobs = async (req, res, next) => {
    const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')
    res.status(StatusCodes.OK).json({ jobs })
}


const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job })
}

const getJob = async (req, res, next) => {
    try {
        const { id: jobId } = req.params
        const job = await Job.findOne({ _id: jobId, createdBy: req.user.userId })
        if (!job) {
            throw new NotFound(`Not found any job with ${jobId}`);
        }
        res.status(StatusCodes.OK).json({ job });
    } catch (error) {
        next(error)
    }
}

const updateJob = async (req, res, next) => {
    try {
        const { id: jobId } = req.params;
        const { company, position } = req.body
        if (!company || !position) {
            throw new BadRequest('company & Position fields can not be empty!');
        }
        const job = await Job.findOneAndUpdate({ _id: jobId, createdBy: req.user.userId }, req.body, { new: true, runValidators: true })
        if (!job) {
            throw new NotFound(`Not found any job with ${jobId}`);
        }
        res.status(StatusCodes.OK).json({ job });
    } catch (error) {
        next(error)
    }
}

const deleteJob = async (req, res, next) => {
    try {
        const { id: jobId } = req.params
        const job = await Job.findOneAndDelete({ _id: jobId, createdBy: req.user.userId })
        if (!job) {
            throw new NotFound(`Not found any job with ${jobId}`)
        }
        res.status(StatusCodes.OK).json({ job })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllJobs,
    createJob,
    getJob,
    updateJob,
    deleteJob
}
