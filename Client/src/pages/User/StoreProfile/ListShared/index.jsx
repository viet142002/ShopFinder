import { useEffect, useState } from 'react';

import { getMySharedStore } from '@api/communityApi';
import { Show } from '@components/common';
import { useAuth } from '@hooks/useAuth';

import { ListSharedFilter } from './components';
import { useSearchParams } from 'react-router-dom';
import { CardStore, CardProduct } from '@components/Card';
import { getProducts } from '@api/productApi';

function ListShared() {
    const [searchParams] = useSearchParams();
    const [data, setData] = useState([]);
    const { data: user } = useAuth();
    const category = searchParams.get('category') || 'retailer';
    const name = searchParams.get('name');

    useEffect(() => {
        if (category === 'retailer') {
            getMySharedStore({ user: user._id, name }).then((res) => {
                setData(res.data.information);
            });
        }
        if (category === 'product') {
            getProducts({ userCreated: user._id, name }).then((res) => {
                setData(res.data.products);
            });
        }
    }, [user, category, name]);
    return (
        <section className="mx-auto my-6 w-[95%] md:w-[80%]">
            <h1 className="text-center text-2xl font-semibold">
                Danh sách dữ liệu đã chia sẻ
            </h1>
            <div className="mb-4 mt-8 flex justify-center space-x-4">
                <ListSharedFilter />
            </div>
            <Show>
                <Show.Then isTrue={data.length > 0}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        <Show>
                            <Show.Then isTrue={category === 'retailer'}>
                                {data.map((store) => (
                                    <CardStore key={store._id} store={store} />
                                ))}
                            </Show.Then>
                            <Show.Then isTrue={category === 'product'}>
                                {data.map((product) => (
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
        </section>
    );
}

export default ListShared;
