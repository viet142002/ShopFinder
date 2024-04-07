import { useSelector, useDispatch } from 'react-redux';
import { Avatar } from 'antd';
import { useEffect } from 'react';

import { setReadAll } from '../../../redux/notificationSlice';
import { formatTime } from '@utils/formatTime';

function NotificationPage() {
    const dispatch = useDispatch();
    const { notifications } = useSelector((state) => state.notification);

    useEffect(() => {
        return () => {
            dispatch(setReadAll());
        };
    }, [dispatch]);

    return (
        <>
            <div className="mx-auto w-[max(200px,50%)] md:p-6">
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
                                    notification.fromUser.avatar.path
                                }
                            />
                            <div>
                                <p>
                                    <strong>
                                        {notification.fromUser.lastname}{' '}
                                        {notification.fromUser.firstname}{' '}
                                    </strong>

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
