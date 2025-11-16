import { FC, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { CellContext } from '@tanstack/react-table';

import { useAppDispatch } from 'app/store/hooks';
import { useUpdateUserTransactionMutation } from 'features/userTransaction/api/userCrudTransactionApi';
import {
    Payment,
    updateUserTransaction,
} from 'features/userTransaction/model/userTransactionSlice';
import { InputNumber } from 'shared/ui/input/InputNumber';
import s from 'widgets/connecting/paymentsTable/MandatoryPaymentsTable.module.scss';

type SummSellProps = CellContext<Payment, number>;

export const SummSell: FC<SummSellProps> = ({ row, getValue }) => {
    const dispatch = useAppDispatch();

    const [updateUserTransactionBackend] = useUpdateUserTransactionMutation();
    const [value, setValue] = useState<number | undefined>(getValue());

    const onBlur = () => {
        updateUserTransactionBackend({
            id: row.original.id,
            amountRub: value,
        });
    };

    return (
        <span className={s.num}>
            <NumericFormat
                value={value}
                thousandSeparator=' '
                decimalSeparator='.'
                decimalScale={2}
                fixedDecimalScale
                allowNegative={false}
                customInput={InputNumber}
                onBlur={onBlur}
                onValueChange={(values) => {
                    const { floatValue } = values;
                    setValue(floatValue ?? 0);

                    if (floatValue != null) {
                        dispatch(
                            updateUserTransaction({
                                id: row.original.id,
                                amountRub: floatValue,
                            })
                        );
                    }
                }}
            />
        </span>
    );
};
