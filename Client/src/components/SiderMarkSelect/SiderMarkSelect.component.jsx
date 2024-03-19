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

    return (
        <section
            className={clsx(
                'blur-siderInfo absolute top-0 z-[999] h-full w-[400px] bg-white shadow-2xl transition-[left] duration-[500ms]',
                isCollapsed || !markSelected?.lat ? '-left-[400px]' : 'left-0'
            )}
        >
            {/* button Collapse */}
            <div className="absolute left-full top-[50%] z-[998] hidden md:block">
                <button
                    className="rounded-[0_4px_4px_0] bg-white px-1 py-4 opacity-95 shadow-inner"
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
