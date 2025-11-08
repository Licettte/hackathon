// features/auth/model/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = { id: number; email: string; name?: string };
type AuthState = { token: string | null; user: User | null };

const initialState: AuthState = {
    token: localStorage.getItem('token'),
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials(
            state,
            action: PayloadAction<{ token: string; user?: User }>
        ) {
            state.token = action.payload.token;
            if (action.payload.user) state.user = action.payload.user;
            localStorage.setItem('token', action.payload.token);
        },
        setUser(state, action: PayloadAction<User | null>) {
            state.user = action.payload;
        },
        logout(state) {
            state.token = null;
            state.user = null;
            localStorage.removeItem('token');
        },
    },
});

export const { setCredentials, setUser, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
