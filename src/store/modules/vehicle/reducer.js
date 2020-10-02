const initialState = {
    vehicles: [],
    loading: false
}

export default function vehicle(state = initialState, action) {
    switch (action.type) {
        case 'GET_VEHICLES':
            return {
                ...state,
                loading: true
            }
        case 'GET_VEHICLES_SUCCESS':
            return {
                ...state,
                loading: false,
                vehicles: action.response.data
            }
        case 'SET_VEHICLE':
            return {
                ...state,
                vehicle: action.vehicle
            }
        default:
            return state;
    }
} 