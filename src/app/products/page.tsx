"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getProducts, Product } from "@/services/productService";
import Spinner from "@/components/Spinner/Spinner";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const limit = 8;

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const skip = (page - 1) * limit;
      const data = await getProducts(skip, limit);
      setProducts(data.products);
      setTotal(data.total);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to load products. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  if (loading) {
    return (
      <div className="text-center mt-12">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button onClick={fetchData} className={styles.retryBtn}>
          Retry
        </button>
      </div>
    );
  }

  const totalPages = Math.ceil(total / limit);

  const getPageList = (current: number, total: number) => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const pages: (number | string)[] = [1, 2];
    if (current > 4) pages.push("...");
    const start = Math.max(3, current - 1);
    const end = Math.min(total - 2, current + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (current < total - 3) pages.push("...");
    pages.push(total - 1, total);
    return pages;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Product Catalog</h1>

      <div className={styles.grid}>
        {products.map((p) => (
          <Link key={p.id} href={`/products/${p.id}`} className={styles.card}>
            <img src={p.thumbnail} alt={p.title} className={styles.thumbnail} />
            <div className={styles.cardBody}>
              <h2 className={styles.title}>{p.title}</h2>
              {/* <p className={styles.meta}>{p.brand}</p> */}
              <div className={styles.priceRow}>
                <span className={styles.price}>${p.price}</span>
                <span className={styles.discount}>-{p.discountPercentage}%</span>
              </div>
              <p className={styles.rating}>⭐ {p.rating.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className={styles.pagination}>
        {getPageList(page, totalPages).map((p, idx) =>
          typeof p === "number" ? (
            <button
              key={idx}
              onClick={() => setPage(p)}
              className={`${styles.pageBtn} ${
                p === page ? styles.activeBtn : ""
              }`}
            >
              {p}
            </button>
          ) : (
            <span key={idx} className={styles.ellipsis}>
              {p}
            </span>
          )
        )}
      </div>
    </div>
  );
}
