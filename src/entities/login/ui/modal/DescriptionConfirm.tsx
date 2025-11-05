import styles from "./Modal.module.scss";

export const DescriptionConfirm= () => {
    return ( <span className={styles.condition}>
      Вы подписываете согласие на обработку персональных данных для анализа
      ваших расходов и доходов, а также составление индивидуальных платежных программ.
    </span>
    );
};

