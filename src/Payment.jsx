// Payment.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Payment({ cart, setCart }) {
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayment = () => {
    alert(`Pembayaran sebesar Rp${total.toLocaleString()} berhasil!`);
    setCart([]); // ✅ kosongkan keranjang setelah pembayaran
    navigate("/"); // kembali ke halaman utama
  };

  return (
    <div className="payment">
      <h2>Halaman Pembayaran</h2>
      <p>Total Pembayaran: Rp {total.toLocaleString()}</p>

      <button onClick={handlePayment}>Konfirmasi Pembayaran</button>
    </div>
  );
}
