import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { Payment } from '../model/userTransactionSlice';

export type CreatePaymentRequest = {
    category: string;
    amountRub: number;
    day: number;
    accountNumber: number;
};

export type UpdatePaymentRequest = {
    id: string;
    category?: string;
    amountRub?: number;
    day?: number;
};

export const userCrudTransactionApi = createApi({
    reducerPath: 'userCrudTransactionApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    tagTypes: ['UserCrudTransaction'],
    endpoints: (builder) => ({
        createUserTransaction: builder.mutation<Payment, CreatePaymentRequest>({
            query: (body) => ({
                url: '/obligation',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'UserCrudTransaction', id: 'LIST' }],
        }),
        updateUserTransaction: builder.mutation<Payment, UpdatePaymentRequest>({
            query: ({ id, ...body }) => ({
                url: `/obligation/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: (_result, _error, { id }) => [
                { type: 'UserCrudTransaction', id },
                { type: 'UserCrudTransaction', id: 'LIST' },
            ],
        }),
        deleteUserTransactionBackend: builder.mutation<void, string>({
            query: (id) => ({
                url: `/obligation/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_result, _error, id) => [
                { type: 'UserCrudTransaction', id },
                { type: 'UserCrudTransaction', id: 'LIST' },
            ],
        }),
    }),
});

export const {
    useCreateUserTransactionMutation,
    useDeleteUserTransactionBackendMutation,
    useUpdateUserTransactionMutation,
} = userCrudTransactionApi;
