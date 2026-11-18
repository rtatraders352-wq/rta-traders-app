import React from "react";

const categories = [
  {
    name: "Wilson Products",
    subtitle: "Premium CP Products",
    icon: "🚿"
  },
  {
    name: "Joint Plus Products",
    subtitle: "PTMT Products",
    icon: "🚰"
  },
  {
    name: "Accessories",
    subtitle: "All Plumbing Accessories",
    icon: "🔧",
    items: [
      "Health Faucet",
      "Shower",
      "Connection Pipe",
      "Bottle Trap",
      "Flush Tank",
      "UPVC / CPVC Solvent",
      "Union Ball Valve",
      "SS Jali"
    ]
  }
];

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
        padding: "28px 20px"
      }}>
        <h1>RTA TRADERS</h1>
        <p>Wholesale Customer App</p>
        <p>Your Wholesale Business Partner</p>
      </header>

      <main style={{ padding: "20px" }}>

        <h2>Welcome to RTA Traders</h2>
        <h3>Our Product Categories</h3>

        {categories.map((category) => (
          <div key={category.name} style={{
            background: "white",
            padding: "20px",
            borderRadius: "14px",
            marginBottom: "16px",
            boxShadow: "0 3px 12px #00000010"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "15px"
            }}>
              <span style={{ fontSize: "38px" }}>
                {category.icon}
              </span>
              <div>
                <h3 style={{ margin: 0 }}>
                  {category.name}
                </h3>
                <p style={{ color: "#64748b" }}>
                  {category.subtitle}
                </p>
              </div>
            </div>

            {category.items && (
              <div style={{ marginTop: "12px" }}>
                {category.items.map((item) => (
                  <p key={item} style={{
                    padding: "9px",
                    background: "#f2f5fa",
                    borderRadius: "7px"
                  }}>
                    {item}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}

        <div style={{
          background: "#0b1f3a",
          color: "white",
          padding: "22px",
          borderRadius: "14px",
          textAlign: "center",
          marginTop: "25px"
        }}>
          <h2>RTA TRADERS</h2>
          <p>Wholesale Business Partner</p>
          <p>Malegaon, Maharashtra</p>
        </div>

      </main>
    </div>
  );
}
