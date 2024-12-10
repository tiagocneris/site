export const validateCEP = (cep: string) => {
  const cepRegex = /^[0-9]{8}$/;
  return cepRegex.test(cep.replace(/\D/g, ''));
};

export const validatePhoneNumber = (phone: string) => {
  const phoneRegex = /^[0-9]{10,11}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};