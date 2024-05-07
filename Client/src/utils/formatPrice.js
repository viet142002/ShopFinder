function formatPrice(price, currency = 'VND', locate = 'vi-VN') {
    return new Intl.NumberFormat(locate, {
        style: 'currency',
        currency: currency
    }).format(price);
}

export { formatPrice };
