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

export function addPosition(position) {
    return {
        type: 'ADD_POSITION',
        position
    }
}

export function getReportPositions(imei, startDate, endDate) {
    return {
        type: 'GET_REPORT_POSITIONS',
        request: [{ url: `/report/positions?imei=${imei}&startDate=${startDate}&endDate=${endDate}`, method: 'get' }]
    }
}