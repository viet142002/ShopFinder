import {
    Form,
    Input,
    Button,
    Col,
    Row,
    Space,
    Select,
    Layout,
    Radio,
    Tooltip
} from 'antd';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { QuestionCircleOutlined } from '@ant-design/icons';

import { typeLocations } from '../../utils/typeConstraint';
import EditorFormat from '../../components/EditorFormat/EditorFormat';
import InputAddress from '../../components/InputAddress/InputAddress.component';
import InputImage from '../../components/InputImage/InputImage.component';
import { shareStore } from '../../api/communityApi';
import { registerRetailerApi } from '../../api/retailerApi';
import { handleFetch } from '../../utils/expression';

import './createStore.scss';

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
    const [isCurrentLocation, setIsCurrentLocation] = useState(false);
    const [form] = Form.useForm();
    const fixedLocation = useSelector((state) => state.routing.fixedLocation);
    const dispatch = useDispatch();

    const onFill = () => {
        form.setFieldsValue({
            location: {
                lat: fixedLocation.lat,
                lng: fixedLocation.lng
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
        <Layout className="md:px-4 md:py-2">
            <Layout.Header className="flex items-center justify-center bg-white">
                <h1 className="text-xl font-bold">
                    {isRegisterRetailer
                        ? 'Đăng ký bán hàng'
                        : 'Chia sẻ cửa hàng'}
                </h1>
            </Layout.Header>
            <Layout.Content className="mt-10">
                <Form variant="filled" form={form} onFinish={onFinish}>
                    <Row gutter={{ md: 20 }} justify="center">
                        <Col
                            md={10}
                            span={20}
                            className="rounded-md p-2 md:bg-white"
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
                            <div className="create-store flex flex-col gap-2">
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
                                        style={{
                                            marginBottom: '10px'
                                        }}
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
                                        style={{
                                            marginBottom: '10px'
                                        }}
                                    >
                                        <Input disabled={isCurrentLocation} />
                                    </Form.Item>
                                    <Button
                                        className="flex-shrink-0 bg-orange-200"
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
                        <Col md={8} span={20}>
                            <div className="flex flex-col gap-2 rounded-md md:bg-white md:p-2">
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

export default CreateStorePage;
