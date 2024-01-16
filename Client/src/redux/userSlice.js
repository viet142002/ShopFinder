import { createSlice } from '@reduxjs/toolkit';

import { setToken, removeToken } from './storage';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {
            role: 'user'
        },
        isAuth: false,
        isLoading: false
    },
    reducers: {
        setUser: (state, action) => {
            setToken(action.payload.token);
            state.user = action.payload.user;
            state.isAuth = true;
        },
        unsetUser: (state) => {
            removeToken();
            state.user = {};
            state.isAuth = false;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    }
});

export const { setUser, unsetUser, setIsLoading } = userSlice.actions;

export default userSlice.reducer;
