import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { Carousel, Image } from 'antd';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import clsx from 'clsx';

import HeaderInfo from './HeaderInfo/HeaderInfo.component';
import TabInfo from './TabInfo/TabInfo.component';

function SiderMarkSelect({ markSelected }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const info = useSelector((state) => state.routing.info);

    useEffect(() => {
        setIsCollapsed(false);
    }, [markSelected]);

    console.log('info', info);
    return (
        <section
            className={clsx(
                'h-full w-[400px] bg-white absolute z-[999] top-0 shadow-2xl transition-all duration-[500ms] blur-siderInfo',
                isCollapsed || !markSelected?.lat ? '-left-[400px]' : 'left-0'
            )}
        >
            {markSelected?.lat && (
                <>
                    {/* <div> */}
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
                    {/* </div> */}

                    {/* button Collapse */}
                    <div className="hidden md:block absolute top-[50%] z-[998] left-full">
                        <button
                            className="px-1 py-4 bg-white opacity-95 shadow-inner rounded-[0_4px_4px_0]"
                            onClick={() => setIsCollapsed(!isCollapsed)}
                        >
                            {isCollapsed ? (
                                <CaretRightOutlined />
                            ) : (
                                <CaretLeftOutlined />
                            )}
                        </button>
                    </div>

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
                </>
            )}
        </section>
    );
}

export default SiderMarkSelect;
