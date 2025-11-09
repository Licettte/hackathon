import { ReactNode } from 'react';

export type SlideItem = {
    id: number;
    title: string;
    subtitle?: string;
    render?: ReactNode;
};
