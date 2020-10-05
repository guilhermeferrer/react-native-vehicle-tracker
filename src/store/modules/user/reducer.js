const initialState = {
    rememberMe: false,
    email: null,
    password: null,
    loading: false,
    loadingRegister: false,
    token: null
}

export default function vehicle(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                loading: true,
                email: state.rememberMe ? action.email : '',
                password: state.rememberMe ? action.password : ''
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
        case 'TOGGLE_REMEMBER_ME':
            return {
                ...state,
                rememberMe: !state.rememberMe,
                email: null,
                password: null
            }
        case 'REGISTER':
            return {
                ...state,
                loadingRegister: true
            }
        case 'REGISTER_ERROR':
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                loadingRegister: false
            }
        default:
            return state;
    }
} 