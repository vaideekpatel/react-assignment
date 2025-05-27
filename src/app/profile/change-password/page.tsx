'use client';

import styles from './page.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { changePasswordSchema } from '@/utils/validation';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ChangePasswordInputs {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export default function ChangePasswordPage() {
  const { user, changePassword } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (mounted && user === null) {
      router.replace('/login');
    }
  }, [mounted, user, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordInputs>({
    resolver: yupResolver(changePasswordSchema),
  });

  const onSubmit = (data: ChangePasswordInputs) => {
    setError(null);
    const ok = changePassword(data.currentPassword, data.newPassword);
    if (!ok) {
      setError('Current password is incorrect');
      return;
    }
    router.push('/dashboard');
  };

  if (!mounted || user === null) return null;

  return (
    <div className={styles.pageWrapper}>
      <main className={styles.container} aria-labelledby="change-password-heading">
        <h1 id="change-password-heading" className={styles.title}>
          Change Password
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}

          {/* Current Password */}
          <div className={styles.field}>
            <label htmlFor="currentPassword" className={styles.label}>
              Current Password
            </label>
            <input
              id="currentPassword"
              type="password"
              {...register('currentPassword')}
              className={styles.input}
              aria-invalid={errors.currentPassword ? 'true' : 'false'}
              aria-describedby={errors.currentPassword ? 'currentPassword-error' : undefined}
            />
            {errors.currentPassword && (
              <p id="currentPassword-error" className={styles.error} role="alert">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div className={styles.field}>
            <label htmlFor="newPassword" className={styles.label}>
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              {...register('newPassword')}
              className={styles.input}
              aria-invalid={errors.newPassword ? 'true' : 'false'}
              aria-describedby={errors.newPassword ? 'newPassword-error' : undefined}
            />
            {errors.newPassword && (
              <p id="newPassword-error" className={styles.error} role="alert">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm New */}
          <div className={styles.field}>
            <label htmlFor="confirmNewPassword" className={styles.label}>
              Confirm New Password
            </label>
            <input
              id="confirmNewPassword"
              type="password"
              {...register('confirmNewPassword')}
              className={styles.input}
              aria-invalid={errors.confirmNewPassword ? 'true' : 'false'}
              aria-describedby={errors.confirmNewPassword ? 'confirmNewPassword-error' : undefined}
            />
            {errors.confirmNewPassword && (
              <p id="confirmNewPassword-error" className={styles.error} role="alert">
                {errors.confirmNewPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button type="submit" className={styles.button} disabled={isSubmitting}>
            {isSubmitting ? 'Updating…' : 'Update Password'}
          </button>
        </form>
      </main>
    </div>
  );
}
