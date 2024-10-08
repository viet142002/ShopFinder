import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { Carousel, Image, Button, InputNumber, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import { getProductByIdApi, deleteProductByUserApi } from '~/api/productApi';
import { addToCartApi } from '~/api/cartApi';
import { handleFetch } from '~/utils/expression';

import HTMLRenderer from '~/components/HTMLRenderer/HTMLRenderer.component';
import ModalReport from '~/components/Modal/ModalReport/ModalReport.component';
import { useAuth } from '~/hooks/useAuth';

function DetailProduct() {
    const { productId, storeId } = useParams();
    const navigate = useNavigate();
    const { data: user } = useAuth();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [openReport, setOpenReport] = useState(false);
    const [isMyProduct, setIsMyProduct] = useState(false);
    const quantityRef = useRef();

    const onClick = ({ key }) => {
        switch (key) {
            case '1':
                setOpenReport(true);
                break;
            case '2':
                navigate(`/stores/${storeId}/edit-product/${productId}`);
                break;
            case '3':
                handleDeleteProduct();
                break;
            default:
                break;
        }
    };

    const items = [
        !isMyProduct && {
            label: 'Báo cáo sản phẩm',
            key: '1'
        },
        isMyProduct && {
            label: 'Chỉnh sửa sản phẩm',
            key: '2'
        },
        isMyProduct && {
            label: 'Xóa sản phẩm',
            key: '3'
        }
    ];

    const handleIncrease = () => {
        if (product.quantity && quantityRef.current.value < product.quantity)
            return quantityRef.current.value++;
    };

    const handleDecrease = () => {
        if (quantityRef.current.value > 1) quantityRef.current.value--;
    };

    const handleAddToCart = () => {
        const data = {
            productId: productId,
            quantity: quantityRef.current.value
        };

        handleFetch(() => addToCartApi(data));
    };

    const handleDeleteProduct = async () => {
        const data = await handleFetch(() => deleteProductByUserApi(productId));
        if (data) {
            navigate(-1);
        }
    };

    useEffect(() => {
        if (user?._id === product?.userCreate) {
            setIsMyProduct(true);
        }
    }, [product, user]);

    useEffect(() => {
        getProductByIdApi(productId)
            .then((res) => {
                setProduct(res.data);
            })
            .finally(() => {
                setLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productId]);

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
                                        src={image.path}
                                        alt=""
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </Carousel>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">{product.name}</h1>
                        <div className="flex justify-between">
                            {product.discount ? (
                                <h2 className="text-lg text-red-500">
                                    {(
                                        product.price *
                                        (1 - product.discount / 100)
                                    ).toLocaleString('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND'
                                    })}
                                    <span className="ml-2 text-sm">
                                        <del>
                                            {product.price.toLocaleString(
                                                'vi-VN',
                                                {
                                                    style: 'currency',
                                                    currency: 'VND'
                                                }
                                            )}
                                        </del>
                                    </span>
                                </h2>
                            ) : (
                                <h1 className="text-lg text-red-500">
                                    {product.price.toLocaleString('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND'
                                    })}
                                </h1>
                            )}

                            <Dropdown menu={{ items, onClick }}>
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        Thêm
                                        <DownOutlined />
                                    </Space>
                                </a>
                            </Dropdown>
                            <ModalReport
                                open={openReport}
                                from={user._id}
                                fromType="User"
                                toId={productId}
                                toType="Product"
                                handleCancel={() => setOpenReport(false)}
                            />
                        </div>

                        {product.status === 'available' && (
                            <h1>
                                <span>Số lượng: </span>
                                <span className="pl-2">{product.quantity}</span>
                            </h1>
                        )}
                        {product.status === 'sold-out' && (
                            <h2 className="text-red-500">
                                Sản phẩm đã hết hàng
                            </h2>
                        )}
                        {product.status === 'stop' && (
                            <h2 className="text-red-500">
                                Sản phẩm ngừng kinh doanh
                            </h2>
                        )}
                        {product.status === 'blocked' && (
                            <h2 className="text-red-500">Sản phẩm bị chặn</h2>
                        )}
                        <div className="rounded-md bg-gray-200 p-2">
                            <HTMLRenderer
                                className="text-wrap"
                                htmlString={product.description}
                            />
                        </div>
                        {product.status === 'only-display' && (
                            <div className="text-red-500">
                                <span>Chỉ bán trực tiếp tại cửa hàng</span>
                            </div>
                        )}
                        {product.status === 'available' && (
                            <div className="mt-auto flex gap-2">
                                <InputNumber
                                    className="max-w-[100px]"
                                    controls={false}
                                    min={1}
                                    ref={quantityRef}
                                    defaultValue={1}
                                    variant="filled"
                                    addonBefore={
                                        <button onClick={handleDecrease}>
                                            -
                                        </button>
                                    }
                                    addonAfter={
                                        <button onClick={handleIncrease}>
                                            +
                                        </button>
                                    }
                                />
                                <Button
                                    type="primary"
                                    className="flex-1 bg-blue-500"
                                    onClick={handleAddToCart}
                                >
                                    Thêm vào giỏ
                                </Button>
                            </div>
                        )}
                        {product.status === 'unavailable' && (
                            <div className="text-red-500">
                                <span>Sản phẩm hết hàng</span>
                            </div>
                        )}
                        {product.status === 'stop' && (
                            <div className="text-red-500">
                                <span>Sản phẩm đã ngừng kinh doanh</span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default DetailProduct;
