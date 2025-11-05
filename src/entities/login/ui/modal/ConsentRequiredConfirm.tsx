import {FC, useState} from 'react';
import {Button, Flex, Modal} from "shared/ui";
import {Agreement} from "../agreement/Agreement";
import {DescriptionConfirm} from "./DescriptionConfirm";
import {ModalProps} from "../../model/types";

import styles from "./Modal.module.scss";

export const ConsentRequiredConfirm: FC<ModalProps> =
    ({openConfirmModal, setOpenConfirmModal}) => {

    const [isShowMoreDetailed, setIsShowMoreDetailed] = useState(false)

    return (
        <Modal
            open={openConfirmModal}
            onClose={() => setOpenConfirmModal(false)}
            title="Необходимо дать согласие:"
        >
            <Flex gap={15} dir={"column"}>
                <ul>
                    <li>1. Согласие на обработку персональных данных</li>
                    <li>2. Пользовательское соглашение</li>
                    <li>3. Политика обработки персональных данных</li>
                    <li className={styles.detailed} onClick={() => setIsShowMoreDetailed(true)}>
                        {!isShowMoreDetailed && 'подробнее..'}
                    </li>
                    {/*todo сделать подробнее светящейся при наведении*/}

                    {isShowMoreDetailed &&
                        <>
                        <DescriptionConfirm/>
                        <span className={styles.detailed} onClick={() => setIsShowMoreDetailed(false)}>
                      скрыть
                         </span>
                        </>

                }
                 </ul>

                <Agreement/>
                <Button label='Начать' color='blue' onClick={() => setOpenConfirmModal(true)}/>

            </Flex>
        </Modal>
    );
};

