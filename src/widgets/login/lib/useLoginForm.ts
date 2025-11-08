import { useState } from 'react';
import { toast } from 'sonner';

import { validateRequiredFields } from 'widgets/login/lib/utils';

type LoginValues = { email: string; password: string };
type LoginErrors = Partial<Record<keyof LoginValues, string>>;
type K = keyof LoginValues;

const LABELS: Record<K, string> = { email: 'Почта', password: 'Пароль' };

export const useLoginForm = () => {
    const [values, setValues] = useState<LoginValues>({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState<LoginErrors>({});

    const register = (key: K) => ({
        value: values[key],
        isError: !!errors[key],
        onChange: (next: string) => {
            setValues((v) => ({ ...v, [key]: next }));
            if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
        },
    });

    const validate = () => {
        const res = validateRequiredFields(values, LABELS);
        if (!res) return true;

        setErrors((prev) => {
            const next = { ...prev };
            res.emptyKeys.forEach((k) => (next[k as K] = 'Обязательное поле'));
            return next;
        });
        toast.error(res.message);
        return false;
    };

    return { values, errors, register, validate };
};
