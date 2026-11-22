export function getQtyString(qty: number | null): string {
  if (qty == null) return '';

  const fractions: Record<number, string> = {
    0.5: '1/2 ',
    0.3: '1/3 ',
    0.25: '1/4 ',
  };

  return fractions[qty] ?? String(qty);
}