import { createSlice } from '@reduxjs/toolkit';

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        collapsed: true
    },
    reducers: {
        setCollapsed: (state, action) => {
            state.collapsed = action.payload;
        }
    }
});

export const { setCollapsed } = sidebarSlice.actions;

export default sidebarSlice.reducer;
