import { useSelector } from 'react-redux';
import { useEffect, useState, memo } from 'react';

import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import clsx from 'clsx';

import SiderMartSelectForMobile from './SiderMartSelectForMobile.component';
import Inner from './Inner.component';
import PerfectScrollbar from 'react-perfect-scrollbar';

import 'react-perfect-scrollbar/dist/css/styles.css';

function SiderMarkSelect({ markSelected }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const info = useSelector((state) => state.routing.info);

    useEffect(() => {
        setIsCollapsed(false);
    }, [markSelected]);

    useEffect(() => {
        if (window.innerWidth < 768) {
            setIsMobile(true);
        }

        const resize = () => {
            if (window.innerWidth < 768) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };

        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <section
            className={clsx(
                !isMobile &&
                    'blur-siderInfo absolute top-0 z-[999] h-full w-[400px] bg-white shadow-2xl transition-[left] duration-[500ms]',
                (isCollapsed || !markSelected?.lat) && !isMobile
                    ? '-left-[400px]'
                    : 'left-0'
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

            {markSelected?.lat && !isMobile && (
                <PerfectScrollbar>
                    <Inner info={info} />
                </PerfectScrollbar>
            )}
            {isMobile && (
                <SiderMartSelectForMobile
                    isCollapsed={isCollapsed}
                    setIsCollapsed={setIsCollapsed}
                >
                    <Inner info={info} />
                </SiderMartSelectForMobile>
            )}
        </section>
    );
}

const MemoizedSiderMarkSelect = memo(SiderMarkSelect);
export default MemoizedSiderMarkSelect;
