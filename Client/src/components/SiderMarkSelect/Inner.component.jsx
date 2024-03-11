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
                    className="w-full h-[300px] overflow-hidden relative"
                >
                    {info.images.map((image, index) => (
                        <div
                            key={index}
                            className="bg-gray-300 h-[300px] !flex justify-center"
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
                        isCommunity={
                            info.informationType === 'Information_Community'
                        }
                    />
                    <TabInfo info={info} />
                </div>
            </div>
        </>
    );
});

export default Inner;
