export const catchError = (message, callback) => {
    switch (message) {
        case 'Email does not exist':
            callback('Địa chỉ email không tồn tại');
            break;
        case 'Password is incorrect':
            callback('Mật khẩu không đúng');
            break;
        default:
            return false;
    }
};
