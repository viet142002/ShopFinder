// import { useState } from 'react';
import Sheet from 'react-modal-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { setShowRouting } from '../../redux/routingSlice';
import { useEffect, useRef } from 'react';

function SiderMartSelectForMobile({ isCollapsed, setIsCollapsed, children }) {
    const dispatch = useDispatch();
    const { showRouting } = useSelector((state) => state.routing);

    const ref = useRef();
    const snapTo = (i) => ref.current?.snapTo(i);

    useEffect(() => {
        if (showRouting) {
            snapTo(2);
        }
    }, [showRouting]);

    const handleClosed = () => {
        setIsCollapsed(true);
        if (showRouting) dispatch(setShowRouting());
    };

    return (
        <>
            <Sheet
                ref={ref}
                isOpen={!isCollapsed}
                onClose={handleClosed}
                snapPoints={[-50, 0.6, 100, 0]}
                initialSnap={1}
            >
                <Sheet.Container>
                    <Sheet.Header />
                    <Sheet.Content>
                        <Sheet.Scroller>{children}</Sheet.Scroller>
                    </Sheet.Content>
                </Sheet.Container>
                {/* <Sheet.Backdrop /> */}
            </Sheet>
        </>
    );
}

export default SiderMartSelectForMobile;
