'use client';

import styles from './page.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from '@/utils/validation';
import { useAuth } from '@/hooks/useAuth';
import { findUserByEmail } from '@/services/authService';
import { useRouter } from 'next/navigation';

interface SignupFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
}

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = (data: SignupFormInputs) => {
    const existing = findUserByEmail(data.email);
    if (existing) {
      setError('email', {
        type: 'manual',
        message: 'This email is already registered',
      });
      return;
    }

    signup({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      mobile: data.mobile,
      password: data.password,
    });
    router.push('/dashboard');
  };

  return (
    <main className={styles.container} aria-labelledby="signup-heading">
      <h1 id="signup-heading" className={styles.title}>
        Sign Up
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles.formRow}>
          <div className={styles.field}>
            <label htmlFor="firstName" className={styles.label}>
              First Name
            </label>
            <input
              id="firstName"
              {...register('firstName')}
              className={styles.input}
              aria-invalid={errors.firstName ? 'true' : 'false'}
              aria-describedby={errors.firstName ? 'firstName-error' : undefined}
            />
            {errors.firstName && (
              <p id="firstName-error" className={styles.error} role="alert">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="lastName" className={styles.label}>
              Last Name
            </label>
            <input
              id="lastName"
              {...register('lastName')}
              className={styles.input}
              aria-invalid={errors.lastName ? 'true' : 'false'}
              aria-describedby={errors.lastName ? 'lastName-error' : undefined}
            />
            {errors.lastName && (
              <p id="lastName-error" className={styles.error} role="alert">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        {['email', 'mobile', 'password', 'confirmPassword'].map((field) => {
          const fieldError = errors[field as keyof SignupFormInputs];
          return (
            <div key={field} className={styles.field}>
              <label htmlFor={field} className={styles.label}>
                {field === 'confirmPassword'
                  ? 'Confirm Password'
                  : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                id={field}
                type={field.includes('password') ? 'password' : 'text'}
                {...register(field as keyof SignupFormInputs)}
                className={styles.input}
                aria-invalid={fieldError ? 'true' : 'false'}
                aria-describedby={fieldError ? `${field}-error` : undefined}
              />
              {fieldError && (
                <p id={`${field}-error`} className={styles.error} role="alert">
                  {fieldError.message}
                </p>
              )}
            </div>
          );
        })}

        <button type="submit" className={styles.button}>
          Create Account
        </button>
      </form>

      <p className="mt-4 text-center">
        Already have an account?{' '}
        <a href="/login" className={styles.link}>
          Log in
        </a>
      </p>
    </main>
  );
}
