import { isEmail } from 'validator';

function isString(value) {
  return typeof value === 'string';
}

export function email(value) {
  return !isEmail(value) ? 'Deve ser um email válido' : undefined;
}

export function maxLength(length) {
  return value =>
    (isString(value) && value.length > length
      ? `Deve conter até ${length} caracteres`
      : undefined);
}

export function minLength(length) {
  return value =>
    (isString(value) && value.length < length
      ? `Deve conter pelo menos ${length} caracteres`
      : undefined);
}
