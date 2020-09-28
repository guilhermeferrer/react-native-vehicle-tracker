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
        default:
            return state;
    }
} 