import * as yup from 'yup';

export const passwordRules = yup
  .string()
  .required('Password is required')
  .min(8, 'At least 8 characters')
  .max(32, 'Max 32 characters')
  .matches(/[A-Z]/, 'Must include an uppercase letter')
  .matches(/[a-z]/, 'Must include a lowercase letter')
  .matches(/\d/, 'Must include a number')
  .matches(/[@$!%*?&#]/, 'Must include a special character');

export const signupSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  mobile: yup.string().required(),
  password: passwordRules,
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

export const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const changePasswordSchema = yup.object({
  currentPassword: yup.string().required('Current password is required'),
  newPassword: passwordRules.label('New password'),
  confirmNewPassword: yup
    .string()
    .required('Please confirm your new password')
    .oneOf([yup.ref('newPassword')], 'Passwords must match'),
});

export const profileSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  mobile: yup.string().required('Mobile number is required'),
});

