// import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { getCartApi } from '../../../api/cartApi';

import CartItem from '../../../components/CartItem/CartItem.component';
import CartTotal from '../../../components/CartTotal/CartTotal.component';

function CartPage() {
    const [cart, setCart] = useState([]);
    useEffect(() => {
        getCartApi().then((res) => {
            setCart(res.data);
        });
    }, []);
    return (
        <>
            <div className="mx-auto mt-10 grid gap-4 md:w-[80%] md:grid-cols-6">
                <section className="col-span-4 p-2 shadow-lg">
                    {cart.length > 0 ? (
                        cart.map((item) => {
                            return (
                                <CartItem
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
                <section className="col-span-2 ">
                    <div className="p-2 shadow-lg">
                        <CartTotal cart={cart} />
                    </div>
                </section>
            </div>
        </>
    );
}

export default CartPage;
