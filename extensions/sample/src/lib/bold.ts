import crypto from 'crypto';

export function formatBoldAmount(
  amount: string | number | null | undefined
): string {
  const numericAmount = Number(amount || 0);

  if (!Number.isFinite(numericAmount)) {
    return '0';
  }

  // Bold requires integer amounts without decimals.
  // e.g. $273.000 COP → '273000'
  return String(Math.round(numericAmount));
}

export function createBoldIntegritySignature({
  orderId,
  amount,
  currency,
  integrityKey
}: {
  orderId: string;
  amount: string;
  currency: string;
  integrityKey: string;
}) {
  return crypto
    .createHash('sha256')
    .update(`${orderId}${amount}${currency}${integrityKey}`)
    .digest('hex');
}
