import { ImgWrapper } from 'shared/ui/img/ImgWrapper';
import { SlideItem } from 'widgets/onboarding/model/types';
import { Mode } from 'widgets/onboarding/ui/mode/Mode';
import { PaymentsTable } from 'widgets/onboarding/ui/paymentsTable/PaymentsTable';

import cat from '/src/shared/img/cat.png';
import catAndSun from '/src/shared/img/catAndSun.png';

export const SLIDES: SlideItem[] = [
    {
        id: 1,
        title: 'Посчитаю все ваши обязательные платежи',
        subtitle: 'Итог: 30 тыс',
        render: <PaymentsTable />,
    },
    {
        id: 2,
        title: 'Не дам важному потеряться в повседневных тратах ',
        subtitle: 'В день зарплаты сразу отложу нужную сумму',
        render: (
            <ImgWrapper
                src={cat}
                alt='изображение кота, который прячет рыбку'
                width={350}
                height={350}
            />
        ),
    },

    {
        id: 3,
        title: 'В день платежа всё сделаю за Вас',
        subtitle: 'аккуратно, вовремя, как договаривались',
        render: (
            <ImgWrapper
                src={catAndSun}
                alt='изображение кота, который радосто щурится на солнышке'
                width={350}
                height={350}
            />
        ),
    },
    {
        id: 4,
        title: 'Как вам удобно?',
        subtitle: '',
        render: <Mode />,
    },
];

export const SLIDE_STATUS = {
    PASSED: 'PASSED',
    REST: 'REST',
} as const;
