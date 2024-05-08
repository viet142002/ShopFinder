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
import userReducer from './userSlice';
import ratingReducer from './ratingSlice';
import retailerReducer from './retailerSlice';
import notificationReducer from './notificationSlice';
import sidebarSlice from './sidebarSlice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'routing', 'retailer']
};

const rootReducer = combineSlices({
    routing: routingReducer,
    user: userReducer,
    rating: ratingReducer,
    retailer: retailerReducer,
    notification: notificationReducer,
    sidebar: sidebarSlice
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
