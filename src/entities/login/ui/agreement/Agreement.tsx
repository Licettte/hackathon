import {FC, useState} from 'react';
import styles from "./Agreement.module.scss";

import {DescriptionConfirmModal} from "../modal/DescriptionConfirmModal";
import clsx from "clsx";
import {Flex, Toggle} from "shared/ui";



type AgreementProps = {
    isOfferLink?: boolean
}

export const Agreement: FC<AgreementProps> = ({isOfferLink = false}) => {

    const [openConfirmModal, setOpenConfirmModal] = useState(false);

    return (
        <Flex gap={20}>
            <Toggle size='sm' />
            <span className={styles.hint}>Я согласен с условием
                <span className={clsx(
                    styles.offer,
                    [isOfferLink]: styles.OfferLink)
                } onClick={()=>setOpenConfirmModal(isOfferLink && true)}>
                     оферты
                </span>
            </span>
            <DescriptionConfirmModal setOpenConfirmModal={setOpenConfirmModal}
                                     openConfirmModal={openConfirmModal}/>
        </Flex>

    );
};

