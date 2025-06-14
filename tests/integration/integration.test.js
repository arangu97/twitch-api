// In this test file, we will test the full integration (http request -> controller -> service -> adapter -> middleware -> response) of the Twitch API service.
const request = require('supertest')
const app = require('../../src/app')
const mock = global.axiosMock

// We define all the mocked responses that we want to test
beforeAll(() => {
  mock.onGet(/helix\/users/).reply(config => {
  const id = new URLSearchParams(config.params).get('id');
  if (id === '12345') {
    return [200, {
      data: [{
        id,
        login: 'testuser',
        display_name: 'Test User',
        type: 'user',
        broadcaster_type: 'affiliate',
        description: 'This is a test user.',
        profile_image_url: 'http://example.com/profile.jpg',
        offline_image_url: 'http://example.com/offline.jpg',
        view_count: 1000,
        created_at: '2021-01-01T00:00:00Z',
      }]
    }];
  }
  return [200, { data: [] }];
});

  mock.onGet(/helix\/streams/).reply(200, {
    data: [
      { title: 'Live Stream 1', user_name: 'Streamer1' },
      { title: 'Live Stream 2', user_name: 'Streamer2' },
    ],
  });
});

describe('Twitch API Integration Tests', () => {
    // Test user with 200 code
    test('GET /analytics/user devuelve 200 y usuario adaptado', async () => {
    const res = await request(app)
      .get('/analytics/user')
      .query({ id: '12345' });

    console.log('Response body:', res.status, res.body);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe('12345');
    expect(res.body.display_name).toBe('Test User');
    })

    // Test user bad request with 400 code
    test('GET /analytics/user devuelve 400 para solicitud incorrecta', async () => {
        const res = await request(app)
            .get('/analytics/user')
            .query({ id: '' });

        console.log('Response body:', res.status, res.body);

        expect(res.status).toBe(400);
        expect(res.body.error).toBe("Invalid or missing 'id' parameter.");
    })

    // Test user with 404 code
    test('GET /analytics/user devuelve 404 para usuario no encontrado', async () => {
        const res = await request(app)
            .get('/analytics/user')
            .query({ id: '99999' });

        console.log('Response body:', res.status, res.body);

        expect(res.status).toBe(404);
        expect(res.body.error).toBe('User not found.');
    })

    // Test live streams with 200 code
    test('GET /analytics/streams devuelve 200 y streams adaptados', async () => {
        const res = await request(app)
            .get('/analytics/streams');

        console.log('Response body:', res.status, res.body);

        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(2);
        expect(res.body[0].title).toBe('Live Stream 1');
        expect(res.body[1].title).toBe('Live Stream 2');
    })
})