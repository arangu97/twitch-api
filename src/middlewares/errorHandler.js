// This file will handle any errors that occur in the application and send a response to the client

const errorHandler = (err, req, res, next) => {
    console.log('[ERROR]', err) 

    if (err.status && err.message) {
        return res.status(err.status).json({ error: err.message })
    }

    return res.status(500).json({ error: 'Internal server error' })
}
module.exports = errorHandler