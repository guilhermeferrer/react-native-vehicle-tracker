export function getVehicles() {
    return {
        type: 'GET_VEHICLES',
        request: [{ url: `/vehicle`, method: 'get' }]
    }
}