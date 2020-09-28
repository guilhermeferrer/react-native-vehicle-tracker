const initialState = {
    users: [],
    loading: false,
    token: null
}

export default function vehicle(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                loading: true
            }
        case 'LOGIN_ERROR':
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                loading: false
            }
        case 'SAVE_USER':
            return {
                ...state,
                token: action.token,
                user: action.user
            }
        case 'LOGOUT':
            return {
                ...state,
                token: null,
                user: null
            }
        default:
            return state;
    }
} 