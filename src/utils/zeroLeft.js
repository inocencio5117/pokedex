export function zeroLeft(number) {
  if (number >= 10) return Math.floor(number).toString().padStart(3, '0');
  if (number >= 100) return number;
  return Math.floor(number).toString().padStart(3, '00');
}
