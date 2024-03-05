import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        type: 'all',
        search: '',
        radius: 5
    },
    reducers: {
        setTypeLocation: (state, action) => {
            state.type = action.payload;
        },
        setSearchText: (state, action) => {
            state.search = action.payload;
        },
        setRadius: (state, action) => {
            state.radius = action.payload;
        },
        setValues: (state, action) => {
            return {
                ...state,
                ...action.payload
            };
        }
    }
});

export default searchSlice.reducer;

export const { setTypeLocation, setSearchText, setValues } =
    searchSlice.actions;
