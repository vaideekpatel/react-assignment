"use client";

import styles from "./page.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/utils/validation";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

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
    setError,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    const success = login(data.email, data.password);
    if (!success) {
      setError("password", {
        type: "manual",
        message: "Invalid email or password",
      });
      return;
    }
    router.push("/dashboard");
  };

  return (
    <div className={styles.pageWrapper}>
      <main className={styles.container} aria-labelledby="login-heading">
        <h1 id="login-heading" className={styles.title}>
          Sign In
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Email Field */}
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className={styles.input}
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className={styles.error} role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className={styles.input}
              aria-invalid={errors.password ? "true" : "false"}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            {errors.password && (
              <p id="password-error" className={styles.error} role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button type="submit" className={styles.button}>
            Sign In
          </button>
        </form>

        <p className="mt-4 text-center">
          Don’t have an account?{" "}
          <a href="/signup" className={styles.link}>
            Sign up
          </a>
        </p>
      </main>
    </div>
  );
}
