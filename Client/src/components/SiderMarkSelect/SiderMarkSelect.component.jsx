import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

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

    return (
        <section
            className={clsx(
                'h-full w-[400px] bg-white absolute z-[999] top-0 shadow-2xl transition-all duration-[500ms] blur-siderInfo',
                isCollapsed || !markSelected?.lat ? '-left-[400px]' : 'left-0'
            )}
        >
            {markSelected?.lat && (
                <>
                    <div className="h-[30%]">
                        <img
                            className="w-full h-full object-cover"
                            src={info.image}
                            alt=""
                        />
                    </div>

                    {/* button Collapse */}
                    <div className="absolute top-[50%] z-[998] left-full">
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
                        />
                        <TabInfo />
                    </div>
                </>
            )}
        </section>
    );
}

export default SiderMarkSelect;
