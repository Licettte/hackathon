// features/auth/model/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = { token: string | null };
const initialState: AuthState = {
    token:
        typeof localStorage !== 'undefined'
            ? localStorage.getItem('token')
            : null,
};

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken(state, { payload }: PayloadAction<string | null>) {
            state.token = payload;
            if (payload) localStorage.setItem('token', payload);
            else localStorage.removeItem('token');
        },
        logout(state) {
            state.token = null;
            localStorage.removeItem('token');
        },
    },
});

export const { setToken, logout } = slice.actions;
export default slice.reducer;

// селектор при желании
export const selectToken = (s: { auth: AuthState }) => s.auth.token;
