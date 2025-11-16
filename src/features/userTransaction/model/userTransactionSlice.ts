import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { userCrudTransactionApi } from 'features/userTransaction/api/userCrudTransactionApi';

export type Payment = {
    id: string;
    category: string;
    amountRub: number;
    day: number;
    status: 'Ожидает' | 'Оплачен' | 'Просрочен';
};

type State = {
    list: Payment[];
};

const initialState: State = {
    list: [],
};

const userTransactionSlice = createSlice({
    name: 'userTransaction',
    initialState,
    reducers: {
        setUserTransaction: (state, { payload }: PayloadAction<Payment[]>) => {
            state.list = payload;
        },

        updateUserTransaction: (
            state,
            { payload }: PayloadAction<{ id: string; amountRub: number }>
        ) => {
            const idx = state.list.findIndex((p) => p.id === payload.id);
            if (idx === -1) return;
            state.list[idx].amountRub = payload.amountRub;
        },

        deleteUserTransaction: (state, { payload }: PayloadAction<string>) => {
            state.list = state.list.filter((p) => p.id !== payload);
        },

        addUserTransaction: (state, { payload }: PayloadAction<Payment>) => {
            state.list.push(payload);
        },

        resetUserTransaction: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            userCrudTransactionApi.endpoints.createUserTransaction
                .matchFulfilled,
            (state, { payload }) => {
                state.list.push(payload);
            }
        );

        builder.addMatcher(
            userCrudTransactionApi.endpoints.deleteUserTransactionBackend
                .matchFulfilled,
            (state, action) => {
                const id = action.meta.arg.originalArgs;
                state.list = state.list.filter((p) => p.id !== id);
            }
        );
    },
    selectors: {
        selectList: (state) => state.list,
        selectTotalAmountRub: (state) =>
            state.list.reduce((sum, p) => sum + p.amountRub, 0),
    },
});

export const {
    setUserTransaction,
    resetUserTransaction,
    deleteUserTransaction,
    updateUserTransaction,
    addUserTransaction,
} = userTransactionSlice.actions;

export const { selectList, selectTotalAmountRub } =
    userTransactionSlice.selectors;

export default userTransactionSlice.reducer;
