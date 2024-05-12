import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    rates: [],
    myRate: null,
    showModal: {
        title: 'Đánh giá',
        to: null,
        toType: 'User',
        from: null,
        fromType: 'User',
        isShow: false,
        isEdit: false
    },
    isFiltered: false
};

const ratingSlice = createSlice({
    name: 'rating',
    initialState: initialState,
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
            console.log(
                '🚀 ~ file: ratingSlice.js ~ line 57 ~ action',
                action.payload
            );
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
                ...action.payload,
                rateId: action.payload._id,
                title: action.payload.title,
                to: action.payload.to,
                toType: action.payload.toType,
                from: action.payload.from,
                fromType: action.payload.fromType,
                isShow: true,
                isEdit: action.payload?.isEdit || false,
                rate: action.payload?.rate,
                comment: action.payload?.comment
            };
        },
        setCloseModal: (state) => {
            state.showModal = initialState.showModal;
        },
        replyRate: (state, action) => {
            state.rates = state.rates.map((rate) => {
                if (rate._id === action.payload.to) {
                    return {
                        ...rate,
                        reply: [...rate.reply, action.payload]
                    };
                }
                return rate;
            });
        }
    }
});

export default ratingSlice.reducer;

export const {
    replyRate,
    setNewRates,
    setShowModal,
    setNewRate,
    updateRate,
    deleteRate,
    emotionalRate,
    setCloseModal
} = ratingSlice.actions;
