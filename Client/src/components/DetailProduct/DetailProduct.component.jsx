import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { Carousel, Image, Button, InputNumber } from 'antd';

import { getProductByIdApi } from '../../api/productApi';

import HTMLRenderer from '../../components/HTMLRenderer/HTMLRenderer.component';

function DetailProduct() {
    const { idProduct } = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const quantityRef = useRef();

    const handleIncrease = () => {
        if (product.quantity && quantityRef.current.value < product.quantity)
            return quantityRef.current.value++;
        quantityRef.current.value++;
    };

    const handleDecrease = () => {
        if (quantityRef.current.value > 1) quantityRef.current.value--;
    };

    useEffect(() => {
        getProductByIdApi(idProduct)
            .then((res) => {
                setProduct(res.data);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [idProduct]);

    return (
        <>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="w-full overflow-hidden">
                        <Carousel autoplay>
                            {product?.images?.map((image, index) => (
                                <div
                                    key={index}
                                    className="relative !flex w-full justify-center bg-gray-200"
                                >
                                    <Image
                                        className="!h-64 object-cover"
                                        src={`${
                                            import.meta.env.VITE_APP_API_URL
                                        }${image.path}`}
                                        alt=""
                                    />
                                </div>
                            ))}
                        </Carousel>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">{product.name}</h1>
                        {product.discount && (
                            <h1 className="text-lg text-red-500">
                                {(
                                    product.price *
                                    (1 - product.discount / 100)
                                ).toLocaleString('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND'
                                })}
                                <span className="ml-2 text-sm">
                                    <del>
                                        {product.price.toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND'
                                        })}
                                    </del>
                                </span>
                            </h1>
                        )}

                        {!['only-display', 'not-quantity'].includes(
                            product.status
                        ) && <h1>{product.quantity}</h1>}
                        <div className="rounded-md bg-gray-200 p-2">
                            <HTMLRenderer
                                className="text-wrap"
                                htmlString={product.description}
                            />
                        </div>

                        <div className="mt-auto flex gap-2">
                            <InputNumber
                                className="max-w-[100px]"
                                controls={false}
                                min={1}
                                ref={quantityRef}
                                defaultValue={1}
                                variant="filled"
                                addonBefore={
                                    <button onClick={handleDecrease}>-</button>
                                }
                                addonAfter={
                                    <button onClick={handleIncrease}>+</button>
                                }
                            />
                            <Button
                                type="primary"
                                className="flex-1 bg-blue-500"
                            >
                                Thêm vào giỏ
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default DetailProduct;
