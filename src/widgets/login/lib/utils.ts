export const validateRequiredFields = (
    values: Record<string, unknown>,
    labels: Record<string, string>
) => {
    const emptyKeys: string[] = [];
    const emptyLabels: string[] = [];

    for (const key of Object.keys(labels)) {
        const v = values[key];
        const isEmpty = v == null || (typeof v === 'string' && v.trim() === '');
        if (isEmpty) {
            emptyKeys.push(key);
            emptyLabels.push(`«${labels[key]}»`);
        }
    }

    if (emptyKeys.length === 0) return null;

    const message =
        emptyLabels.length === 1
            ? `Поле ${emptyLabels[0]} не заполнено`
            : `Поля ${emptyLabels.join(', ')} не заполнены`;

    return { message, emptyKeys };
};
