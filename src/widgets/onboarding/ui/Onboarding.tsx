import { useState } from 'react';

import { Button, Flex } from 'shared/ui';
import { SLIDES } from 'widgets/onboarding/model/constants';
import { OnboardingCard } from 'widgets/onboarding/ui/onboardingCard/OnboardingCard';
import { ProgressBar } from 'widgets/onboarding/ui/progressBar/ProgressBar';

import styles from './Onboarding.module.scss';

export const Onboarding = () => {
    const [numberSlide, setNumberSlide] = useState(0);

    const nextSlide = () =>
        setNumberSlide((s) => Math.min(s + 1, SLIDES.length - 1));

    const prevSlide = () => setNumberSlide((s) => Math.max(s - 1, 0));

    return (
        <Flex dir='column' gap={16} align='center' className={styles.wrapper}>
            <ProgressBar numberSlide={numberSlide} slide={SLIDES} />

            <div className={styles.controls}>
                <Button
                    label='‹'
                    onClick={prevSlide}
                    className={styles.navBtn}
                    color='black'
                />
                <div className={styles.wrapperOnboardingCard}>
                    <OnboardingCard numberSlide={numberSlide} />
                </div>

                <Button
                    label='›'
                    onClick={nextSlide}
                    className={styles.navBtn}
                    color='black'
                />
            </div>
        </Flex>
    );
};
