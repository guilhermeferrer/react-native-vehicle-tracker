const initialState = {
    lastPosition: null,
    positions: [],
    loading: true,
    loadingPositions: true,
    reportData: null,
    success: null
}

export default function position(state = initialState, action) {
    switch (action.type) {
        case 'GET_POSITIONS': {
            return {
                ...state,
                loading: true,
                loadingPositions: true
            }
        }
        case 'GET_LAST_POSITION_SUCCESS':
            return {
                ...state,
                lastPosition: action.response.data,
                loading: false
            }
        case 'GET_POSITIONS_SUCCESS':
            return {
                ...state,
                positions: action.response.data,
                loadingPositions: false
            }
        case 'ADD_POSITION':
            return {
                ...state,
                lastPosition: { ...state.lastPosition, ...action.position },
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