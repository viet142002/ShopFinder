import { useState } from 'react';
import { Modal } from 'antd';
function PrimaryModal() {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Modal
                title="Modal 1000px width"
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1000}
                footer={null}
            >
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
            </Modal>
        </>
    );
}

export default PrimaryModal;
