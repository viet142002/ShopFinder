import { Layout } from 'antd';

import { useMobile, useClickOutside } from '@hooks/index';
import { useSelector, useDispatch } from 'react-redux';

import { setCollapsed } from '@redux/sidebarSlice';
import { memo, useRef } from 'react';

const SidebarContainer = memo(function SidebarContainer({
    MenuTop,
    MenuBottom,
    ...props
}) {
    const dispatch = useDispatch();
    const { isMobile } = useMobile();
    const collapsed = useSelector((state) => state.sidebar.collapsed);

    const setIsCollapsed = (value) => {
        dispatch(setCollapsed(value));
    };

    const ref = useRef();

    useClickOutside(ref, () => {
        isMobile && setIsCollapsed(true);
    });

    return (
        <Layout.Sider
            ref={ref}
            theme="light"
            className="z-[1000] h-svh bg-opacity-50"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                bottom: 0
            }}
            trigger={null}
            collapsedWidth={isMobile ? 0 : 70}
            collapsed={collapsed}
            {...props}
        >
            <div className="flex h-full flex-col justify-between">
                <div>
                    <div className="flex h-16 items-center justify-center">
                        <button
                            onClick={() => setIsCollapsed(!collapsed)}
                            className="flex items-center"
                        >
                            <img
                                src="/logo_removebg.png"
                                alt="logo"
                                className="h-10 w-10"
                            />
                            <span
                                className={
                                    'absolute text-xl font-bold opacity-0 transition-all duration-500' +
                                    (!collapsed && ' relative opacity-100')
                                }
                            >
                                ShopFinder
                            </span>
                        </button>
                    </div>
                    {MenuTop}
                </div>
                {MenuBottom}
            </div>
        </Layout.Sider>
    );
});

export default SidebarContainer;
