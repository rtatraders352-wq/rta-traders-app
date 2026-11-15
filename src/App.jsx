import React from "react";

export default function App() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#f4f7fb",
      fontFamily: "Arial, sans-serif"
    }}>
      <header style={{
        background: "#0b1f3a",
        color: "white",
        padding: "22px",
        textAlign: "center"
      }}>
        <h1>RTA TRADERS</h1>
        <p>Wholesale Customer App</p>
      </header>

      <main style={{ padding: "20px" }}>
        <h2>Assalamu Alaikum!</h2>
        <p>Welcome to RTA Traders</p>

        <div style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          marginTop: "20px"
        }}>
          <h3>Customer Login</h3>
          <p>Login to check your special wholesale rates.</p>
          <input placeholder="Enter Mobile Number"
            style={{ padding: "12px", width: "90%" }} />
          <br /><br />
          <button style={{
            background: "#0b1f3a",
            color: "white",
            padding: "12px 25px",
            border: "none",
            borderRadius: "6px"
          }}>
            Login
          </button>
        </div>

        <h3 style={{ marginTop: "25px" }}>Our Brands</h3>
        <p>Joint Plus | Wilson</p>
      </main>
    </div>
  );
}
