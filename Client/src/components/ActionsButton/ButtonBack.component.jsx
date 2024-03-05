import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

function ButtonBack() {
    const navigate = useNavigate();
    return <Button onClick={() => navigate(-1)}>Quay lại</Button>;
}

export default ButtonBack;
