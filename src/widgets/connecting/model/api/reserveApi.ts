import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type SetReserveRequest = {
    percentOfSalary: number;
};

export type ReserveSettings = {
    id: string;
    percentOfSalary: number;
};

export const reserveApi = createApi({
    reducerPath: 'reserveApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    tagTypes: ['Reserve'],
    endpoints: (builder) => ({
        setReserveSettings: builder.mutation<
            ReserveSettings,
            SetReserveRequest
        >({
            query: (body) => ({
                url: '/accounts/reserve',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Reserve', id: 'CURRENT' }],
        }),
        getReserveSettings: builder.query<ReserveSettings, void>({
            query: () => '/accounts/reserve',
            providesTags: [{ type: 'Reserve', id: 'CURRENT' }],
        }),
    }),
});

export const { useSetReserveSettingsMutation, useGetReserveSettingsQuery } =
    reserveApi;
