import { Tag } from 'antd';

import OrderProductItem from '../OrderProductItem/OrderProductItem.component';
import RenderAddress from '@components/RenderAddress';
import MiniMap from '@components/Map/MiniMap';

import { typeOrderStatus } from '@utils/typeConstraint';
import { formatDate } from '@utils/formatDate';
import { formatPrice } from '@utils/formatPrice';

function OrderDetailItem({ order, children }) {
    console.log('🚀 ~ OrderDetailItem ~ order:', order);
    return (
        <div className="m-4 md:mx-10 md:mt-10">
            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                    <div className="rounded-lg bg-white p-2 shadow-card">
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
                    <div className="h-80 overflow-hidden rounded-lg shadow-card">
                        <MiniMap coordinates={order.location} />
                    </div>
                </div>
                <div>
                    <div className="rounded-lg bg-white p-2 shadow-card">
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
                        {/* bank_code : "NCB" bank_tran_no : "VNP14384121" card_type
                        : "ATM" pay_date : 20240419095002 price : 5310000
                        response_code : "00" transaction_no : "14384121" */}
                        {order?.detailPayment && (
                            <div>
                                <p>Chi tiết thanh toán: </p>
                                <ul className="ml-2 rounded-md bg-gray-100 p-2">
                                    <li>
                                        <span>Ngân hàng: </span>
                                        <span className="text-lg font-[400]">
                                            {order.detailPayment.bank_code}
                                        </span>
                                    </li>
                                    <li>
                                        <span>Mã giao dịch: </span>
                                        <span className="text-lg font-[400]">
                                            {order.detailPayment.bank_tran_no}
                                        </span>
                                    </li>
                                    <li>
                                        <span>Loại thẻ: </span>
                                        <span className="text-lg font-[400]">
                                            {order.detailPayment.card_type}
                                        </span>
                                    </li>
                                    <li>
                                        <span>Ngày thanh toán: </span>
                                        <span className="text-lg font-[400]">
                                            {formatDate(
                                                order.detailPayment.pay_date
                                            )}
                                        </span>
                                    </li>
                                    <li>
                                        <span>Số tiền: </span>
                                        <span className="text-lg font-[400]">
                                            {formatPrice(
                                                order.detailPayment.price
                                            )}
                                        </span>
                                    </li>
                                    <li>
                                        <span>Mã phản hồi: </span>
                                        {order.detailPayment.response_code ==
                                        '00' ? (
                                            <span className="text-lg font-[400] text-green-500">
                                                Thành công
                                            </span>
                                        ) : (
                                            <span className="text-lg font-[400] text-red-500">
                                                Thất bại
                                            </span>
                                        )}
                                    </li>
                                    <li>
                                        <span>Mã giao dịch: </span>
                                        <span className="text-lg font-[400]">
                                            {order.detailPayment.transaction_no}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        )}
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
