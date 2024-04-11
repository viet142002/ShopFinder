import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Result, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Paragraph, Text } = Typography;
const PaymentFail = () => {
    const navigate = useNavigate();
    return (
        <section className="grid h-svh w-full items-center">
            <Result
                status="error"
                title="Thanh toán thất bại"
                subTitle="Vui lòng thử lại hoặc liên hệ với chúng tôi để được hỗ trợ."
                extra={[
                    <Button
                        className="bg-blue-500"
                        type="primary"
                        key="console"
                        onClick={() => navigate('/')}
                    >
                        Về trang chủ
                    </Button>,
                    <Button key="buy" onClick={() => navigate('/cart')}>
                        Mua lại
                    </Button>
                ]}
            >
                <div className="desc">
                    <Paragraph>
                        <Text
                            strong
                            style={{
                                fontSize: 16
                            }}
                        >
                            Các lỗi có thể xảy ra
                        </Text>
                    </Paragraph>
                    <Paragraph>
                        <CloseCircleOutlined className="site-result-demo-error-icon" />{' '}
                        Bạn đã huỷ giao dịch
                    </Paragraph>
                    <Paragraph>
                        <CloseCircleOutlined className="site-result-demo-error-icon" />{' '}
                        Giao dịch bị lỗi từ phía ngân hàng
                    </Paragraph>
                    <Paragraph>
                        <CloseCircleOutlined className="site-result-demo-error-icon" />{' '}
                        Thẻ của bạn không đủ tiền
                    </Paragraph>
                    <Paragraph>
                        <CloseCircleOutlined className="site-result-demo-error-icon" />{' '}
                        Thẻ của bạn không được phép thanh toán trực tuyến
                    </Paragraph>
                    <Paragraph>
                        <CloseCircleOutlined className="site-result-demo-error-icon" />{' '}
                        Thẻ của bạn đã hết hạn
                    </Paragraph>
                </div>
            </Result>
        </section>
    );
};
export default PaymentFail;
