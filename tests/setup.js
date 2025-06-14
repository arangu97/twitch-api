jest.mock('../src/config/twitchConfig.js' , () => ({
  clientId: 'TEST_ID',
  clientSecret: 'TEST_SECRET',
  baseAuthUrl: 'https://id.twitch.tv/oauth2',
  baseUrl:  'https://api.twitch.tv/helix',
}));

const axios = require('axios')
const Mock = require('axios-mock-adapter');
global.axiosMock = new Mock(axios);

// default token mock for every test file
global.axiosMock
  .onPost('https://id.twitch.tv/oauth2/token')
  .reply(200, { access_token: 'mocked_token', expires_in: 3600 });