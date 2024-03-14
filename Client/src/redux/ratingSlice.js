import { createSlice } from '@reduxjs/toolkit';

const ratingSlice = createSlice({
    name: 'rating',
    initialState: {
        rates: [],
        myRate: null,
        showModal: {
            isShow: false,
            rate: null
        },
        isFiltered: false
    },
    reducers: {
        // set rates and myRate is first request
        setNewRates: (state, action) => {
            state.myRate = action.payload.myRate;
            state.rates = action.payload.rates;
        },
        // set rates is continue request
        setContinueRates: (state, action) => {
            state.rates = [...state.rates, ...action.payload.rate];
            state.myRate = [...state.myRate, ...action.payload.myRate];
        },
        // set new rate
        setNewRate: (state, action) => {
            state.myRate = action.payload;
        },
        // update rate
        updateRate: (state, action) => {
            state.myRate = action.payload;
        },
        // delete rate
        deleteRate: (state) => {
            state.myRate = null;
        },
        emotionalRate: (state, action) => {
            if (state.myRate?._id === action.payload._id) {
                state.myRate.likes = action.payload.likes;
                state.myRate.dislikes = action.payload.dislikes;
                return;
            }
            const index = state.rates.findIndex(
                (rate) => rate._id === action.payload._id
            );
            state.rates[index].likes = action.payload.likes;
            state.rates[index].dislikes = action.payload.dislikes;
        },

        // set show modal
        setShowModal: (state, action) => {
            state.showModal = {
                isShow: action.payload.isShow,
                isEdit: action.payload.isEdit
            };
        }
    }
});

export default ratingSlice.reducer;

export const {
    setNewRates,
    setShowModal,
    setNewRate,
    updateRate,
    deleteRate,
    emotionalRate
} = ratingSlice.actions;
