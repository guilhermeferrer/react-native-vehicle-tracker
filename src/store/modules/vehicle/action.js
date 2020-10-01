export function getVehicles() {
    return {
        type: 'GET_VEHICLES',
        request: [{ url: `/user/vehicles`, method: 'get' }]
    }
}