import { Button, Modal, Form, InputNumber } from 'antd';
import { useState } from 'react';

import { addPriceShip } from '../../../api/priceShippingApi';

function ModalAddRangePrice({
    isOpenModal,
    setIsOpenModal,
    setPriceShip,
    priceShip
}) {
    const [error, setError] = useState();

    const onFinish = (values) => {
        setError('');
        if (
            priceShip.some(
                (item) =>
                    values.from >= item.range.from &&
                    values.from < item.range.to
            )
        ) {
            setError('Khoảng cách đã tồn tại');
            return;
        }

        if (values.from >= values.to) {
            setError('Khoảng cách không hợp lệ');
            return;
        }

        addPriceShip(values)
            .then((res) => {
                setPriceShip((prev) => [...prev, res.data]);
            })
            .finally(() => {
                setIsOpenModal(false);
            });
    };
    return (
        <Modal
            title="Thêm phí vận chuyển"
            open={isOpenModal}
            onCancel={() => {
                setIsOpenModal(false);
            }}
            footer={null}
        >
            <Form variant="filled" layout="vertical" onFinish={onFinish}>
                <p className="mb-2">Khoảng cách (km)</p>
                <div className="flex">
                    <Form.Item
                        name="from"
                        className="flex-1"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập khoảng cách'
                            }
                        ]}
                    >
                        <InputNumber className="w-full" min={0} max={100} />
                    </Form.Item>
                    <span className="mx-2">-</span>
                    <Form.Item
                        name="to"
                        className="flex-1"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập khoảng cách'
                            }
                        ]}
                    >
                        <InputNumber className="w-full" min={0} max={100} />
                    </Form.Item>
                </div>

                <Form.Item
                    label="Giá"
                    name="price"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập giá'
                        }
                    ]}
                >
                    <InputNumber
                        className="w-full"
                        formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        }
                    />
                </Form.Item>

                {error && (
                    <p className="mb-4 text-center text-sm text-red-500">
                        {error}
                    </p>
                )}

                <div className="flex justify-center">
                    <Button
                        key="submit"
                        type="primary"
                        htmlType="submit"
                        className="bg-blue-500"
                    >
                        Thêm
                    </Button>
                </div>
            </Form>
        </Modal>
    );
}

export default ModalAddRangePrice;
