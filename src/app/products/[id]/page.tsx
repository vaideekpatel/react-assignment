"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getProductById, Product } from "@/services/productService";
import Spinner from "@/components/Spinner/Spinner";

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDetail = async () => {
    if (!id) return;
    setLoading(true);
    setError(null);

    try {
      const data = await getProductById(Number(id));
      setProduct(data);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Unable to load product details. Please retry.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

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
        <button
          onClick={fetchDetail}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className={styles.container}>
      <button onClick={() => router.back()} className={styles.backButton}>
        ← Back
      </button>
      <h1 className={styles.title}>{product.title}</h1>
      <p className={styles.meta}>
        {product.category} — {product.brand}
      </p>
      <div className={styles.grid}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className={styles.mainImage}
        />
        <div className={styles.detailBody}>
          <p>{product.description}</p>
          <div className={styles.detailRow}>
            <span className={styles.label}>Price:</span>
            <span className={styles.value}>${product.price}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.label}>Discount:</span>
            <span className={styles.value}>
              {product.discountPercentage}%
            </span>
          </div>
          <div className={styles.imagesRow}>
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${product.title} ${idx + 1}`}
                className={styles.thumbnailSmall}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
