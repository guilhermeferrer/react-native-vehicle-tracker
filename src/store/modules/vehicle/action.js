export function getVehicles() {
    return {
        type: 'GET_VEHICLES',
        request: [{ url: `/user/vehicles`, method: 'get' }]
    }
}

export function setVehicle(vehicle) {
    return {
        type: 'SET_VEHICLE',
        vehicle
    }
}