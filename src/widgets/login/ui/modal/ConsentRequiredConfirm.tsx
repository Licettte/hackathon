import { FC, FormEvent, useState } from 'react';

import { Button, Flex, Modal } from 'shared/ui';
import { ModalProps } from 'widgets/login/model/types';
import { Agreement } from 'widgets/login/ui/agreement/Agreement';

import { DescriptionConfirm } from './DescriptionConfirm';

import styles from './Modal.module.scss';

type ModalPropsExtension = ModalProps & {
    onChange: (checked: boolean) => void;
    confirmStart: (e: FormEvent) => void;
};

export const ConsentRequiredConfirm: FC<ModalPropsExtension> = ({
    isOpenModal,
    onClose,
    confirmStart,
    onChange,
}) => {
    const [isShowMoreDetailed, setIsShowMoreDetailed] = useState(false);

    return (
        <Modal
            isOpenModal={isOpenModal}
            onClose={onClose}
            title='Необходимо дать согласие:'
        >
            <Flex gap={15} dir='column'>
                <ul>
                    <li>1. Согласие на обработку персональных данных</li>
                    <li>2. Пользовательское соглашение</li>
                    <li>3. Политика обработки персональных данных</li>
                    <li
                        className={styles.detailed}
                        onClick={() => setIsShowMoreDetailed(true)}
                    >
                        {!isShowMoreDetailed && 'подробнее..'}
                    </li>

                    {isShowMoreDetailed && (
                        <>
                            <DescriptionConfirm />
                            <span
                                className={styles.detailed}
                                onClick={() => setIsShowMoreDetailed(false)}
                            >
                                скрыть
                            </span>
                        </>
                    )}
                </ul>

                <Agreement onChange={onChange} />
                <Button label='Начать' color='blue' onClick={confirmStart} />
            </Flex>
        </Modal>
    );
};
