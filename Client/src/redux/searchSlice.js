import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        type: 'all',
        name: '',
        radius: 5
    },
    reducers: {
        setValues: (state, action) => {
            return {
                ...state,
                ...action.payload
            };
        }
    }
});

export default searchSlice.reducer;

export const { setValues } = searchSlice.actions;
