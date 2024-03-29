/*
    data: [
        {
            distributor: {}
            items: [
                {
                    product: {}
                    quantity: 1
                }
            ]
        }
    ]
*/

export function calculatePrice(data) {
    return data.reduce((acc, item) => {
        return (
            acc +
            item.items.reduce((acc, prod) => {
                if (!prod.isChecked) return acc;
                return (
                    acc +
                    prod.product.price *
                        (1 - prod.product.discount / 100) *
                        prod.quantity
                );
            }, 0)
        );
    }, 0);
}

export function calculateTotalQuantity(data) {
    const total = data.reduce((acc, item) => {
        return (
            acc +
            item.items.reduce((acc, prod) => {
                return acc + prod.quantity;
            }, 0)
        );
    }, 0);

    return total;
}

export function calculatePriceFromTwoLocation(shippingPrice, price) {
    return shippingPrice + price;
}
