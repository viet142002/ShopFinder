import { Modal, Form, Input, Button, Space, Select } from 'antd';

import { createReportApi } from '~/api/reportApi';
import { handleFetch } from '~/utils/index';
import { TYPE } from '~/constants';

const ModalReport = ({ open, handleCancel, toId, toType, from, fromType }) => {
    console.log(toId, toType, from, fromType);
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        const data = handleFetch(
            () =>
                createReportApi({
                    ...values,
                    to: toId,
                    toType,
                    from,
                    fromType
                }),
            handleCancel
        );
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
            <Form
                onFinish={onFinish}
                form={form}
                initialValues={{
                    reason: '',
                    description: ''
                }}
            >
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
                        {Object.keys(TYPE.REPORT).map((key) => (
                            <Select.Option key={key} value={key}>
                                {TYPE.REPORT[key].LABEL}
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
