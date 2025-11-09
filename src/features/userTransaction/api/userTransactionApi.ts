import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { setUserTransaction } from 'features/userTransaction/model/userTransactionSlice';
import { userTransaction } from 'features/userTransaction/types';

export type OnboardingProgress = {
    phase: string;
    progress: number;
    detail?: any;
};
export type OnboardingDone = {
    obligationsDetected: number;
    payments: userTransaction[];
};

type StreamState = {
    connected: boolean;
    progress: OnboardingProgress | null;
    done: OnboardingDone | null;
    failed?: string;
};

export const onboardingApi = createApi({
    reducerPath: 'onboardingApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL as string,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        listenOnboarding: builder.query<StreamState, string>({
            queryFn: () => ({
                data: { connected: false, progress: null, done: null },
            }),
            async onCacheEntryAdded(
                jobId,
                {
                    updateCachedData,
                    cacheDataLoaded,
                    cacheEntryRemoved,
                    dispatch,
                }
            ) {
                await cacheDataLoaded;

                const url = `${import.meta.env.VITE_API_URL}/onboarding/${jobId}/events`;
                const es = new EventSource(url, { withCredentials: true });

                es.onopen = () =>
                    updateCachedData((d) => {
                        d.connected = true;
                    });
                es.onerror = () =>
                    updateCachedData((d) => {
                        d.connected = false;
                        d.failed = 'SSE connection error';
                    });

                const onProgress = (e: MessageEvent) => {
                    try {
                        const p = JSON.parse(e.data) as OnboardingProgress;
                        updateCachedData((d) => {
                            d.progress = p;
                        });
                    } catch {}
                };

                const onDone = (e: MessageEvent) => {
                    try {
                        const d = JSON.parse(e.data) as OnboardingDone;
                        updateCachedData((s) => {
                            s.done = d;
                            s.progress = { phase: 'DONE', progress: 100 };
                        });
                        dispatch(setUserTransaction(d.payments));
                    } catch {
                    } finally {
                        es.close();
                    }
                };

                const onFailed = (e: MessageEvent) => {
                    try {
                        const f = JSON.parse(e.data) as { error: string };
                        updateCachedData((d) => {
                            d.failed = f.error;
                        });
                    } catch {
                    } finally {
                        es.close();
                    }
                };

                es.addEventListener('progress', onProgress);
                es.addEventListener('done', onDone);
                es.addEventListener('failed', onFailed);

                await cacheEntryRemoved;
                es.removeEventListener('progress', onProgress);
                es.removeEventListener('done', onDone);
                es.removeEventListener('failed', onFailed);
                es.close();
            },
        }),
    }),
});

export const { useListenOnboardingQuery } = onboardingApi;
