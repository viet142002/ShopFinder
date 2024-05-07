export function returnUrl(str) {
    if (!str) return null;
    if (typeof str === 'string') {
        return str.includes('http')
            ? str
            : `${import.meta.env.VITE_APP_API_URL}${str}`;
    }
    return null;
}

returnUrl.prototype = {
    str: String
};
