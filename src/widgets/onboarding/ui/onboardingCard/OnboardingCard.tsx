import { FC } from 'react';

import { Flex } from 'shared/ui';
import { SLIDES } from 'widgets/onboarding/model/constants';
import { PaymentsTable } from 'widgets/onboarding/ui/paymentsTable/PaymentsTable';

import styles from './OnboardingCard.module.scss';

type OnboardingCardProps = { numberSlide: number };

export const OnboardingCard: FC<OnboardingCardProps> = ({ numberSlide }) => {
    return (
        <Flex dir='column' align='center' gap={25}>
            <span> {SLIDES[numberSlide].title}</span>

            {SLIDES[numberSlide]?.render}

            <span> {SLIDES[numberSlide].subtitle}</span>
        </Flex>
    );
};
