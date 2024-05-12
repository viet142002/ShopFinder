import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '~/hooks/useAuth';
import { setShowModal } from '~/redux/ratingSlice';

function Rating({ to, toType }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuth, data: user } = useAuth();
    const { myRate } = useSelector((state) => state.rating);

    const handleOpenModal = () => {
        if (!isAuth) {
            navigate('/login');
            return;
        }
        dispatch(
            setShowModal({
                to,
                toType,
                fromType: 'User',
                from: user,
                isShow: true
            })
        );
    };

    return (
        <>
            {!myRate && (
                <div className="flex justify-center">
                    <Button onClick={handleOpenModal} htmlType="button">
                        Đánh giá
                    </Button>
                </div>
            )}
        </>
    );
}

export default Rating;
