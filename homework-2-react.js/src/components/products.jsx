"use client";

import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [deletedProducts, setDeletedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=20")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = (product) => {
     setProducts(products.filter((p) => p.id !== product.id));
     setDeletedProducts([...deletedProducts, product]);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Products</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "contain",
              }}
            />

            <h4>{product.title}</h4>
            <p>${product.price}</p>

            <button
              onClick={() => handleDelete(product)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "8px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}