import { Button, Form, DatePicker, Divider } from 'antd';

import { useNavigate, useSearchParams } from 'react-router-dom';

function ActionImportExportProducts() {
    const navigate = useNavigate();
    const [, setSearchParams] = useSearchParams();

    const onFinish = (values) => {
        const data = {
            fromDate: new Date(values.date[0]).toISOString(),
            toDate: new Date(values.date[1]).toISOString()
        };
        setSearchParams(data);
    };

    return (
        <div className="flex flex-col justify-center space-y-3 rounded-md bg-white p-3 shadow-card">
            <Button onClick={() => navigate('./add-warehouse')}>
                Tạo phiếu nhập
            </Button>
            <Divider>OR</Divider>
            <Form
                layout="inline"
                onFinish={onFinish}
                className="flex w-full justify-center gap-3"
            >
                <Form.Item name="date" className="!m-0">
                    <DatePicker.RangePicker />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="bg-blue-500"
                    >
                        Tìm kiếm
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default ActionImportExportProducts;
