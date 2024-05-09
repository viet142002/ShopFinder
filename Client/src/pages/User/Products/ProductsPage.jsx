import { useEffect, useState } from 'react';
import {
    useParams,
    useLocation,
    Link,
    useSearchParams
} from 'react-router-dom';
import { Button } from 'antd';

import { getProducts } from '@api/productApi';
import { CardProduct } from '@components/Card';
import { PaginationPage } from '@components/common/Pagination';

function ProductsPage() {
    const [searchParams] = useSearchParams();
    const page = searchParams.get('page') || 1;
    const { state } = useLocation();
    const { storeId } = useParams();
    const [data, setData] = useState({
        products: [],
        total: 0,
        page: 1,
        isLoading: true
    });

    useEffect(() => {
        getProducts({ distributor: storeId, page })
            .then((res) => {
                setData({
                    products: res.data.products,
                    total: res.data.total,
                    page: res.data.page
                });
            })
            .finally(() => {
                setData((prevData) => ({
                    ...prevData,
                    isLoading: false
                }));
            });
    }, [storeId, page]);

    return (
        <section className="flex h-full flex-col justify-between py-4">
            <div>
                <div className="mb-6 mt-2">
                    <h1 className="text-center text-2xl font-bold">
                        Danh sách sản phẩm
                    </h1>
                </div>

                {state?.type === 'Information' && (
                    <div className="flex justify-center p-4">
                        <Link to={`/stores/${storeId}/add-product`}>
                            <Button type="primary" className="bg-blue-500">
                                Đóng góp
                            </Button>
                        </Link>
                    </div>
                )}

                {data.isLoading ? (
                    <h1>Loading...</h1>
                ) : data.products && data.products.length > 0 ? (
                    <>
                        <div className="mx-auto grid w-[calc(100%-30px)] grid-cols-2 gap-[15px] md:grid-cols-5 md:gap-8">
                            {data.products.map((product, index) => (
                                <CardProduct
                                    product={product}
                                    storeId={storeId}
                                    key={index}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <h2 className="text-center text-lg font-medium">
                        Không có sản phẩm nào trong cửa hàng
                    </h2>
                )}
            </div>

            {data.products.length > 0 && (
                <div className="mt-4 flex justify-center">
                    <PaginationPage current={data.page} total={data.total} />
                </div>
            )}
        </section>
    );
}

export default ProductsPage;
