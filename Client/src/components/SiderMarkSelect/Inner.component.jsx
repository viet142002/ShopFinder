import { memo } from 'react';
import { Carousel, Image } from 'antd';

import HeaderInfo from './HeaderInfo/HeaderInfo.component';
import TabInfo from './TabInfo/TabInfo.component';

const Inner = memo(function Inner({ info }) {
    return (
        <>
            <div className="overflow-auto md:h-screen">
                <Carousel
                    autoplay
                    autoplaySpeed={5000}
                    effect="fade"
                    dotPosition="bottom"
                    className="relative h-[300px] w-full overflow-hidden"
                >
                    {info.images.map((image, index) => (
                        <div
                            key={index}
                            className="!flex h-[300px] justify-center bg-gray-300"
                        >
                            <Image
                                className="!h-full"
                                src={
                                    import.meta.env.VITE_APP_API_URL +
                                    image.path
                                }
                                alt=""
                            />
                        </div>
                    ))}
                </Carousel>

                <div>
                    <HeaderInfo
                        name={info.name}
                        rate={info.rate}
                        type={info.type}
                        informationType={info.informationType}
                    />
                    <TabInfo info={info} />
                </div>
            </div>
        </>
    );
});

export default Inner;
