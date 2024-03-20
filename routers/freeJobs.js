const express = require('express')
const router = express.Router()

const { getAllJobsFree } = require('../controllers/freeJobs');

router.route('/').get(getAllJobsFree)

module.exports = router