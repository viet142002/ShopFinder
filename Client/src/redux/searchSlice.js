import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        type: 'all',
        search: ''
    },
    reducers: {
        setTypeLocation: (state, action) => {
            state.type = action.payload;
        },
        setSearchText: (state, action) => {
            state.search = action.payload;
        }
    }
});

export default searchSlice.reducer;

export const { setTypeLocation, setSearchText } = searchSlice.actions;
