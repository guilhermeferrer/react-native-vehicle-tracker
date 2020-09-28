export function login(email, password) {
    return {
        type: 'LOGIN',
        request: [{ url: `/login`, method: 'post', data: { email, password } }]
    }
}

export function saveUser(data) {
    return {
        type: 'SAVE_USER',
        ...data
    }
}

export function logout() {
    return {
        type: 'LOGOUT'
    }
}