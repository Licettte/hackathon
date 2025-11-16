import { FC, useState } from 'react';

import { Button, Flex, Input } from 'shared/ui';
import { InputNumber } from 'shared/ui/input/InputNumber';
import { Modal } from 'shared/ui/modal/Modal';

import styles from './ConnectingModal.module.scss';

type ConnectingModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: {
        category: string;
        amountRub: number;
        day: number;
        countNumber: string;
    }) => void;
};

type FormState = {
    category: string;
    amountRub: string;
    day: string;
    countNumber: string;
};

const initialForm: FormState = {
    category: '',
    amountRub: '0',
    day: '1',
    countNumber: '0',
};

export const ConnectingModal: FC<ConnectingModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
}) => {
    const [form, setForm] = useState<FormState>(initialForm);

    const resetForm = () => {
        setForm(initialForm);
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleChangeCategory = (value: string) => {
        setForm((prev) => ({
            ...prev,
            category: value,
        }));
    };

    const handleChangeAmount = (value: string) => {
        const normalized = value.replace(/[^\d\s.,]/g, '');
        setForm((prev) => ({
            ...prev,
            amountRub: normalized,
        }));
    };

    const handleChangeDay = (value: string) => {
        const digitsOnly = value.replace(/\D/g, '').slice(0, 2);
        setForm((prev) => ({
            ...prev,
            day: digitsOnly,
        }));
    };

    const handleChangeCountNumber = (value: string) => {
        const normalized = value.replace(/\s/g, '');
        setForm((prev) => ({
            ...prev,
            countNumber: normalized,
        }));
    };

    const handleConfirm = () => {
        const amountNumber = Number(
            form.amountRub.replace(/\s/g, '').replace(',', '.')
        );
        const dayNumber = Number(form.day);

        if (
            !form.category.trim() ||
            !form.countNumber.trim() ||
            Number.isNaN(amountNumber) ||
            amountNumber <= 0 ||
            Number.isNaN(dayNumber) ||
            dayNumber < 1 ||
            dayNumber > 31
        ) {
            return;
        }

        onSubmit({
            category: form.category.trim(),
            amountRub: amountNumber,
            day: dayNumber,
            countNumber: form.countNumber.trim(),
        });

        handleClose();
    };

    return (
        <Modal
            isOpenModal={isOpen}
            onClose={handleClose}
            title='Новый платеж'
            footer={
                <Flex gap={25} className={styles.footer}>
                    <Button label='Отмена' onClick={handleClose} size='xs' />
                    <Button
                        size='xs'
                        label='Сохранить'
                        color='green'
                        onClick={handleConfirm}
                    />
                </Flex>
            }
        >
            <Flex dir='column' gap={16} className={styles.modalBody}>
                <div className={styles.field}>
                    <div className={styles.fieldLabel}>Категория</div>
                    <Input
                        value={form.category}
                        onChange={handleChangeCategory}
                        placeholder='Введите категорию'
                    />
                </div>

                <div className={styles.field}>
                    <div className={styles.fieldLabel}>Сумма</div>
                    <InputNumber
                        type='text'
                        value={form.amountRub}
                        onChangeValue={handleChangeAmount}
                    />
                </div>

                <div className={styles.field}>
                    <div className={styles.fieldLabel}>День месяца</div>
                    <InputNumber
                        type='text'
                        value={form.day}
                        onChangeValue={handleChangeDay}
                    />
                </div>

                <div className={styles.field}>
                    <div className={styles.fieldLabel}>Номер счета</div>
                    <InputNumber
                        type='text'
                        value={form.countNumber
                            .replace(/\s/g, '')
                            .replace(/(\d{4})/g, '$1 ')
                            .trim()}
                        maxLength={19}
                        onChangeValue={handleChangeCountNumber}
                    />
                </div>
            </Flex>
        </Modal>
    );
};
