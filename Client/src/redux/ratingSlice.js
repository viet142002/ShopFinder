import { createSlice } from '@reduxjs/toolkit';

const ratingSlice = createSlice({
    name: 'rating',
    initialState: {
        rates: [],
        showModal: {
            isShow: false,
            rate: null
        }
    },
    reducers: {
        setNewRates: (state, action) => {
            state.rates = [...action.payload];
        },
        setContinueRates: (state, action) => {
            state.rates = [...state.rates, ...action.payload];
        },
        setNewRate: (state, action) => {
            state.rates = [action.payload, ...state.rates];
        },
        updateRate: (state, action) => {
            const index = state.rates.findIndex(
                (rate) => rate._id === action.payload._id
            );
            state.rates[index] = action.payload;
        },
        deleteRate: (state, action) => {
            state.rates = state.rates.filter(
                (rate) => rate._id !== action.payload
            );
        },
        setShowModal: (state, action) => {
            state.showModal = {
                isShow: action.payload.isShow,
                rate: action.payload.rate || null
            };
        }
    }
});

export default ratingSlice.reducer;

export const { setNewRates, setShowModal, setNewRate, updateRate, deleteRate } =
    ratingSlice.actions;
