import React, { useRef, useState } from "react";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut
} from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where
} from "firebase/firestore";
import { auth, db } from "./firebase.js";

export default function App() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const verifier = useRef(null);

  async function findCustomer(number) {
    const q = query(
      collection(db, "customers"),
      where("mobile", "==", number),
      where("status", "==", "active")
    );
    const result = await getDocs(q);
    return result.empty ? null : result.docs[0].data();
  }

  async function sendOTP() {
    const number = mobile.trim();

    if (!/^[6-9]\d{9}$/.test(number)) {
      setMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const approvedCustomer = await findCustomer(number);

      if (!approvedCustomer) {
        setMessage("Your account is not approved by RTA Traders.");
        setLoading(false);
        return;
      }

      if (!verifier.current) {
        verifier.current = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          { size: "normal" }
        );
      }

      const result = await signInWithPhoneNumber(
        auth,
        "+91" + number,
        verifier.current
      );

      setConfirmation(result);
      setMessage("OTP sent successfully. Please check your SMS.");
    } catch (error) {
      setMessage("OTP error: " + error.message);
      if (verifier.current) {
        verifier.current.clear();
        verifier.current = null;
      }
    }

    setLoading(false);
  }

  async function verifyOTP() {
    if (!otp.trim()) {
      setMessage("Please enter OTP.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const result = await confirmation.confirm(otp.trim());
      const number = mobile.trim();
      const approvedCustomer = await findCustomer(number);

      if (!approvedCustomer) {
        await signOut(auth);
        setMessage("Your account is not approved.");
        setLoading(false);
        return;
      }

      setCustomer(approvedCustomer);
      setMessage("Login successful!");
    } catch (error) {
      setMessage("OTP verification failed. Please try again.");
    }

    setLoading(false);
  }

  async function logout() {
    await signOut(auth);
    setCustomer(null);
    setConfirmation(null);
    setOtp("");
    setMobile("");
    setMessage("You have logged out.");
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f4f7fb",
      fontFamily: "Arial, sans-serif",
      color: "#17243a"
    }}>
      <header style={{
        background: "#0b1f3a",
        color: "white",
        padding: "25px",
        textAlign: "center"
      }}>
        <h1>RTA TRADERS</h1>
        <p>Wholesale Customer App</p>
      </header>

      <main style={{
        maxWidth: "500px",
        margin: "auto",
        padding: "20px"    
    }}>
      <p>Welcome to RTA Traders</p>

        <div style={{
          background: "white",
          padding: "22px",
          borderRadius: "12px",
          marginTop: "20px",
          boxShadow: "0 3px 12px #00000010"
        }}>
          {customer ? (
            <>
              <h3>Welcome, {customer.name}!</h3>
              <p>Your account is active.</p>
              <p>Mobile: {customer.mobile}</p>
              <p>Address: {customer.address}</p>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <h3>Customer Login</h3>
              <p>Login with your registered mobile number.</p>

              {!confirmation ? (
                <>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Enter 10-digit mobile number"
                    maxLength={10}
                    style={{
                      width: "100%",
                      padding: "13px",
                      border: "1px solid #ccd5e0",
                      borderRadius: "8px"
                    }}
                  />

                  <div id="recaptcha-container"
                    style={{ marginTop: "15px" }} />

                  <button
                    onClick={sendOTP}
                    disabled={loading}
                    style={buttonStyle}
                  >
                    {loading ? "Please wait..." : "Send OTP"}
                  </button>
                </>
              ) : (
                <>
                  <p>OTP sent to +91 {mobile}</p>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter SMS OTP"
                    maxLength={6}
                    style={{
                      width: "100%",
                      padding: "13px",
                      border: "1px solid #ccd5e0",
                      borderRadius: "8px"
                    }}
                  />

                  <button
                    onClick={verifyOTP}
                    disabled={loading}
                    style={buttonStyle}
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </button>
                </>
              )}

              {message && (
                <p style={{ marginTop: "15px", overflowWrap: "anywhere" }}>
                  {message}
                </p>
              )}
            </>
          )}
        </div>

        <h3 style={{ marginTop: "25px" }}>Our Brands</h3>
        <p>Joint Plus | Wilson</p>
      </main>
    </div>
  );
}

const buttonStyle = {
  background: "#0b1f3a",
  color: "white",
  padding: "13px 25px",
  border: "none",
  borderRadius: "8px",
  width: "100%",
  marginTop: "18px",
  cursor: "pointer"
};
