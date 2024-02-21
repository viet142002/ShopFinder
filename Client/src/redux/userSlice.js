import { createSlice } from '@reduxjs/toolkit';

import { setToken, removeToken } from './storage';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: {},
        isAuth: false,
        isLoading: false
    },
    reducers: {
        setUser: (state, action) => {
            setToken(action.payload.token);
            state.data = action.payload.user;
            state.isAuth = true;
        },
        updateUser: (state, action) => {
            state.data = { ...state.data, ...action.payload };
        },
        unsetUser: (state) => {
            removeToken();
            state.data = {};
            state.isAuth = false;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    }
});

export const { setUser, unsetUser, setIsLoading, updateUser } =
    userSlice.actions;

export default userSlice.reducer;
