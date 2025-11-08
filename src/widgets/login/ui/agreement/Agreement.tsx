import { FC, useState } from 'react';

import { Flex, Toggle } from 'shared/ui';
import { DescriptionConfirmModal } from 'widgets/login/ui/modal/DescriptionConfirmModal';

import styles from './Agreement.module.scss';

type AgreementProps = {
    isOfferLink?: boolean;
    onChange?: (checked: boolean) => void;
};

export const Agreement: FC<AgreementProps> = ({
    isOfferLink = false,
    onChange,
}) => {
    const [isOpenDescModal, setIsOpenDescModal] = useState(false);

    const closeModal = () => setIsOpenDescModal(false);

    return (
        <Flex gap={20}>
            <Toggle size='sm' onChange={(isToggle) => onChange?.(isToggle)} />

            <span className={styles.hint}>
                Я согласен с условием
                {isOfferLink && (
                    <span
                        className={styles.offer}
                        onClick={() => setIsOpenDescModal(true)}
                    >
                        оферты
                    </span>
                )}
            </span>

            <DescriptionConfirmModal
                isOpenModal={isOpenDescModal}
                onClose={closeModal}
            />
        </Flex>
    );
};
