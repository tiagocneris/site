export const validateCPF = (cpf: string) => {
  const cleanCPF = cpf.replace(/\D/g, '');
  
  if (cleanCPF.length !== 11) return false;
  
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false;
  
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  
  let rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cleanCPF.charAt(9))) return false;
  
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  
  rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cleanCPF.charAt(10))) return false;
  
  return true;
};

export const validateLicensePlate = (plate: string) => {
  // Brazilian license plate format (both old and new Mercosul format)
  const oldFormat = /^[A-Z]{3}[0-9]{4}$/;
  const mercosulFormat = /^[A-Z]{3}[0-9]{1}[A-Z]{1}[0-9]{2}$/;
  
  const cleanPlate = plate.replace(/[^A-Z0-9]/gi, '').toUpperCase();
  return oldFormat.test(cleanPlate) || mercosulFormat.test(cleanPlate);
};

export const validatePhoneNumber = (phone: string) => {
  const cleanPhone = phone.replace(/\D/g, '');
  return /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/.test(cleanPhone);
};