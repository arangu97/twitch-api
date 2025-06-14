// This file will define the transformation of the structure of the responses

const transformStreamerInfo = (data) => {
    if (!data || !data.length) return null

    const user = data[0]
    return {
        id: user.id,
        login: user.login,
        display_name: user.display_name,
        type: user.type,
        broadcaster_type: user.broadcaster_type,
        description: user.description,
        profile_image_url: user.profile_image_url,
        offline_image_url: user.offline_image_url,
        view_count: user.view_count,
        created_at: new Date(user.created_at).toISOString(),
    }
}

const transformLiveStreams = (data) => {
    if (!data || !data.data || !data.data.length) return []

    return data.data.map(stream => ({
        title: stream.title,
        user_name: stream.user_name
    }))
}

module.exports = {
    transformStreamerInfo,
    transformLiveStreams
}