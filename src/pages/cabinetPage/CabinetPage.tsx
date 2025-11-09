import { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppSelector } from 'app/store/hooks';
import { ReserveAccount } from 'entities/reserveAccount/ReserveAccount';
import { selectList } from 'features/userTransaction/model/userTransactionSlice';
import { Button } from 'shared/ui/buttons/button/Button';
import { Flex } from 'shared/ui/flex/Flex';
import {
    ProgressIndicator,
    useProgressController,
} from 'shared/ui/ProgressIndicator/ProgressIndicator';
import { SegmentedControl } from 'shared/ui/segmentedControl/SegmentedControl';
import { ObligationsTable } from 'shared/ui/table/Table';
import { Cabinet } from 'widgets/cabinet/Cabinet';
import { CreditCard } from 'widgets/creditCard/ui/CreditCard';
// import { ExplanationCarousel } from 'shared/ui/сarousel/Carousel';

type CabinetPageProps = {};

const opts: any[] = [
    { label: 'ВТБ', value: 'vtb' },
    { label: 'СБЕРБАНК', value: 'sber' },
    { label: 'АЛЬФАБАНК', value: 'alf' },
];

const items: any[] = [
    { id: 'utilities', label: 'ЖКХ…', state: 'pending' },
    { id: 'mobile', label: 'Связь…', state: 'pending' },
    { id: 'loan', label: 'Кредит…', state: 'pending' },
];

export const CabinetPage: FC<CabinetPageProps> = () => {
    const { state } = useLocation() as { state?: { mode?: string } };
    const userTransaction = useAppSelector(selectList);

    //
    // const [val, setVal] = useState('vtb');
    //
    // const ctrl = useProgressController({
    //     autoStep: 4,
    //     autoInterval: 600,
    //     cap: 95,
    // });
    // const steps = items.map((it, i) => ({
    //     ...it,
    //     state:
    //         ctrl.value >= (i + 1) * (100 / items.length) - 10
    //             ? 'done'
    //             : 'pending',
    // }));
    return (
        <Cabinet />
        //
        // {/*<SegmentedControl*/}
        // {/*    options={opts}*/}
        // {/*    value={val}*/}
        // {/*    onChange={(v) => setVal(v)}*/}
        // {/*/>*/}
        // {/*<CreditCard number={9999} bankTitle={val} bankLogo='' />*/}
        //
        // {/*<ReserveAccountMock userId={1} planTotalRub={13450} />*/}
        //

        //

        //
        // {/*<Button color='black' label='История операций' size='sm' />*/}
    );
};
