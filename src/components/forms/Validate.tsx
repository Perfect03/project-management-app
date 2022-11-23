import { IUserAuth } from 'interfaces/api';

const FormValidate = (e: IUserAuth) => {
  const errors = {} as IUserAuth;
  if (e.name && !e.name) {
    errors.name = 'There should be a name here';
  } else if (!e.login) {
    errors.login = 'There should be a login here';
  } else if (!e.password) {
    errors.password = 'There should be a password here';
  } else if (e.name && e.name.length < 2) {
    errors.name = 'Too short';
  } else if (e.name && /[0-9]/.test(e.name)) {
    errors.name = 'Use only letters';
  } else if (e.name && !/[A-Z, А-Я]/.test(e.name[0])) {
    errors.name = 'The first letter must be uppercase';
  } else if (e.login && !/[A-Z, А-Я]/.test(e.login[0])) {
    errors.login = 'The first letter must be uppercase';
  } else if (e.login && e.login.length < 5) {
    errors.login = 'Too short';
  } else if (e.password && e.password.length < 8) {
    errors.password = 'Too short';
  } else if (
    (e.password && !/[0-9]/.test(e.password)) ||
    (e.password && !/[a-z, A-Z, а-я, А-Я]/.test(e.password))
  ) {
    errors.password = 'Use letters and digits';
  }
  return errors;
};

export { FormValidate };
