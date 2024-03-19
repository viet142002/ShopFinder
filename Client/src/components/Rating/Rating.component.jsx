import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function Rating() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuth } = useSelector((state) => state.user);
    const { myRate } = useSelector((state) => state.rating);

    const handleOpenModal = () => {
        if (!isAuth) {
            navigate('/login');
            return;
        }
        dispatch({ type: 'rating/setShowModal', payload: { isShow: true } });
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
