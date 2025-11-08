import { FC } from 'react';

import { Flex, Modal } from 'shared/ui';
import { ModalProps } from 'widgets/login/model/types';

import { DescriptionConfirm } from './DescriptionConfirm';

export const DescriptionConfirmModal: FC<ModalProps> = ({
    onClose,
    isOpenModal,
}) => {
    return (
        <Modal
            isOpenModal={isOpenModal}
            onClose={onClose}
            title='Условия оферты:'
        >
            <Flex gap={15} dir='column'>
                <DescriptionConfirm />
            </Flex>
        </Modal>
    );
};
