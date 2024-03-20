const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Please provide company'],
        maxLength: 100,
    },
    position: {
        type: String,
        required: [true, 'Please provide position'],
    },
    status: {
        type: String,
        enum: ['Interview', 'Decline', 'Pending'],
        default: 'Pending',
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    }
},
{timestamps: true}
)

module.exports = mongoose.model('job', jobSchema)