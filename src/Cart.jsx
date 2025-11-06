// Cart.jsx
import React from "react";

export default function Cart({ cart, removeFromCart, handleCheckout }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart">
      <h2>Keranjang Belanja</h2>

      {cart.length === 0 ? (
        <p>Keranjang masih kosong</p>
      ) : (
        <table className="cart-table">
          <thead>
            <tr>
              <th>Nama Produk</th>
              <th>Harga</th>
              <th>Jumlah</th>
              <th>Subtotal</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>Rp {item.price.toLocaleString()}</td>
                <td>{item.quantity}</td>
                <td>Rp {(item.price * item.quantity).toLocaleString()}</td>
                <td>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ✅ Tombol tetap muncul meskipun keranjang kosong */}
      <div className="cart-footer">
        <h3>Total: Rp {total.toLocaleString()}</h3>
        <button className="pay-btn" onClick={handleCheckout}>
          Bayar Sekarang
        </button>
      </div>
    </div>
  );
}
