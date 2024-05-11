import { Image } from 'antd';

export function MiniCardCartItem({ item, className }) {
    return (
        <>
            <div className={className}>
                <Image
                    width={50}
                    height={'minmax(80px, 100%)'}
                    className="object-cover"
                    src={
                        import.meta.env.VITE_APP_API_URL +
                        item.product.images[0].path
                    }
                    loading="lazy"
                />
                <div className="ml-2 flex flex-col justify-between">
                    <h3 className="line-clamp-1 text-lg font-medium">
                        {item.product.name}
                    </h3>
                    <p className="text-red-600">
                        {item.product.discount > 0 ? (
                            <>
                                <span>
                                    {(
                                        item.product.price *
                                        (1 - item.product.discount / 100)
                                    ).toLocaleString('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND'
                                    })}
                                </span>
                                <span className="ml-2 text-sm line-through">
                                    {item.product.price.toLocaleString(
                                        'vi-VN',
                                        {
                                            style: 'currency',
                                            currency: 'VND'
                                        }
                                    )}
                                </span>
                            </>
                        ) : (
                            item.product.price.toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND'
                            })
                        )}
                    </p>
                </div>
                <div className="ml-auto flex flex-col justify-center">
                    <p className="text-xl font-medium">x{item.quantity}</p>
                </div>
            </div>
        </>
    );
}
