import { FC } from 'react';

import { Flex } from 'shared/ui';

import { ItemProgressBar } from './ItemProgressBar';

import { SlideItem } from '../../model/types';

interface ProgressBarProps {
    numberSlide: number;
    slide: SlideItem[];
}

export const ProgressBar: FC<ProgressBarProps> = ({ numberSlide, slide }) => {
    return (
        <Flex dir='row' gap={25}>
            {slide.map((item, index) => (
                <ItemProgressBar
                    key={item.id}
                    index={index}
                    current={numberSlide}
                />
            ))}
        </Flex>
    );
};
