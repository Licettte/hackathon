import { baseApi } from 'shared/api/baseApi';

import type { Payment } from '../model/userTransactionSlice';

export type CreatePaymentRequest = {
    category: string;
    amountRub: number;
    day: number;
    accountId: number;
};

export type UpdatePaymentRequest = {
    id: string;
    category?: string;
    amountRub?: number;
    day?: number;
};

export const userCrudTransactionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createUserTransaction: builder.mutation<Payment, CreatePaymentRequest>({
            query: (body) => ({
                url: '/obligations',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'UserCrudTransaction', id: 'LIST' }],
        }),
        updateUserTransaction: builder.mutation<Payment, UpdatePaymentRequest>({
            query: ({ id, ...body }) => ({
                url: `/obligations/${id}`,
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
                url: `/obligations/${id}`,
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
