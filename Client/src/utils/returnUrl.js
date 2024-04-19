export function returnUrl({ user }) {
    return user?.avatar?.path
        ? user.avatar.path.slice(0, 4) === 'http'
            ? user.avatar.path
            : `${import.meta.env.VITE_APP_API_URL}/${user.avatar.path}`
        : import.meta.env.VITE_APP_AVATAR_DEFAULT;
}
