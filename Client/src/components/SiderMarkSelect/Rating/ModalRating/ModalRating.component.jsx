import { Button, Modal } from 'antd';
import { useState } from 'react';

function ModalRating() {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };
    return (
        <>
            <Button onClick={() => setOpen(true)}>Đánh giá</Button>
            <Modal
                title="Title"
                centered
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Return
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={confirmLoading}
                        onClick={handleOk}
                    >
                        Submit
                    </Button>,
                    <Button
                        key="link"
                        href="https://google.com"
                        type="primary"
                        loading={confirmLoading}
                        onClick={handleOk}
                    >
                        Search on Google
                    </Button>
                ]}
            >
                <p>{modalText}</p>
            </Modal>
        </>
    );
}

export default ModalRating;
