import { message } from 'antd';
/**
 * @param {String} content
 */
const success = (content) => {
    message.success(content);
};
/**
 *
 * @param {String} content
 */
const error = (content) => {
    message.error(content);
};

/**
 * @param {String} msg
 * @returns {String}
 * @description
 * This function is used to translate the success message from the server.
 */
const translateSuccess = (msg) => {
    switch (msg) {
        case 'Profile updated successfully':
            return 'Cập nhật thông tin thành công';
        default:
            break;
    }
};
/**
 *
 * @param {String} msg
 * @returns {String}
 * @description
 * This function is used to translate the error message from the server.
 */
const translateError = (msg) => {
    switch (msg) {
        case 'Email already exists':
            return 'Email đã tồn tại';
        case 'Email does not exist':
            return 'Địa chỉ email không tồn tại';
        case 'Password is incorrect':
            return 'Mật khẩu không đúng';
        default:
            break;
    }
};

/**
 * @param {Function} callback
 * @returns {Object} data Object
 * @description
 * This function is used to handle the fetch request.
 * It will return the data if success
 * It also shows the message if the status is between 200 and 300.
 * @example
 * const data = await handleFetch(() => axios.get('/user'));
 */
const handleFetch = async (callback) => {
    let data = null;

    try {
        const res = await callback();
        if (res?.data?.message) success(translateSuccess(res.data.message));
        data = res.data;
    } catch (err) {
        console.log(err.response?.data?.message);
        if (err.response?.data?.message)
            error(translateError(err.response.data.message));
        data = null;
    }

    return data;
};

export { handleFetch };
