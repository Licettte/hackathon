import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        baseUrl: import.meta.env.VITE_API_URL,
        prepareHeaders: (headers, { getState }) => {
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
            const token = getState().auth.token;
            if (token) headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    endpoints: () => ({}),
});
