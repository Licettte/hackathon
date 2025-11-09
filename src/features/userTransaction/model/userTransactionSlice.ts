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
            state.list = payload;
        },
        resetUserTransaction: () => initialState,
    },
    selectors: {
        selectList: (state) => state.list,
    },
});

export const { setUserTransaction, resetUserTransaction } =
    userTransactionSlice.actions;
export const { selectList } = userTransactionSlice.selectors;
export default userTransactionSlice.reducer;
