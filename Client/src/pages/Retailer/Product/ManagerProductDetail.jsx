import { Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

function ManagerProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    return (
        <>
            <h1>ManagerProductDetail</h1>
            <Button
                onClick={() => navigate(`/retailer/product/edit-product/${id}`)}
            >
                Chỉnh sửa
            </Button>
        </>
    );
}

export default ManagerProductDetail;
