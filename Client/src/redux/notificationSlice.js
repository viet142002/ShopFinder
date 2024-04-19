import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        notifications: [],
        countNotRead: 0
    },
    reducers: {
        setNotifications: (state, action) => {
            action.payload.forEach((notify) => {
                if (!notify.isRead) {
                    state.countNotRead += 1;
                }
            });
            state.notifications = action.payload;
        },
        setOneNotify: (state, action) => {
            if (!action.payload.isRead) {
                state.countNotRead += 1;
            }
            state.notifications = [action.payload, ...state.notifications];
        },
        setReadAll: (state) => {
            state.notifications.forEach((notify) => {
                notify.isRead = true;
            });
            state.countNotRead = 0;
        }
    }
});

export const { setNotifications, setOneNotify, setReadAll } =
    notificationSlice.actions;

export default notificationSlice.reducer;
