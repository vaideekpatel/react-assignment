"use client";

import styles from "./page.module.css";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className={styles.pageWrapper}>
      <main className={styles.container} aria-labelledby="dashboard-heading">
        <header className={styles.header}>
          <h1 id="dashboard-heading" className={styles.greeting}>
            Welcome, {user?.firstName}!
          </h1>
          <button onClick={handleLogout} className={styles.logout}>
            Sign Out
          </button>
        </header>
        <nav>
          <Link href="/profile/edit" className={styles.navLink}>
            Edit Profile
          </Link>
          <Link href="/profile/change-password" className={styles.navLink}>
            Change Password
          </Link>
          <Link href="/products" className={styles.navLink}>
            Product Catalog
          </Link>
        </nav>
      </main>
    </div>
  );
}
