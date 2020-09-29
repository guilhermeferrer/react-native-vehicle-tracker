export function getLastPosition(imei) {
    return {
        type: 'GET_LAST_POSITION',
        request: [{ url: `/last-position?imei=${imei}`, method: 'get' }]
    }
}

export function getPositions(imei) {
    return {
        type: 'GET_POSITIONS',
        request: [{ url: `/positions?imei=${imei}`, method: 'get' }]
    }
}