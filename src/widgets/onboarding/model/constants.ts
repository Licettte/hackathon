import * as cluster from 'node:cluster';

import { SlideItem } from 'widgets/onboarding/model/types';

export const SLIDES: SlideItem[] = [
    {
        id: 1,
        title: 'Посчитаю все ваши обязательные платежи',
        subtitle: 'Итог: 30 тыс',
    },
    {
        id: 2,
        title: 'Пришла зарплата',
        subtitle:
            'Переведу на сберегательный счет - 30 тыс ( сумму обязательных платежей).',
    },

    {
        id: 3,
        title: 'День платежа',
        subtitle:
            'Оплачиваю счет с резервного счёта. Выберите режим: авто - все сделаю за Вас.' +
            'Полуавто — с пуш-подтверждением.',
    },
    {
        id: 4,
        title: 'Готовы начать?',
        subtitle:
            '2 месяца, бесплатная подписка. отключить Элли можно в любой момент.',
    },
];

export const SLIDE_STATUS = {
    PASSED: 'PASSED',
    REST: 'REST',
} as const;
