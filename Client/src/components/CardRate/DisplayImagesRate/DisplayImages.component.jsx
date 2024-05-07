import { Image } from 'antd';
import { useState } from 'react';

function DisplayImagesRate({ images }) {
    const [isShowMoreImages, setIsShowMoreImages] = useState(false);

    if (images?.length === 0 || !images) return null;

    if (images.length <= 4)
        return (
            <div className="flex flex-wrap">
                {images.map((item, index) => (
                    <div key={index} className="w-1/2 flex-auto">
                        <Image
                            src={import.meta.env.VITE_APP_API_URL + item?.path}
                            alt={item.name}
                            className="aspect-square object-cover"
                            style={{ height: '100%' }}
                        />
                    </div>
                ))}
            </div>
        );
    return (
        <>
            {images.slice(0, 2).map((item, index) => (
                <div key={index} className="w-1/2 flex-auto">
                    <Image
                        src={import.meta.env.VITE_APP_API_URL + item?.path}
                        alt={item.name}
                        className="aspect-square object-cover"
                        style={{ height: '100%' }}
                    />
                </div>
            ))}
            {!isShowMoreImages ? (
                <div className="w-1/2 flex-auto">
                    <div
                        className="relative flex aspect-square w-full cursor-pointer items-center justify-center object-cover"
                        style={{ height: '100%' }}
                        onClick={() => setIsShowMoreImages(true)}
                    >
                        <div
                            className="absolute inset-0 flex items-center justify-center bg-opacity-50 brightness-[.25]"
                            style={{
                                backgroundImage: `url(${
                                    import.meta.env.VITE_APP_API_URL +
                                    images[3]?.path
                                })`
                            }}
                        ></div>
                        <p className="z-10 text-2xl text-white">
                            +{images.length - 3}
                        </p>
                    </div>
                </div>
            ) : (
                images.slice(3, images.length).map((item, index) => (
                    <div key={index} className="w-1/2 flex-auto">
                        <Image
                            src={import.meta.env.VITE_APP_API_URL + item?.path}
                            alt={item.name}
                            className="aspect-square object-cover"
                            style={{ height: '100%' }}
                        />
                    </div>
                ))
            )}
        </>
    );
}

export default DisplayImagesRate;
