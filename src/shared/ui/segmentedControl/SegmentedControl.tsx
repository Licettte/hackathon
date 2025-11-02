import {FC, useRef, useState} from 'react';
 import styles from'./SegmentedControl.module.scss'

interface SegmentedControlProps {
// items?: []
    options: any[];
    onSelect: any //todo типизировать
}

export const SegmentedControl: FC<SegmentedControlProps> = ({ options, onSelect }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSelect = (index, value) => {
        setActiveIndex(index);
        if (onSelect) {
            onSelect(value);
        }
    };

    return (
        <div className={styles.card}>
            {options.map((option, index) => (
                <button
                    key={option.value}
                    // className={activeIndex === index ? styles.active: ''}
                    onClick={() => handleSelect(index, option.value)}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
};


