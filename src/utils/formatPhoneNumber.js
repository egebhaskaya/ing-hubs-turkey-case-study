export function formatPhoneNumber(value) {
  let digits = value.replace(/\D/g, "");
  if (!digits) return "";
  if (!digits.startsWith("90")) digits = "90" + digits;

  const len = digits.length;
  if (len <= 2) return `+90`;
  if (len <= 5) return `+90 (${digits.slice(2)}`;
  if (len <= 8) return `+90 (${digits.slice(2, 5)}) ${digits.slice(5)}`;
  if (len <= 10)
    return `+90 (${digits.slice(2, 5)}) ${digits.slice(5, 8)} ${digits.slice(
      8
    )}`;
  if (len <= 12)
    return `+90 (${digits.slice(2, 5)}) ${digits.slice(5, 8)} ${digits.slice(
      8,
      10
    )} ${digits.slice(10)}`;

  return `+90 (${digits.slice(2, 5)}) ${digits.slice(5, 8)} ${digits.slice(
    8,
    10
  )} ${digits.slice(10, 12)}`;
}
