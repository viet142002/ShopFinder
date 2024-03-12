import { Image } from 'antd';
import { useState } from 'react';

function DisplayImagesRate({ images }) {
    const [isShowMoreImages, setIsShowMoreImages] = useState(false);
    return (
        <>
            {images.length > 0 && (
                <div className="flex flex-wrap">
                    {images.slice(0, 3).map((item) => (
                        <div key={item._id} className="w-1/2 flex-auto">
                            <Image
                                src={
                                    import.meta.env.VITE_APP_API_URL + item.path
                                }
                                alt={item.name}
                                className="aspect-square object-cover"
                                style={{ height: '100%' }}
                            />
                        </div>
                    ))}
                    {images.length === 3 && (
                        <div key={images[3]._id} className="w-1/2 flex-auto">
                            <Image
                                src={
                                    import.meta.env.VITE_APP_API_URL +
                                    images[3].path
                                }
                                alt={images[3].name}
                                className="aspect-square object-cover"
                                style={{ height: '100%' }}
                            />
                        </div>
                    )}
                    {images.length > 3 && !isShowMoreImages ? (
                        <div className="w-1/2 flex-auto">
                            <div
                                className="aspect-square object-cover relative flex justify-center items-center cursor-pointer w-full"
                                style={{ height: '100%' }}
                                onClick={() => setIsShowMoreImages(true)}
                            >
                                <div
                                    className="absolute inset-0 bg-opacity-50 flex items-center justify-center brightness-[.25]"
                                    style={{
                                        backgroundImage: `url(${
                                            import.meta.env.VITE_APP_API_URL +
                                            images[3].path
                                        })`
                                    }}
                                ></div>
                                <p className="text-white text-2xl z-10">
                                    +{images.length - 3}
                                </p>
                            </div>
                        </div>
                    ) : (
                        images.slice(3, images.length).map((item) => (
                            <div key={item._id} className="w-1/2 flex-auto">
                                <Image
                                    src={
                                        import.meta.env.VITE_APP_API_URL +
                                        item.path
                                    }
                                    alt={item.name}
                                    className="aspect-square object-cover"
                                    style={{ height: '100%' }}
                                />
                            </div>
                        ))
                    )}
                </div>
            )}
        </>
    );
}

export default DisplayImagesRate;
