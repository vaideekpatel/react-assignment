"use client";
import styles from './page.module.css';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileSchema } from "@/utils/validation";
import { useAuth } from "@/hooks/useAuth";
import { findUserByEmail } from "@/services/authService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProfileFormInputs {
  firstName: string;
  lastName:  string;
  email:     string;
  mobile:    string;
}

export default function EditProfilePage() {
  const { user, updateProfile } = useAuth();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && user === null) {
      router.replace("/login");
    }
  }, [mounted, user, router]);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormInputs>({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName:  user?.lastName  || "",
      email:     user?.email     || "",
      mobile:    user?.mobile    || "",
    },
    resolver: yupResolver(profileSchema),
  });

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName,
        lastName:  user.lastName,
        email:     user.email,
        mobile:    user.mobile,
      });
    }
  }, [user, reset]);

  const onSubmit = (data: ProfileFormInputs) => {
    if (data.email !== user?.email) {
      const existing = findUserByEmail(data.email);
      if (existing && existing.id !== user?.id) {
        setError("email", {
          type: "manual",
          message: "That email is already in use",
        });
        return;
      }
    }

    updateProfile({
      firstName: data.firstName,
      lastName:  data.lastName,
      email:     data.email,
      mobile:    data.mobile,
    });
    router.push("/dashboard");
  };

  if (!mounted || user === null) return null;

 return (
    <div className={styles.container}>
      <h1 className={styles.title}>Edit Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles.formRow}>
          <label htmlFor="firstName" className={styles.label}>First Name</label>
          <input id="firstName" {...register('firstName')} className={styles.input} />
          {errors.firstName && <p className={styles.error}>{errors.firstName.message}</p>}
        </div>

        <div className={styles.formRow}>
          <label htmlFor="lastName" className={styles.label}>Last Name</label>
          <input id="lastName" {...register('lastName')} className={styles.input} />
          {errors.lastName && <p className={styles.error}>{errors.lastName.message}</p>}
        </div>

        <div className={styles.formRow}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input id="email" type="email" {...register('email')} className={styles.input} />
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        </div>

        <div className={styles.formRow}>
          <label htmlFor="mobile" className={styles.label}>Mobile Number</label>
          <input id="mobile" {...register('mobile')} className={styles.input} />
          {errors.mobile && <p className={styles.error}>{errors.mobile.message}</p>}
        </div>

        <button type="submit" disabled={!isDirty} className={styles.button}>
          Save Changes
        </button>
      </form>
    </div>
  );
}
