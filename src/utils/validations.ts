import { emailRegex, phoneNumberRegex } from './regexes';

export const validateEmail = (value: unknown): true | string => {
  if (typeof value !== 'string') return 'The provided value is not the string';
  return emailRegex.test(value) || 'The input is not a valid e-mail';
};

export const validatePhoneNumber = (value: unknown): true | string => {
  if (typeof value !== 'string') return 'The provided value is not the string';
  return phoneNumberRegex.test(value) || 'The input is not a valid phone number';
};

export const isRequired = (value: unknown): true | string => !!value || 'The value is required';
