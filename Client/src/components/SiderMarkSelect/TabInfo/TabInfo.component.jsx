import { Tabs } from 'antd';

import Overview from '../Overview/Overview.component';
import RatingInfo from '../Rating/RatingInfo.component';
import HTMLRenderer from '../../HTMLRenderer/HTMLRenderer.component';

function TabInfo({ info }) {
    const items = [
        {
            key: 1,
            label: 'Tổng quan',
            children: <Overview info={info} />
        },
        {
            key: 2,
            label: 'Đánh giá',
            children: <RatingInfo info={info} />
        },
        {
            key: 3,
            label: 'Giới thiệu',
            children: (
                <HTMLRenderer
                    className="md:px-sideBarMark px-4"
                    htmlString={info.description}
                />
            )
        }
    ];

    return (
        <Tabs items={items} defaultActiveKey={1} centered tabBarGutter={70} />
    );
}

export default TabInfo;
