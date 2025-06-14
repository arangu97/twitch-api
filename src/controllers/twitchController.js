// This file will define the controller functions for each endpoint requests

const twitchService = require('../services/twitchService')

// GET /twitch/analytics/user?id=<userId>
const getStreamerInfoById = async (req, res, next) => {
    try {
        const { id } = req.query
        if (!id) {
            return res.status(400).json({ error: "Invalid or missing 'id' parameter." })
        }
        const userInfo = await twitchService.getStreamerInfoById(id)
        res.json(userInfo)
    } catch (error) {
        next(error)
    }
}

// GET /twitch/analytics/streams
const getLiveStreams = async (req, res, next) => {
    try {
        const streams = await twitchService.getLiveStreams()
        res.json(streams)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getStreamerInfoById,
    getLiveStreams
}