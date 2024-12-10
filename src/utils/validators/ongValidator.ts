export const validateCNPJ = (cnpj: string) => {
  const cleanCNPJ = cnpj.replace(/[^\d]/g, '');

  if (cleanCNPJ.length !== 14) return false;

  // Check for repeated digits
  if (/^(\d)\1+$/.test(cleanCNPJ)) return false;

  // Validate first check digit
  let sum = 0;
  let weight = 5;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cleanCNPJ.charAt(i)) * weight;
    weight = weight === 2 ? 9 : weight - 1;
  }
  let digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(cleanCNPJ.charAt(12))) return false;

  // Validate second check digit
  sum = 0;
  weight = 6;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cleanCNPJ.charAt(i)) * weight;
    weight = weight === 2 ? 9 : weight - 1;
  }
  digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(cleanCNPJ.charAt(13))) return false;

  return true;
};

export const validatePhone = (phone: string) => {
  const cleanPhone = phone.replace(/[^\d]/g, '');
  return /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/.test(cleanPhone);
};

export const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validateWebsite = (url: string) => {
  if (!url) return true; // Website is optional
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};