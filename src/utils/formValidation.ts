export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export const validateEmail = (email: string): boolean => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

export const validateRequired = (value: string | number | undefined): boolean => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== undefined && value !== null;
};

export const validateDonationAmount = (amount: number): boolean => {
  return amount > 0 && amount <= 50000; // Maximum £50,000 per donation
};

export const validatePhoneNumber = (phone: string): boolean => {
  // UK phone number format
  const phonePattern = /^(\+44|0)[1-9]\d{8,9}$/;
  return !phone || phonePattern.test(phone.replace(/\s+/g, ''));
};

export const formatValidationErrors = (errors: ValidationError[]): string => {
  return errors.map(error => error.message).join('. ');
};

export const showFormError = (
  errorDiv: HTMLElement | null, 
  message: string,
  announcer?: { announce: (message: string) => void }
) => {
  if (errorDiv) {
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
    announcer?.announce(message);
  }
};

export const showFormSuccess = (
  successDiv: HTMLElement | null, 
  message: string,
  announcer?: { announce: (message: string) => void }
) => {
  if (successDiv) {
    successDiv.textContent = message;
    successDiv.classList.remove('hidden');
    announcer?.announce(message);
  }
};

export const clearFormError = (
  errorDiv: HTMLElement | null,
  field?: HTMLElement
) => {
  if (errorDiv) {
    errorDiv.textContent = '';
    errorDiv.classList.add('hidden');
    field?.removeAttribute('aria-invalid');
  }
};