import { baseApi } from 'shared/api/baseApi';

export type LoginRequest = { email: string; password: string };
export type LoginResponse = { ok: true; token: string };

export type StartOnboardingResponse = { ok: true };

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                body,
            }),
        }),
        startOnboarding: builder.mutation<StartOnboardingResponse, void>({
            query: () => ({
                url: '/onboarding/start',
                method: 'POST',
                body: {},
            }),
        }),
    }),
});

export const { useLoginMutation, useStartOnboardingMutation } = authApi;
