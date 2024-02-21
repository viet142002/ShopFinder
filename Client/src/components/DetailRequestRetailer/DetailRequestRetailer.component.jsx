import { Drawer } from 'antd';

function DetailRequestRetailer({ open, onClose, data = [] }) {
    return (
        <>
            <Drawer
                title="Basic Drawer"
                closable={false}
                placement="right"
                onClose={onClose}
                open={open}
            >
                {data.name}
            </Drawer>
        </>
    );
}

export default DetailRequestRetailer;
