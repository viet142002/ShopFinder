import { useSelector } from 'react-redux';
import { useEffect, useState, memo, lazy, Suspense } from 'react';

import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

// import SiderMartSelectForMobile from './SiderMarkSelectForMobile.component';
const SiderMartSelectForMobile = lazy(
    () => import('./SiderMarkSelectForMobile.component')
);
import Inner from './Inner.component';


import { useMobile } from '@hooks/useMobile';

function SiderMarkSelect({ markSelected }) {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const { collapsed } = useSelector((state) => state.sidebar);
    const { isMobile } = useMobile();
    const info = useSelector((state) => state.routing.info);

    useEffect(() => {
        setIsCollapsed(false);
    }, [markSelected]);

    return (
        <section
            className={
                !isMobile
                    ? clsx({
                          'blur-siderInfo fixed top-0 z-[999] h-full w-[400px] bg-white shadow-2xl transition-all duration-[250ms]': true,
                          'left-[70px]': !isCollapsed && collapsed,
                          'left-[200px]': !collapsed && !isCollapsed,
                          '-left-[330px]': isCollapsed && collapsed,
                          '-left-[200px]': isCollapsed && !collapsed
                      })
                    : ''
            }
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
                <PerfectScrollbar
                    className="h-full"
                    options={{
                        suppressScrollX: true,
                        wheelSpeed: 2,
                        wheelPropagation: false,
                        minScrollbarLength: 20,
                        passive: true
                    }}
                >
                    <Inner info={info} />
                </PerfectScrollbar>
            )}
            {markSelected?.lat && isMobile && (
                <Suspense fallback="loading...">
                    <SiderMartSelectForMobile
                        isCollapsed={isCollapsed}
                        setIsCollapsed={setIsCollapsed}
                    >
                        <Inner info={info} />
                    </SiderMartSelectForMobile>
                </Suspense>
            )}
        </section>
    );
}

const MemoizedSiderMarkSelect = memo(SiderMarkSelect);
export default MemoizedSiderMarkSelect;
