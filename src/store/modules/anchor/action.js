export function setAnchor(active, imei) {
    return {
        type: 'SET_ANCHOR',
        request: [{ url: `/anchor`, method: 'put', data: { active, imei } }],
        imei
    }
}