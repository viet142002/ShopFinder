import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import clsx from 'clsx';

import Inner from './Inner.component';

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
                'h-full w-[400px] bg-white absolute z-[999] top-0 shadow-2xl transition-[left] duration-[500ms] blur-siderInfo',
                isCollapsed || !markSelected?.lat ? '-left-[400px]' : 'left-0'
            )}
        >
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

            {markSelected?.lat && <Inner info={info} />}
        </section>
    );
}

export default SiderMarkSelect;
