import { useEffect, useState } from 'react';

import { getCartApi } from '~/api/cartApi';

import { CardCartItem, CardCartTotal } from '~/components/Card';

function CartPage() {
    const [cart, setCart] = useState([]);
    const [checked, setChecked] = useState([]);
    useEffect(() => {
        getCartApi().then((res) => {
            setCart(res.data);
        });
    }, []);
    return (
        <main className="mx-2 md:mx-0">
            <div className="mx-auto mt-10 grid gap-4 md:w-[80%] md:grid-cols-6">
                <section className="rounded-md p-2 shadow-card md:col-span-4">
                    {cart.length > 0 ? (
                        cart.map((item) => {
                            return (
                                <CardCartItem
                                    setChecked={setChecked}
                                    key={item.distributor._id}
                                    item={item}
                                    setCart={setCart}
                                />
                            );
                        })
                    ) : (
                        <div className="text-center text-2xl font-semibold">
                            Giỏ hàng trống
                        </div>
                    )}
                </section>
                <section className="md:col-span-2">
                    <div className="rounded-md p-2 shadow-card">
                        <CardCartTotal cart={cart} checked={checked} />
                    </div>
                </section>
            </div>
        </main>
    );
}

export default CartPage;
