export declare function formatBoldAmount(amount: string | number | null | undefined): string;
export declare function createBoldIntegritySignature({ orderId, amount, currency, integrityKey }: {
    orderId: string;
    amount: string;
    currency: string;
    integrityKey: string;
}): string;
