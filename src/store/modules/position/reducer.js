const initialState = {
    lastPosition: null,
    positions: [],
    loading: false,
    reportData: null,
    success: null
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
        case 'ADD_POSITION':
            return {
                ...state,
                lastPosition: action.position,
                positions: [action.position, ...state.positions]
            }
        case 'GET_REPORT_POSITIONS':
            return {
                ...state,
                reportData: null,
                success: null
            }
        case 'GET_REPORT_POSITIONS_SUCCESS':
            return {
                ...state,
                reportData: action.response.data,
                success: true
            }
        case 'RESET_REPORT':
            return {
                ...state,
                success: null
            }
        default:
            return state;
    }
} 