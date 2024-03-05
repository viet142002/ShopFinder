import { Button, Form, DatePicker, Divider } from 'antd';

import { useNavigate } from 'react-router-dom';

function ActionImportExportProducts({ isImport }) {
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    return (
        <div className="space-y-3 flex justify-center flex-col p-3">
            <Button onClick={() => navigate('./add-warehouse')}>
                Tạo phiếu {isImport ? 'nhập' : 'xuất'}
            </Button>
            <Divider>OR</Divider>
            <Form
                layout="inline"
                onFinish={onFinish}
                className="flex justify-center w-full gap-3"
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
