import { useSelector, useDispatch } from 'react-redux';
import { Avatar } from 'antd';
import { useEffect } from 'react';

import { setReadAll } from '../../../redux/notificationSlice';
import { formatTime } from '@utils/formatTime';
import { readNotifications } from '@api/notificationApi';

function NotificationPage() {
    const dispatch = useDispatch();
    const { notifications } = useSelector((state) => state.notification);

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
                    {notifications.map((notification) => (
                        <div
                            key={notification._id}
                            className={
                                notification.isRead
                                    ? 'flex items-center gap-2 rounded-md bg-gray-100 p-2'
                                    : 'flex items-center gap-2 rounded-md bg-white p-2'
                            }
                        >
                            <Avatar
                                size="large"
                                src={
                                    import.meta.env.VITE_APP_API_URL +
                                        notification?.from?.avatar?.path ||
                                    notification?.from?.logo?.path
                                }
                            />
                            <div>
                                <p>
                                    {notification.fromType === 'User' ? (
                                        <strong>
                                            {notification.from.lastname}{' '}
                                            {notification.from.firstname}{' '}
                                        </strong>
                                    ) : (
                                        <strong>
                                            {notification.from.name}
                                        </strong>
                                    )}

                                    {notification.message}
                                </p>
                                <p>{formatTime(notification.createdAt)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default NotificationPage;
