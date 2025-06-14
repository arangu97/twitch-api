// This file will define all the errors that can be thrown in the application
const errors = {
    BadRequest: {
        status: 400,
        message: "Invalid or missing 'id' parameter."
    },
    Unauthorized: {
        status: 401,
        message: "Unauthorized. Twitch access token is invalid or has expired."
    },
    NotFound: {
        status: 404,
        message: "User not found."
    },
    InternalServerError: {
        status: 500,
        message: "Internal server error."
    }
}

module.exports = errors