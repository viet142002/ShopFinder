import { combineSlices, configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import routingReducer from './routingSlice';
import searchReducer from './searchSlice';
import userReducer from './userSlice';
import ratingReducer from './ratingSlice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'routing']
};

const rootReducer = combineSlices({
    routing: routingReducer,
    search: searchReducer,
    user: userReducer,
    rating: ratingReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER
                ]
            }
        })
});

export const persistor = persistStore(store);
