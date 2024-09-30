import { useSelector, useDispatch } from 'react-redux';
import { Avatar } from 'antd';
import { useEffect } from 'react';

import { setReadAll } from '~/redux/notificationSlice';
import { formatTime } from '~/utils/index';
import { readNotifications } from '~/api/notificationApi';
import { Link } from 'react-router-dom';

function NotificationPage() {
    const dispatch = useDispatch();
    const { notifications } = useSelector((state) => state.notification);
    console.log('🚀 ~ NotificationPage ~ notifications:', notifications);

    useEffect(() => {
        return () => {
            readNotifications().then(() => {
                dispatch(setReadAll());
            });
        };
    }, [dispatch]);

    return (
        <>
            <div className="mx-auto w-[95%] md:w-[60%] md:p-6">
                <h1 className="text-center text-xl font-bold">Thông báo</h1>

                <div className="mt-4 space-y-2">
                    {notifications.length === 0 && (
                        <div className="text-center">
                            Không có thông báo nào
                        </div>
                    )}
                    {notifications.map((notification, index) => (
                        <Link
                            to={
                                notification.type === 'ORDER' &&
                                `/order/${notification.target}`
                            }
                            key={notification._id + index}
                        >
                            <div
                                className={
                                    notification.isRead
                                        ? 'flex items-center gap-2 rounded-md bg-gray-100 p-2'
                                        : 'flex items-center gap-2 rounded-md bg-white p-2'
                                }
                            >
                                <Avatar
                                    className="flex-shrink-0"
                                    size="large"
                                    src={
                                        notification.fromType === 'User'
                                            ? notification.from?.avatar?.path || '/avt-default.jpg'
                                            : notification.from.logo.path
                                    }
                                />
                                <div>
                                    <p>
                                        {notification.fromType === 'User' ? (
                                            <strong>
                                                {notification.from.fullname}{' '}
                                            </strong>
                                        ) : (
                                            <strong>
                                                {notification.from.name}{' '}
                                            </strong>
                                        )}
                                        {notification.message}
                                    </p>
                                    <p>{formatTime(notification.createdAt)}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

export default NotificationPage;
