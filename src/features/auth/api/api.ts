// features/auth/api/authApi.ts
import { baseApi } from 'shared/api/baseApi';

import { setCredentials, setUser } from '../model/authSlice';

export type LoginRequest = { email: string; password: string };
export type LoginResponse = { token: string };

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (body) => ({ url: '/auth/login', method: 'POST', body }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setCredentials({ token: data.token }));
                } catch {}
            },
        }),
    }),
});

export const { useLoginMutation } = authApi;
