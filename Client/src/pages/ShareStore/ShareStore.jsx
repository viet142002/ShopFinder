import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, Layout, Input, Button, Col, Row, Space, Select } from 'antd';

import InputImage from '../../components/InputImage/InputImage.component';
import EditorFormat from '../../components/EditorFormat/EditorFormat';
import InputAddress from '../../components/InputAddress/InputAddress.component';

import { typeLocations } from '../../utils/typeConstraint';
import { shareStore } from '../../api/communityApi';

const FormatForm = (values, images) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('type', values.type);
    formData.append('location', JSON.stringify(values.location));
    for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
    }
    formData.append('address', JSON.stringify(values.address));
    return formData;
};

function ShareStore() {
    const [newImages, setNewImages] = useState([]);
    const [, setDeleteImages] = useState([]);
    const [isCurrentLocation, setIsCurrentLocation] = useState(false);
    const [form] = Form.useForm();
    const fixedLocation = useSelector((state) => state.routing.fixedLocation);

    const onFill = () => {
        form.setFieldsValue({
            location: {
                lat: fixedLocation.lat,
                lng: fixedLocation.lng
            }
        });
    };

    const onFinish = (values) => {
        const formData = FormatForm(values, newImages);
        shareStore(formData).then((data) => {
            alert(data.message);
        });
    };

    return (
        <Layout className="md:py-2 md:px-4">
            <Layout.Header className="bg-white flex items-center justify-center">
                <h1 className="text-xl font-bold">Chia sẻ cửa hàng</h1>
            </Layout.Header>
            <Layout.Content className="mt-10">
                <Form variant="filled" form={form} onFinish={onFinish}>
                    <Row gutter={{ md: 20 }} justify="center">
                        <Col
                            md={10}
                            span={20}
                            className="md:bg-white rounded-md p-2"
                        >
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name">Tên cửa hàng</label>
                                <Form.Item
                                    name="name"
                                    id="name"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng nhập tên cửa hàng'
                                        }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="lat">Toạ độ</label>
                                <Space
                                    align="baseline"
                                    wrap
                                    style={{
                                        width: '100%'
                                    }}
                                >
                                    <Form.Item
                                        name={['location', 'lat']}
                                        id="lat"
                                        className="m-0"
                                        rules={
                                            !isCurrentLocation && [
                                                {
                                                    required: true,
                                                    message:
                                                        'Vui lòng không bỏ trống'
                                                }
                                            ]
                                        }
                                    >
                                        <Input disabled={isCurrentLocation} />
                                    </Form.Item>
                                    <Form.Item
                                        name={['location', 'lng']}
                                        id="lng"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Vui lòng không bỏ trống'
                                            }
                                        ]}
                                    >
                                        <Input disabled={isCurrentLocation} />
                                    </Form.Item>
                                    <Button
                                        className="bg-orange-200"
                                        htmlType="button"
                                        onClick={() => {
                                            setIsCurrentLocation(
                                                !isCurrentLocation
                                            );
                                            onFill();
                                        }}
                                    >
                                        {isCurrentLocation
                                            ? 'Thủ công'
                                            : 'Tự đông'}
                                    </Button>
                                </Space>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="type">Loại cửa hàng</label>
                                <Form.Item
                                    name="type"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng chọn loại cửa hàng'
                                        }
                                    ]}
                                >
                                    <Select>
                                        {typeLocations.map((type) => (
                                            <Select.Option key={type.value}>
                                                {type.label}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="description">Mô tả</label>
                                <Form.Item
                                    name="description"
                                    id="description"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập mô tả'
                                        }
                                    ]}
                                >
                                    <EditorFormat />
                                </Form.Item>
                            </div>
                            <div className="flex flex-col gap-2">
                                <InputAddress form={form} />
                            </div>
                        </Col>
                        <Col md={8} span={20}>
                            <div className="flex flex-col gap-2 md:bg-white md:p-2 rounded-md">
                                <label htmlFor="image">Hình ảnh</label>
                                <InputImage
                                    setDeleteImages={setDeleteImages}
                                    setNewImages={setNewImages}
                                />
                                <Form.Item className="flex justify-center">
                                    <Button
                                        type="primary"
                                        className="bg-blue-500"
                                        htmlType="submit"
                                    >
                                        Chia sẻ
                                    </Button>
                                </Form.Item>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Layout.Content>
        </Layout>
    );
}

export default ShareStore;
