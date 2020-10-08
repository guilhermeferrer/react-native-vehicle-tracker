const initialState = {
    routes: [],
    loading: true
}

export default function routes(state = initialState, action) {
    switch (action.type) {
        case 'GET_ROUTES':
            return {
                ...state,
                loading: true
            }
        case 'GET_ROUTES_SUCCESS':
            return {
                ...state,
                loading: false,
                routes: action.response.data
            }
        default:
            return state;
    }
} 