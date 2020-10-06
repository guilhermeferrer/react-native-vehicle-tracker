const initialState = {
}

export default function anchor(state = initialState, action) {
    switch (action.type) {
        case 'SET_ANCHOR':
            return {
                ...state
            }
        default:
            return state;
    }
} 