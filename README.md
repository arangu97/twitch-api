# Twitch Analytics Challenge

This is a small API REST (Express + NodeJS) that will make a proxy service to Twitch API.

# Setup & Run
Create a .env file at the project root and copy the following keys:

    PORT=6006
    TWITCH_BASE_URL=https://api.twitch.tv
    TWITCH_BASE_AUTH_URL=https://id.twitch.tv/oauth2
    TWITCH_CLIENT_ID=<your‑client‑id>
    TWITCH_CLIENT_SECRET=<your‑client‑secret>

Install dependencies
    
    npm install

Run the server in dev mode

    npm run dev

Run the server in production mode

    npm start

# Project Structure

    src/
    ├─ adapters/      # Response adapters
    ├─ config/        # Centralised credentials & external URLs
    ├─ controllers/   # Orchestrate each endpoint → call services
    ├─ routes/        # Map my application URL paths to controllers
    ├─ services/      # Business logic + calls to Twitch (axios)
    ├─ middlewares/   # Error logic
    ├─ errors/        # Error definitions
    ├─ app.js         # Express application
    tests/            
    ├─ adapters/      # Adapters testing
    ├─ services/      # Services testing
    ├─ integration/   # Integration testing with Supertest
    ├─ setup.js       # Defining all global testing elements (mock, defaultToken...)
    jest.config.js    # Jest configuration file
    server.js         # Server
    .env              # Environment variables

# Testing

I have added 3 small testing files:

- Testing for **adapters** (Just test the logic of adapting a Twitch predefined response to the format we want)
- Testing for **services** (Test the business logic with mocked responses)
- **Integration** testing with Supertest (It will test the end-to-end flow of the application)

    