/**
 * Unit-tests for twitchService
 * – token refresh is handled by the global setup mock
 * – here we only stub the Helix endpoints we call
 */
const twitchService = require('../../src/services/twitchService')
const mock = global.axiosMock

beforeEach(() => mock.resetHistory())
afterAll(() => mock.resetHandlers())

// We test the getStreamerInfoById method
mock.onGet(/helix\/users/).reply(200, {
  data: [{
    id: '12345',
    login: 'testuser',
    display_name: 'Test User',
    type: 'user',
    broadcaster_type: 'affiliate',
    description: 'This is a test user.',
    profile_image_url: 'http://example.com/profile.jpg',
    offline_image_url: 'http://example.com/offline.jpg',
    view_count: 1000,
    created_at: '2021-01-01T00:00:00Z',
  }],
})

test('getStreamerInfoById returns adapted user', async () => {
  const info = await twitchService.getStreamerInfoById('12345')

  expect(info).toEqual({
    id: '12345',
    login: 'testuser',
    display_name: 'Test User',
    type: 'user',
    broadcaster_type: 'affiliate',
    description: 'This is a test user.',
    profile_image_url: 'http://example.com/profile.jpg',
    offline_image_url: 'http://example.com/offline.jpg',
    view_count: 1000,
    created_at: '2021-01-01T00:00:00.000Z',
  })
})

// We test the getLiveStreams method
mock.onGet(/helix\/streams/).reply(200, {
  data: [
    { title: 'Live Stream 1', user_name: 'Streamer1' },
    { title: 'Live Stream 2', user_name: 'Streamer2' },
  ],
})

test('getLiveStreams returns adapted streams', async () => {
  const streams = await twitchService.getLiveStreams()
  expect(streams).toEqual([
    { title: 'Live Stream 1', user_name: 'Streamer1' },
    { title: 'Live Stream 2', user_name: 'Streamer2' },
  ])
})