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
        <button onClick={fetchData} className={styles.pageBtn}>
          Retry
        </button>
      </div>
    );
  }

  const totalPages = Math.ceil(total / limit);

  return (
    <div className={styles.container}>
      <h1 className="text-3xl font-bold mb-6">Product Catalog</h1>
      <div className={styles.grid}>
        {products.map((p) => (
          <Link key={p.id} href={`/products/${p.id}`} className={styles.card}>
            <img src={p.thumbnail} alt={p.title} className={styles.thumbnail} />
            <div className={styles.cardBody}>
              <h2 className={styles.title}>{p.title}</h2>
              <p className={styles.meta}>{p.brand}</p>
              <div className={styles.priceRow}>
                <span className={styles.price}>${p.price}</span>
                <span className={styles.discount}>-{p.discountPercentage}%</span>
              </div>
              <p className={styles.rating}>⭐ {p.rating}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className={styles.pagination}>
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className={styles.pageBtn}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`${styles.pageBtn} ${
              page === i + 1 ? styles.pageBtnActive : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className={styles.pageBtn}
        >
          Next
        </button>
      </div>
    </div>
  );
}
