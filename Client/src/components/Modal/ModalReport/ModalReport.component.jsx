import { Modal, Form, Input, Button, Space, Select } from 'antd';

import { typeReport } from '../../../utils/typeConstraint';

import { createReportApi } from '../../../api/reportApi';

const ModalReport = ({ open, handleCancel, toId, toType }) => {
    const onFinish = (values) => {
        createReportApi({ ...values, to: toId, toType }).then(() => {
            handleCancel();
        });
    };
    return (
        <Modal
            centered
            title={<h2 className="text-center text-lg md:text-xl">Báo cáo</h2>}
            open={open}
            onCancel={handleCancel}
            footer={null}
        >
            <Form onFinish={onFinish}>
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
