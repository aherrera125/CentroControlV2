export interface IPay {
    payId?: number;
    memberId: number;
    amount: number;
    payDate: Date;
    dueDate: Date;
    status?: string;
    monthPaid: string;
    voucherNumber: string;
    note: string;
}
