// ProductCard.jsx
import React from "react";

export default function ProductCard({ product, addToCart }) {
  return (
    <tr className="product-row">
      <td>{product.name}</td>
      <td>Rp {product.price.toLocaleString()}</td>
      <td>{product.stock > 0 ? product.stock : "Habis"}</td>
      <td>
        <button
          className="add-btn"
          onClick={() => addToCart(product)}
          disabled={product.stock <= 0}
        >
          Tambah ke Keranjang
        </button>
      </td>
    </tr>
  );
}
