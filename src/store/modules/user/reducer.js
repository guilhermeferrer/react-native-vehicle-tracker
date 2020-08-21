const initialState = {
    users: []
}

export default function todo(state = initialState, action) {
    switch (action.type) {
        case 'SAVE_USERS':
            return {
                ...state,
                users: [...state.users, ...action.users]
            }
        default:
            return state;
    }
} 