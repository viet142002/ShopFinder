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
            const index = action.payload.rates?.findIndex(
                (rate) => rate._id === action.payload.myRate?._id
            );
            if (index !== -1) {
                state.isFiltered = true;
                action.payload.rates.splice(index, 1);
                state.rates = [...action.payload.rates];
            } else {
                state.rates = action.payload.rates;
            }
        },
        // set rates is continue request
        setContinueRates: (state, action) => {
            if (state.isFiltered) {
                state.rates = [...state.rates, ...action.payload.rate];
            } else {
                const index = state.rates.findIndex(
                    (rate) => rate._id === action.payload.myRate._id
                );
                if (index !== -1) {
                    state.isFiltered = true;
                    state.rates = [
                        ...state.rates,
                        ...action.rates.splice(index, 1)
                    ];
                } else {
                    state.rates = [...state.rates, ...action.rates];
                }
            }
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

export const { setNewRates, setShowModal, setNewRate, updateRate, deleteRate } =
    ratingSlice.actions;
