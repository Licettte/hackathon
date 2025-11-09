import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import authReducer from 'features/auth/model/authSlice';
import { onboardingApi } from 'features/userTransaction/api/userTransactionApi';
import userTransaction from 'features/userTransaction/model/userTransactionSlice';
import { baseApi } from 'shared/api/baseApi';

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        [onboardingApi.reducerPath]: onboardingApi.reducer,
        auth: authReducer,
        userTransaction: userTransaction,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
            .concat(baseApi.middleware)
            .concat(onboardingApi.middleware),
    devTools: import.meta.env.DEV,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
