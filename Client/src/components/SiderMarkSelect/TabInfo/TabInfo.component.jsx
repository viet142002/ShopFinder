import { Tabs } from 'antd';

import Overview from '../Overview/Overview.component';
import RatingInfo from '../Rating/RatingInfo.component';

function TabInfo() {
    const items = [
        {
            key: 1,
            label: 'Tổng quan',
            children: <Overview />
        },
        {
            key: 2,
            label: 'Đánh giá',
            children: <RatingInfo />
        },
        {
            key: 3,
            label: 'Giới thiệu',
            children: <div>Giới thiệu</div>
        }
    ];

    return (
        <Tabs items={items} defaultActiveKey={1} centered tabBarGutter={70} />
    );
}

export default TabInfo;
