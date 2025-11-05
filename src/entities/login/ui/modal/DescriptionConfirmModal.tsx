import {FC} from 'react';
import {DescriptionConfirm} from "./DescriptionConfirm";
import {ModalProps} from "../../model/types";
import {Agreement} from "../agreement/Agreement";
import {Button, Flex, Modal} from "shared/ui";



export const DescriptionConfirmModal: FC<ModalProps> = ({openConfirmModal,setOpenConfirmModal}) => {

    return (
        <Modal
            open={openConfirmModal}
            onClose={() => setOpenConfirmModal(false)}
            title="Условия оферты:"
        >
            <Flex gap={15} dir={"column"}>
          <DescriptionConfirm/>

            <Agreement/>
            <Button label='Начать' color='blue' onClick={() => setOpenConfirmModal(true)}/>
            </Flex>
        </Modal>
    );
};

