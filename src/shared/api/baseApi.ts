import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        baseUrl: import.meta.env.VITE_API_URL ?? 'http://192.168.1.102:8080',
        credentials: 'include',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) headers.set('authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    endpoints: () => ({}),
});
