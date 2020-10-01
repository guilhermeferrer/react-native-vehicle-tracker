export function login(email, password) {
    return {
        type: 'LOGIN',
        request: [{ url: `/login`, method: 'post', data: { email, password } }],
        email,
        password
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

export function toggleRememberMe() {
    return {
        type: 'TOGGLE_REMEMBER_ME'
    }
}

export function register(data) {
    return {
        type: 'REGISTER',
        request: [{ url: `/register`, method: 'post', data }]
    }
}