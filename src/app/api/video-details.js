
export async function fetchVideoDetails(video) {
    const response = await fetch(`/api/videos/${video}`)
    if (!response.ok) {
        throw new Error('Failed to fetch video details')
    }
    return response.json()
}

export async function updateLikes(video, action) {
    const response = await fetch(`/api/videos/${video.id}/likes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
    })
    if (!response.ok) {
        throw new Error('Failed to update likes')
    }
    return response.json()
}

export async function updateSubscription(channelId, action) {
    const response = await fetch(`/api/channels/${channelId}/subscription`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
    })
    if (!response.ok) {
        throw new Error('Failed to update subscription')
    }
    return response.json()
}

