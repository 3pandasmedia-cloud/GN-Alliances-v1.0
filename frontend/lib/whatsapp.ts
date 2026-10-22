export function whatsappLink(number: string, message: string): string | null {
  const entered = number.trim();
  if (!/^\+?[0-9\s().-]+$/.test(entered)) return null;
  const digits = entered.replace(/[+\s().-]/g, "");
  if (!/^[1-9][0-9]{6,14}$/.test(digits)) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
