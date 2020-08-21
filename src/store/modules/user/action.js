export function getUser(name) {
    return {
        type: 'GET_USER',
        request: [{ url: `/users/${name}` }]
    }
}

export function saveUsers(users) {
    return {
        type: 'SAVE_USERS',
        users
    }
}