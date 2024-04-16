export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
  if (!match) {
    return cleaned;
  }
  return `(${match[1]}) ${match[2]}-${match[3]}`;
};