import { useEffect, useState } from 'react';

import { getMySharedStore } from '@api/communityApi';
import { Show } from '@components/common';
import { useAuth } from '@hooks/useAuth';

import { ListSharedFilter } from './components';
import { useSearchParams } from 'react-router-dom';
import { CardStore, CardProduct } from '@components/Card';
import { getProducts } from '@api/productApi';
import { PaginationPage } from '@components/common/Pagination';

function ListShared() {
    const [searchParams] = useSearchParams();
    const [data, setData] = useState({
        data: [],
        total: 0,
        page: 1
    });
    const { data: user } = useAuth();
    const category = searchParams.get('category') || 'retailer';
    const name = searchParams.get('name');
    const page = searchParams.get('page') || 1;

    useEffect(() => {
        if (category === 'retailer') {
            getMySharedStore({ user: user._id, name, page }).then((res) => {
                setData({
                    data: res.data.information,
                    page: res.data.page,
                    total: res.data.total
                });
            });
        }
        if (category === 'product') {
            getProducts({
                userCreated: user._id,
                name,
                page,
                includes: ['blocked']
            }).then((res) => {
                setData({
                    data: res.data.products,
                    page: res.data.page,
                    total: res.data.total
                });
            });
        }
    }, [user, category, name, page]);
    return (
        <section className="mx-auto my-6 flex w-[95%] flex-col justify-between md:w-[80%]">
            <div>
                <h1 className="text-center text-2xl font-semibold">
                    Dữ liệu đã chia sẻ
                </h1>
                <div className="mb-4 mt-8 flex justify-center space-x-4">
                    <ListSharedFilter />
                </div>
                <Show>
                    <Show.Then isTrue={data.total > 0}>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            <Show>
                                <Show.Then isTrue={category === 'retailer'}>
                                    {data.data.map((store) => (
                                        <CardStore
                                            key={store._id}
                                            store={store}
                                        />
                                    ))}
                                </Show.Then>
                                <Show.Then isTrue={category === 'product'}>
                                    {data.data.map((product) => (
                                        <CardProduct
                                            key={product._id}
                                            product={product}
                                        />
                                    ))}
                                </Show.Then>
                            </Show>
                        </div>
                    </Show.Then>

                    <Show.Else>
                        <p className="mt-5 text-center text-lg">
                            Bạn chưa chia sẻ bất kỳ cửa hàng nào
                        </p>
                    </Show.Else>
                </Show>
            </div>

            {data.total > 0 && (
                <div className="mt-8 flex justify-center">
                    <PaginationPage total={data.total} current={data.page} />
                </div>
            )}
        </section>
    );
}

export default ListShared;
