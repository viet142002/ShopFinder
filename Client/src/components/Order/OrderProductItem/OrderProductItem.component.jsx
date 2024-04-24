// import { DeleteOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import { memo } from 'react';

function OrderProductItem({ product, discount, price, quantity }) {
    return (
        <>
            <div className="mt-2 flex gap-2 px-2">
                <div className="col-span-2 flex items-center gap-4 ">
                    <div className="relative flex items-center justify-center">
                        <Image
                            width={100}
                            height={100}
                            className="object-cover"
                            src={
                                import.meta.env.VITE_APP_API_URL +
                                product.images[0].path
                            }
                        />
                        {discount > 0 && (
                            <div className="absolute left-0 top-2 bg-gray-50 opacity-60">
                                -{discount}%
                            </div>
                        )}
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="flex h-full flex-col justify-between">
                        <h3 className="text-lg font-medium">{product.name}</h3>
                        <div>
                            <p className="text-lg">x{quantity}</p>
                            <p className="text-lg">
                                {discount > 0 ? (
                                    <>
                                        <span className="text-green-600">
                                            {(
                                                price *
                                                (1 - discount / 100)
                                            ).toLocaleString('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND'
                                            })}
                                        </span>
                                        <span className="ml-2 text-sm text-red-500 line-through">
                                            {price.toLocaleString('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND'
                                            })}
                                        </span>
                                    </>
                                ) : (
                                    price.toLocaleString('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND'
                                    })
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const MemoizedOrderProductItem = memo(OrderProductItem);
export default MemoizedOrderProductItem;
