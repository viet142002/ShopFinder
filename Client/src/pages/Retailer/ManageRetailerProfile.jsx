import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

function ManageRetailerProfile() {
    const retailer = useSelector((state) => state.retailer.data);
    console.log(retailer);
    return (
        <>
            <Row>
                <Col span={24}>
                    <h1>Manage Retailer Profile</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>
                        <strong>Username:</strong> {retailer.name}
                    </h2>
                </Col>
                <Col></Col>
            </Row>
        </>
    );
}

export default ManageRetailerProfile;
