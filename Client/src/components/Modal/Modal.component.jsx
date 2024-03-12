import { Modal } from 'antd';
function PrimaryModal({
    title = 'Modal',
    centered = true,
    open = false,
    onOk = () => {},
    onCancel = () => {},
    width = 1000,
    footer = null,
    children
}) {
    return (
        <>
            <Modal
                title={title}
                centered={centered}
                open={open}
                onOk={onOk}
                onCancel={onCancel}
                width={width}
                footer={footer}
            >
                {children}
            </Modal>
        </>
    );
}

export default PrimaryModal;
