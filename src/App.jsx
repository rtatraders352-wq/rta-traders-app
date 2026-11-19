
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where
} from "firebase/firestore";
import { db } from "./firebase.js";

export default function App() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const q = query(
          collection(db, "products"),
          where("active", "==", true)
        );

        const snapshot = await getDocs(q);

        setProducts(
          snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    if (category === "All") return true;

    if (category === "Wilson") {
  return product.brand === "WELSON";
    }

    if (category === "Joint Plus") {
      return product.brand === "Joint Plus";
    }

    return product.category === "Accessories";
  });

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f2f5fa",
      fontFamily: "Arial, sans-serif",
      color: "#17243a"
    }}>

      <header style={{
        background: "#0b1f3a",
        color: "white",
        padding: "25px 20px"
      }}>
        <h1>RTA TRADERS</h1>
        <p>Wholesale Customer App</p>
        <p>Your Wholesale Business Partner</p>
      </header>

      <main style={{ padding: "18px" }}>

        <h2>Our Products</h2>

        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px"
        }}>
          {[
            ["All", "All Products"],
            ["Wilson", "Wilson"],
            ["Joint Plus", "Joint Plus"],
            ["Accessories", "Accessories"]
          ].map(([value, label]) => (
            <button
              key={value}
              onClick={() => setCategory(value)}
              style={{
                padding: "12px",
                border: "none",
                borderRadius: "8px",
                background:
                  category === value ? "#0b1f3a" : "white",
                color:
                  category === value ? "white" : "#17243a"
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {loading && <p>Loading products...</p>}

        {error && (
          <p style={{ color: "red" }}>
            Error: {error}
          </p>
        )}

        {!loading && !error && filteredProducts.length === 0 && (
          <p>No products available in this category.</p>
        )}

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "12px",
          marginTop: "20px"
        }}>
          {filteredProducts.map(product => (
            <div key={product.id} style={{
              background: "white",
              padding: "12px",
              borderRadius: "12px",
              boxShadow: "0 3px 10px #00000010"
            }}>

              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "130px",
                    objectFit: "contain"
                  }}
                />
              ) : (
                <div style={{
                  height: "130px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#f2f5fa",
                  fontSize: "35px"
                }}>
                  📦
                </div>
              )}

              <h3 style={{ fontSize: "15px" }}>
                {product.name}
              </h3>

              <p style={{ color: "#64748b" }}>
                {product.brand}
              </p>

              <p>
                MRP: ₹{product.mrp || "Price updating"}
              </p>

              <p style={{ fontSize: "12px" }}>
                {product.description}
              </p>
            </div>
          ))}
        </div>

        <div style={{
          background: "#0b1f3a",
          color: "white",
          padding: "20px",
          textAlign: "center",
          borderRadius: "12px",
          marginTop: "30px"
        }}>
          <h2>RTA TRADERS</h2>
          <p>Malegaon, Maharashtra</p>
        </div>

      </main>
    </div>
  );
}
