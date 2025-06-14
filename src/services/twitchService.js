// This file will have all the logic to interact with the Twitch API
const axios = require('axios')
const twitchConfig = require('../config/twitchConfig')
const errors = require('../errors')
const { transformStreamerInfo, transformLiveStreams } = require('../adapters/adapters')

let token = null
let tokenUntil = 0

const refreshToken = async () => {
    try {
        const response = await axios.post(`${twitchConfig.baseAuthUrl}/token`, null, {
            params: {
                client_id: twitchConfig.clientId,
                client_secret: twitchConfig.clientSecret,
                grant_type: 'client_credentials'
            }
        })
        token = response.data.access_token
        tokenUntil = Date.now() + (response.data.expires_in * 1000) // Convert seconds to milliseconds
    } catch (error) {
        console.error('Error refreshing token:', error)
        throw error
    }
}

const request = async (url, method = 'GET', params = {}) => {
    if (!token || Date.now() >= tokenUntil) {
        await refreshToken()
    }
    try {
        const response = await axios({
            url: url,
            method: method,
            params: params,
            headers: {
                'Client-ID': twitchConfig.clientId,
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        console.error('Error making request to Twitch API:', error)
        throw error
    }
}

const twitchService = {
    // Function to get streamer information by user ID
    getStreamerInfoById: async (id) => {
        try {
            const response = await request(`${twitchConfig.baseUrl}/helix/users`, 'GET', { id: id })
            if (!response || !response.data || response.data.length === 0) {
                throw errors.NotFound
            }
            return transformStreamerInfo(response.data)
        } catch (error) {
            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        throw errors.BadRequest 
                    case 401:
                        throw errors.Unauthorized
                    case 404:
                        throw errors.NotFound
                    default:
                        throw errors.InternalServerError
                }
            }
            if (error.status === 404) {
                throw errors.NotFound
            }
            throw errors.InternalServerError
        }
    },
    // Function to get live streams
    getLiveStreams: async () => {
        try {
            const response = await request(`${twitchConfig.baseUrl}/helix/streams`, 'GET')
            return transformLiveStreams(response)
        } catch (error) {
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        throw errors.Unauthorized
                    default:
                        throw errors.InternalServerError
                }
            }
            throw error
        }
    }
}
module.exports = twitchService