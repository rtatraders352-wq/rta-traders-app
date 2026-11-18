import React from "react";

export default function App() {
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
        <h1 style={{ margin: 0 }}>RTA TRADERS</h1>
        <p>Wholesale Customer App</p>
        <p>Welcome to RTA Traders</p>
      </header>

      <main style={{ padding: "20px" }}>

        <h2>Our Categories</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "12px"
        }}>

          {[
            "PTMT Fittings",
            "CP Fittings",
            "UPVC Products",
            "CPVC Products",
            "PVC Products",
            "Bathroom Accessories"
          ].map((item) => (
            <div key={item} style={{
              background: "white",
              padding: "25px 10px",
              borderRadius: "12px",
              textAlign: "center",
              fontWeight: "bold",
              boxShadow: "0 3px 10px #00000010"
            }}>
              {item}
            </div>
          ))}

        </div>

        <h2 style={{ marginTop: "30px" }}>
          Our Brands
        </h2>

        <div style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px"
        }}>
          <h3>Joint Plus</h3>
          <h3>Wilson</h3>
        </div>

        <div style={{
          background: "#0b1f3a",
          color: "white",
          padding: "20px",
          borderRadius: "12px",
          marginTop: "25px",
          textAlign: "center"
        }}>
          <h3>RTA TRADERS</h3>
          <p>Your Wholesale Business Partner</p>
          <p>Malegaon, Maharashtra</p>
        </div>

      </main>
    </div>
  );
}
