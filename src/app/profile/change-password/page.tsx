'use client';
import styles from './page.module.css';

import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { changePasswordSchema } from '@/utils/validation';

interface ChangePasswordInputs {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export default function ChangePasswordPage() {
  const { user, changePassword } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const [mounted, setMounted] = useState(false);
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

  const onSubmit = async (data: ChangePasswordInputs) => {
    setError(null);
    const ok = changePassword(data.currentPassword, data.newPassword);
    if (!ok) {
      setError('Current password is incorrect');
      return;
    }
    router.push('/dashboard');
  };

  if (user === null) return null; 

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Change Password</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.formRow}>
          <label htmlFor="currentPassword" className={styles.label}>
            Current Password
          </label>
          <input
            id="currentPassword"
            type="password"
            {...register('currentPassword')}
            className={styles.input}
          />
          {errors.currentPassword && (
            <p className={styles.error}>{errors.currentPassword.message}</p>
          )}
        </div>

        <div className={styles.formRow}>
          <label htmlFor="newPassword" className={styles.label}>
            New Password
          </label>
          <input
            id="newPassword"
            type="password"
            {...register('newPassword')}
            className={styles.input}
          />
          {errors.newPassword && <p className={styles.error}>{errors.newPassword.message}</p>}
        </div>

        <div className={styles.formRow}>
          <label htmlFor="confirmNewPassword" className={styles.label}>
            Confirm New Password
          </label>
          <input
            id="confirmNewPassword"
            type="password"
            {...register('confirmNewPassword')}
            className={styles.input}
          />
          {errors.confirmNewPassword && (
            <p className={styles.error}>{errors.confirmNewPassword.message}</p>
          )}
        </div>

        <button type="submit" disabled={isSubmitting} className={styles.button}>
          {isSubmitting ? 'Updating…' : 'Update Password'}
        </button>
      </form>
    </div>
  );
}
