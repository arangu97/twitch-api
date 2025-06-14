// File for testing the Twitch API adapters (just adaptation logic)
const { transformStreamerInfo, transformLiveStreams } = require('../../src/adapters/adapters')

describe('Twitch API Adapters', () => {
    describe('transformStreamerInfo', () => {
        it('should transform streamer info correctly', () => {
            const input = [{
                id: '12345',
                login: 'testuser',
                display_name: 'Test User',
                type: 'user',
                broadcaster_type: 'affiliate',
                description: 'This is a test user.',
                profile_image_url: 'http://example.com/profile.jpg',
                offline_image_url: 'http://example.com/offline.jpg',
                view_count: 1000,
                created_at: '2021-01-01T00:00:00Z'
            }]

            const expectedOutput = {
                id: '12345',
                login: 'testuser',
                display_name: 'Test User',
                type: 'user',
                broadcaster_type: 'affiliate',
                description: 'This is a test user.',
                profile_image_url: 'http://example.com/profile.jpg',
                offline_image_url: 'http://example.com/offline.jpg',
                view_count: 1000,
                created_at: '2021-01-01T00:00:00.000Z'
            }

            expect(transformStreamerInfo(input)).toEqual(expectedOutput)
        })

        it('should return null for empty input', () => {
            expect(transformStreamerInfo([])).toBeNull()
        })
    })

    describe('transformLiveStreams', () => {
        it('should transform live streams correctly', () => {
            const input = {
                data: [{
                    title: 'Live Stream 1',
                    user_name: 'Streamer1'
                }, {
                    title: 'Live Stream 2',
                    user_name: 'Streamer2'
                }]
            }

            const expectedOutput = [
                { title: 'Live Stream 1', user_name: 'Streamer1' },
                { title: 'Live Stream 2', user_name: 'Streamer2' }
            ]

            expect(transformLiveStreams(input)).toEqual(expectedOutput)
        })

        it('should return an empty array for no streams', () => {
            expect(transformLiveStreams({ data: [] })).toEqual([])
        })
    })
}
)