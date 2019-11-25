import { FormValue } from '../filter-form';

export const compareToFirstPassword = (firstPassword?: string) => (
  _: unknown,
  value: FormValue,
  callback: (msg?: string) => void,
) => {
  if (value && value !== firstPassword) {
    callback('两次输入的密码不一致');
  } else {
    callback();
  }
};
