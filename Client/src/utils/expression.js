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
        case 'Signup successfully':
            return 'Đăng ký thành công';
        case 'SignIn successfully':
            return 'Đăng nhập thành công';
        case 'Profile updated successfully':
            return 'Cập nhật thông tin thành công';
        case 'Rating created successfully':
            return 'Tạo đánh giá thành công';
        case 'Rating updated successfully':
            return 'Cập nhật đánh giá thành công';
        case 'Rating deleted successfully':
            return 'Xóa đánh giá thành công';
        case 'Product created successfully':
            return 'Tạo sản phẩm thành công';
        case 'Product updated successfully':
            return 'Cập nhật sản phẩm thành công';
        case 'Product deleted successfully':
            return 'Xóa sản phẩm thành công';
        case 'Register retailer successfully':
            return 'Đăng ký cửa hàng thành công';
        case 'Share location successfully':
            return 'Chia sẻ vị trí thành công';
        case 'Added to cart':
            return 'Sản phẩm đã được thêm vào giỏ hàng';
        case 'Order created':
            return 'Đặt hàng thành công';
        case 'Warehouse receipt created successfully':
            return 'Tạo phiếu nhập kho thành công';
        case 'Update retailer successfully':
            return 'Cập nhật thông tin cửa hàng thành công';
        default:
            return 'Thành công';
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
        case 'User not found':
            return 'Người dùng không tồn tại';
        case 'Invalid phone number':
            return 'Số điện thoại không hợp lệ';
        case 'Invalid address':
            return 'Địa chỉ không hợp lệ';
        case 'Invalid status':
            return 'Trạng thái không hợp lệ';
        case 'No changes detected':
            return 'Không có thay đổi nào được phát hiện';
        case 'Permission denied':
            return 'Không có quyền truy cập';
        case 'Rating not found':
            return 'Đánh giá không tồn tại';
        case 'Missing required fields':
            return 'Vui lòng điền đầy đủ thông tin';
        case 'Invalid price':
            return 'Giá không hợp lệ';
        case 'Invalid discount':
            return 'Giảm giá không hợp lệ';
        case 'Missing images':
            return 'Vui lòng thêm hình ảnh';
        case 'Product not found':
            return 'Sản phẩm không tồn tại';
        case 'Not enough product':
            return 'Không đủ sản phẩm';
        case 'Only support online payment with 1 store':
            return 'Chỉ hỗ trợ thanh toán online với 1 cửa hàng';
        default:
            return 'Có lỗi xảy ra';
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
    try {
        const res = await callback();
        console.log('🚀 ~ handleFetch ~ res:', res);

        if (res?.data?.message) success(translateSuccess(res.data.message));

        return res.data;
    } catch (err) {
        console.log(err?.response);
        if (err?.response?.data?.message)
            error(translateError(err.response.data.message));
        return null;
    }
};

export { handleFetch };
