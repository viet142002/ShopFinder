import { Form, Input, Button, Select } from 'antd';
import { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';

import InputAddress from '../../Input/InputAddress/InputAddress.component';
import InputLocation from '../../Input/InputLocation/InputLocation.component';

export function FormCheckout({ address, onFill }) {
    const [isChangeAddress, setIsChangeAddress] = useState(false);

    return (
        <>
            <div className="mt-4 flex justify-between gap-4">
                <Form.Item
                    name="lastname"
                    className="flex-1"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập họ!'
                        }
                    ]}
                >
                    <Input placeholder="Họ" />
                </Form.Item>
                <Form.Item
                    name="firstname"
                    className="flex-1"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên!'
                        }
                    ]}
                >
                    <Input placeholder="Tên" />
                </Form.Item>
            </div>
            <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập số điện thoại!'
                    }
                ]}
            >
                <Input placeholder="Số điện thoại" type="number" />
            </Form.Item>
            <Form.Item name="paymentMethod">
                <Select>
                    <Select.Option value="COD">
                        Thanh toán khi nhận hàng
                    </Select.Option>
                    <Select.Option value="VNPay">
                        Thanh toán qua VNPay
                    </Select.Option>
                </Select>
            </Form.Item>

            <InputLocation onFill={onFill} label="Toạ độ" />

            <div className="mb-[8px] flex items-center">
                <p>Đổi địa chỉ</p>
                <Button
                    htmlType="button"
                    size="small"
                    type="text"
                    onClick={() => setIsChangeAddress(!isChangeAddress)}
                    icon={<EditOutlined />}
                />
            </div>
            {!address ? (
                <div className="mt-2">
                    <InputAddress hiddenLabel />
                </div>
            ) : isChangeAddress ? (
                <InputAddress hiddenLabel />
            ) : (
                <>
                    <div
                        className="flex flex-wrap justify-between gap-2"
                        onClick={() => setIsChangeAddress(true)}
                    >
                        <Form.Item
                            name={['address', 'province']}
                            className="mb-2 flex-1"
                        >
                            <Input disabled />
                        </Form.Item>
                        <Form.Item
                            name={['address', 'district']}
                            className="mb-2 flex-1"
                        >
                            <Input disabled />
                        </Form.Item>
                        <Form.Item
                            name={['address', 'ward']}
                            className="mb-2 flex-1"
                        >
                            <Input disabled />
                        </Form.Item>
                    </div>
                    <Form.Item name={['address', 'more']}>
                        <Input disabled />
                    </Form.Item>
                </>
            )}

            <Form.Item name="note" label="Ghi chú">
                <Input.TextArea placeholder="Ghi chú" />
            </Form.Item>
        </>
    );
}
