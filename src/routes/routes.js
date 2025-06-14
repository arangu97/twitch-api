// In this file we will define the routes for our application
const { Router } = require('express')
const { getStreamerInfoById, getLiveStreams } = require('../controllers/twitchController')

const router = Router()

router.get('/analytics/user', getStreamerInfoById)
router.get('/analytics/streams', getLiveStreams)

module.exports = router