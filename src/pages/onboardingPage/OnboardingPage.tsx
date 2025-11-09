import { useLocation } from 'react-router-dom';

import { useListenOnboardingQuery } from 'features/userTransaction/api/userTransactionApi';
import { Onboarding } from 'widgets/onboarding/ui/Onboarding';

export const OnboardingPage = () => {
    const { state } = useLocation() as { state?: { jobId?: string } };

    const jobId = state?.jobId;

    const { data, isLoading, isFetching, error } = useListenOnboardingQuery(
        jobId!,
        { skip: !jobId }
    );

    return <Onboarding />;
};
