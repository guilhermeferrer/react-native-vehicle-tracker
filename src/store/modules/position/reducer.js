const initialState = {
    lastPosition: null,
    positions: [],
    loading: false
}

export default function position(state = initialState, action) {
    switch (action.type) {
        case 'GET_VEHICLES':
            return {
                ...state,
                loading: true
            }
        case 'GET_LAST_POSITION_SUCCESS':
            return {
                ...state,
                loading: false,
                lastPosition: action.response.data
            }
        case 'GET_POSITIONS_SUCCESS':
            return {
                ...state,
                positions: action.response.data
            }
        default:
            return state;
    }
} 