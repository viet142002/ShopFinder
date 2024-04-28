import { Button, Col, Form, Input, Row, Select, Space } from 'antd';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const FilterInformation = () => {
    const [form] = Form.useForm();
    const [searchParams, setSearchParams] = useSearchParams();
    const onFinish = (values) => {
        setSearchParams((prev) => {
            const prevParams = Object.fromEntries(prev);
            return {
                ...prevParams,
                ...values
            };
        });
    };

    useEffect(() => {
        form.setFieldsValue(Object.fromEntries(searchParams));
    }, [form, searchParams]);
    return (
        <Form
            form={form}
            name="advanced_search"
            onFinish={onFinish}
            initialValues={{
                status: 'all',
                name: '',
                phone: '',
                email: ''
            }}
        >
            <Row gutter={24}>
                <Col span={8} key={1}>
                    <Form.Item name="name" label="Name">
                        <Input placeholder="Name" />
                    </Form.Item>
                </Col>
                <Col span={8} key={2}>
                    <Form.Item name="email" label="Email">
                        <Input placeholder="Email" />
                    </Form.Item>
                </Col>
                <Col span={8} key={3}>
                    <Form.Item name="phone" label="Phone">
                        <Input placeholder="Phone" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={8} key={5}>
                    <Form.Item name="status" label="Status">
                        <Select>
                            <Select.Option value="all">Tất cả</Select.Option>
                            <Select.Option value="normal">
                                Bình thường
                            </Select.Option>
                            <Select.Option value="blocked">Khoá</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={16} key={6}>
                    <div
                        style={{
                            textAlign: 'right'
                        }}
                    >
                        <Space size="small">
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="bg-blue-500"
                            >
                                Tìm kiếm
                            </Button>
                            <Button
                                onClick={() => {
                                    form.resetFields();
                                }}
                            >
                                Clear
                            </Button>
                        </Space>
                    </div>
                </Col>
            </Row>
        </Form>
    );
};
