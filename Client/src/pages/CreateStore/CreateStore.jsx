import { Form, Input, Button, Col, Row, Select, Radio, Tooltip } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { QuestionCircleOutlined } from '@ant-design/icons';

import { typeLocations } from '../../utils/typeConstraint';
import EditorFormat from '../../components/EditorFormat/EditorFormat';
import InputAddress from '../../components/Input/InputAddress/InputAddress.component';
import InputImage from '../../components/Input/InputImage/InputImage.component';
import { shareStore } from '../../api/communityApi';
import { registerRetailerApi } from '../../api/retailerApi';
import { handleFetch } from '../../utils/expression';
import InputLocation from '../../components/Input/InputLocation/InputLocation.component';

const FormatForm = (values, images, isRegisterRetailer) => {
    const formData = new FormData();
    if (isRegisterRetailer) {
        formData.append('mode', values.mode);
    }
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

function CreateStorePage({ isRegisterRetailer }) {
    const [newImages, setNewImages] = useState([]);
    const [, setDeleteImages] = useState([]);

    const [form] = Form.useForm();

    const dispatch = useDispatch();

    const onFill = (p) => {
        form.setFieldsValue({
            location: {
                lat: p.lat,
                lng: p.lng
            }
        });
    };

    const onFinish = (values) => {
        if (isRegisterRetailer) {
            const formData = FormatForm(values, newImages, true);
            const data = handleFetch(() => registerRetailerApi(formData));

            if (data)
                dispatch({
                    type: 'user/updateUser',
                    payload: {
                        pendingRetailer: {
                            retailer: data.newRetailer,
                            status: 'pending'
                        }
                    }
                });
        } else {
            const formData = FormatForm(values, newImages);
            handleFetch(() => shareStore(formData));
        }
    };

    return (
        <section>
            <div className="my-4 flex items-center justify-center md:my-8">
                <h1 className="text-xl font-bold">
                    {isRegisterRetailer
                        ? 'Đăng ký bán hàng'
                        : 'Chia sẻ cửa hàng'}
                </h1>
            </div>
            <div>
                <Form variant="filled" form={form} onFinish={onFinish}>
                    <Row gutter={{ md: 22 }} justify="center" className="!mx-0">
                        <Col
                            md={10}
                            span={22}
                            className="mb-4 rounded-md md:bg-white md:shadow-card"
                        >
                            <div className="mt-2 flex flex-col gap-2">
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
                                <label htmlFor="phone">Số điện thoại</label>
                                <Form.Item
                                    name="phone"
                                    id="phone"
                                    rules={
                                        isRegisterRetailer && [
                                            {
                                                required: true,
                                                message:
                                                    'Vui lòng nhập số điện thoại cửa hàng'
                                            }
                                        ]
                                    }
                                >
                                    <Input type="number" />
                                </Form.Item>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email">Email</label>
                                <Form.Item
                                    name="email"
                                    id="email"
                                    rules={
                                        isRegisterRetailer && [
                                            {
                                                required: true,
                                                message:
                                                    'Vui lòng nhập địa chỉ email cửa hàng'
                                            }
                                        ]
                                    }
                                >
                                    <Input type="email" />
                                </Form.Item>
                            </div>
                            <div className="create-store flex flex-col gap-2">
                                <InputLocation onFill={onFill} label="Toạ độ" />
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
                            {isRegisterRetailer && (
                                <div className="flex flex-col gap-2">
                                    <div className="space-x-2">
                                        <label htmlFor="mode">
                                            <span>Chế độ</span>
                                        </label>
                                        <Tooltip
                                            title={
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>Bình thường</td>
                                                            <td>
                                                                Quản lý số
                                                                lượng, bán trực
                                                                tuyến và tại
                                                                chổ.
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                Chỉ phục vụ tại
                                                                chổ
                                                            </td>
                                                            <td>
                                                                Chỉ phục vụ tại
                                                                cửa hàng.
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            }
                                            trigger={'click'}
                                        >
                                            <QuestionCircleOutlined />
                                        </Tooltip>
                                    </div>

                                    <Form.Item
                                        name="mode"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Vui lòng chọn loại cửa hàng'
                                            }
                                        ]}
                                    >
                                        <Radio.Group>
                                            <Radio.Button value="normal">
                                                Bình thường
                                            </Radio.Button>
                                            <Radio.Button value="only-pickup">
                                                Chỉ phục vụ tại chổ
                                            </Radio.Button>
                                        </Radio.Group>
                                    </Form.Item>
                                </div>
                            )}
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
                        <Col md={8} span={22}>
                            <div className="flex flex-col gap-2 rounded-md md:bg-white md:px-3 md:py-2 md:shadow-card">
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
                                        {isRegisterRetailer
                                            ? 'Đăng ký'
                                            : 'Chia sẻ'}
                                    </Button>
                                </Form.Item>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>
        </section>
    );
}

export default CreateStorePage;
