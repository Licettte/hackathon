export type userTransaction = Partial<{
    id: string;
    category: string;
    amountRub: number;
    day: number;
    status: string;
}>;
