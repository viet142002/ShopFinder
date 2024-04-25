import { Modal, Form, Input, Button, Space, Select } from 'antd';

import { typeReport } from '../../../utils/typeConstraint';

import { createReportApi } from '@api/reportApi';
import { handleFetch } from '@utils/expression';

const ModalReport = ({ open, handleCancel, toId, toType }) => {
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        const data = handleFetch(() => createReportApi({ ...values, to: toId, toType }), handleCancel);
        if (data) {
            form.resetFields();
            handleCancel();
        }
    };
    return (
        <Modal
            centered
            title={<h2 className="text-center text-lg md:text-xl">Báo cáo</h2>}
            open={open}
            onCancel={() => {
                form.resetFields();
                handleCancel();
            }}
            footer={null}
        >
            <Form onFinish={onFinish} form={form} initialValues={{
                reason: '',
                description: '',
            }}>
                <Form.Item
                    name="reason"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng chọn loại báo cáo'
                        }
                    ]}
                >
                    <Select allowClear>
                        {typeReport.map((item, index) => (
                            <Select.Option key={index} value={item.value}>
                                {item.label}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập nội dung báo cáo'
                        }
                    ]}
                >
                    <Input.TextArea
                        placeholder="Nhập nội dung báo cáo"
                        autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                </Form.Item>
                <Form.Item className="mb-0 flex justify-end">
                    <Space>
                        <Button htmlType="button" onClick={handleCancel}>
                            Hủy
                        </Button>
                        <Button
                            type="primary"
                            className="bg-blue-500"
                            htmlType="submit"
                        >
                            Gửi báo cáo
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalReport;
