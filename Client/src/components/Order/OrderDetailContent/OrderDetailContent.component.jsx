import { Tag } from 'antd';

import OrderProductItem from '../OrderProductItem/OrderProductItem.component';
import RenderAddress from '@components/RenderAddress';

import { typeOrderStatus } from '@utils/typeConstraint';
import { formatDate } from '@utils/formatDate';
import { formatPrice } from '@utils/formatPrice';

function OrderDetailItem({ order, children }) {
    return (
        <div className="mx-2 mt-10 md:mx-10">
            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <div className="rounded-lg p-2 shadow-xl">
                        <h2>{order.distributor.name}</h2>
                        {order.orderItems.map((prod) => (
                            <OrderProductItem
                                key={prod._id}
                                product={prod.product}
                                discount={prod.discount}
                                price={prod.price}
                                quantity={prod.quantity}
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <div className="rounded-lg p-2 shadow-xl">
                        <h2 className="mb-2 text-lg font-medium">
                            Thông tin đơn hàng
                        </h2>
                        <p>
                            <span>Người nhận: </span>
                            <span className="text-lg font-[400]">
                                {order.fullName}
                            </span>
                        </p>

                        <p>
                            <span>Điện thoại: </span>
                            <span className="text-lg font-[400]">
                                {order.phone}
                            </span>
                        </p>

                        <p>
                            <span>Phương thức thanh toán: </span>
                            <span className="text-lg font-[400]">
                                {order.paymentMethod}
                            </span>
                        </p>

                        <p>
                            <span>Toạ độ: </span>
                            <span className="text-lg font-[400]">
                                {order.location.lat}-{order.location.lng}
                            </span>
                        </p>

                        <div>
                            <span>Địa chỉ: </span>
                            <RenderAddress
                                address={order.shippingAddress}
                                className="inline text-lg font-[400]"
                            />
                        </div>

                        <p>
                            <span>Ghi chú: </span>
                            <span className="text-lg font-[400]">
                                {order.note}
                            </span>
                        </p>

                        <p>
                            <span>Trạng thái: </span>
                            <span>
                                <Tag
                                    color={
                                        typeOrderStatus.find(
                                            (status) =>
                                                status.value === order.status
                                        ).color
                                    }
                                >
                                    {
                                        typeOrderStatus.find(
                                            (status) =>
                                                status.value === order.status
                                        ).label
                                    }
                                </Tag>
                            </span>
                        </p>

                        <p>
                            <span>Ngày đặt: </span>
                            <span className="text-lg font-[400]">
                                {formatDate(order.createdAt)}
                            </span>
                        </p>

                        {order.deliveredAt && (
                            <p>
                                <span>Ngày giao: </span>
                                <span className="text-lg font-[400]">
                                    {formatDate(order.deliveredAt)}
                                </span>
                            </p>
                        )}

                        <p className="text-right">
                            <span>Phí sản phẩm: </span>
                            <span className="text-lg font-[400]">
                                {formatPrice(order.itemsPrice)}
                            </span>
                        </p>

                        <p className="text-right">
                            <span>Phí vận chuyển: </span>
                            <span className="text-lg font-[400]">
                                {formatPrice(order.shippingPrice)}
                            </span>
                        </p>

                        <p className="text-right">
                            <span className="text-lg font-[400]">Tổng: </span>
                            <span className="text-xl font-medium text-red-500">
                                {formatPrice(order.totalPrice)}
                            </span>
                        </p>

                        <div className="mt-2">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetailItem;
