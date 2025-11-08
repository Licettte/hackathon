import { FC } from 'react';

import { Flex } from 'shared/ui';
import { SLIDES } from 'widgets/onboarding/model/constants';

import styles from './OnboardingCard.module.scss';

type OnboardingCardProps = { numberSlide: number };

export const OnboardingCard: FC<OnboardingCardProps> = ({ numberSlide }) => {
    return (
        <Flex dir='column' align='center'>
            <div> {SLIDES[numberSlide].title}</div>
            <div> {SLIDES[numberSlide].subtitle}</div>
        </Flex>
    );
};
