// features/userTransaction/model/userTransactionSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Payment = {
    id: string;
    category: string;
    amountRub: number;
    day: number;
    status: 'Ожидает' | 'Оплачен' | 'Просрочен';
};

type State = { list: Payment[] };
const initialState: State = { list: [] };

const userTransactionSlice = createSlice({
    name: 'userTransaction',
    initialState,
    reducers: {
        setUserTransaction: (state, { payload }: PayloadAction<Payment[]>) => {
            console.log(payload, 'payload');
            state.list = payload;
        },
        resetUserTransaction: () => initialState,
    },
});

export const { setUserTransaction, resetUserTransaction } =
    userTransactionSlice.actions;
export default userTransactionSlice.reducer;
