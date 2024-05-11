import { Tag } from 'antd';

import { TYPE } from '~/constants';

function HeaderInfo({ name, rate, type, informationType }) {
    return (
        <div className="px-3 pt-[5px] md:px-sideBarMark">
            <h2 className="text-lg font-medium">
                {name}{' '}
                {informationType === 'Information' && (
                    <Tag color="green" className="ml-2">
                        Cộng đồng
                    </Tag>
                )}
            </h2>
            <p>{rate}</p>
            <p>{TYPE.LOCATION[type].LABEL}</p>
        </div>
    );
}

export default HeaderInfo;
