"use client";

import styles from './page.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/utils/validation';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema)
  });

  const onSubmit = (data: LoginFormInputs) => {
    const success = login(data.email, data.password);
    if (success) {
      router.push('/dashboard');
    } else {
      alert('Invalid email or password');
    }
  };

return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles.formRow}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input id="email" type="email" {...register('email')} className={styles.input} />
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        </div>
        <div className={styles.formRow}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input id="password" type="password" {...register('password')} className={styles.input} />
          {errors.password && <p className={styles.error}>{errors.password.message}</p>}
        </div>
        <button type="submit" className={styles.button}>Sign In</button>
      </form>
      <p className="mt-4 text-center">
        Don’t have an account? <a href="/signup" className={styles.link}>Sign up</a>
      </p>
    </div>
  );
}