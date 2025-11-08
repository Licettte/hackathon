// Onboarding.tsx
import { useState } from 'react';

import { Button, Flex } from 'shared/ui';
import { SLIDES } from 'widgets/onboarding/model/constants';
import { OnboardingCard } from 'widgets/onboarding/ui/onboardingCard/OnboardingCard';
import { ProgressBar } from 'widgets/onboarding/ui/progressBar/ProgressBar';

export const Onboarding = () => {
    const [numberSlide, setNumberSlide] = useState(0);

    const nextSlide = () =>
        setNumberSlide((s) => Math.min(s + 1, SLIDES.length - 1));

    const prevSlide = () => setNumberSlide((s) => Math.max(s - 1, 0));

    return (
        <Flex dir='column' gap={16} align='center'>
            <ProgressBar numberSlide={numberSlide} slide={SLIDES} />
            <OnboardingCard numberSlide={numberSlide} />
            <Button label='назад' onClick={prevSlide} />
            <Button label='вперёд' onClick={nextSlide} />
        </Flex>
    );
};
