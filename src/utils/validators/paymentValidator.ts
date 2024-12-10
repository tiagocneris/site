export const validateCreditCard = (number: string) => {
  const cardRegex = /^[0-9]{16}$/;
  return cardRegex.test(number.replace(/\D/g, ''));
};

export const validateExpiryDate = (date: string) => {
  const dateRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
  if (!dateRegex.test(date)) return false;

  const [month, year] = date.split('/').map(Number);
  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;

  return year > currentYear || (year === currentYear && month >= currentMonth);
};

export const validateCVV = (cvv: string) => {
  const cvvRegex = /^[0-9]{3,4}$/;
  return cvvRegex.test(cvv);
};