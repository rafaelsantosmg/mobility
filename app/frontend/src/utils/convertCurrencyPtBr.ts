export default function convertCurrencyPtBr(
  value: number | string = 0
): string {
  return Number(value).toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });
}
