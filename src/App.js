// App.js
import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import ProductList from "./ProductList";
import Cart from "./Cart";
import Payment from "./Payment";
import productsData from "./data";

function App() {
  const [products, setProducts] = useState(productsData);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // ✅ Tambah ke keranjang + kurangi stok
  const addToCart = (product) => {
    if (product.stock <= 0) {
      alert("Stok barang habis!");
      return;
    }

    const updatedProducts = products.map((p) =>
      p.id === product.id ? { ...p, stock: p.stock - 1 } : p
    );
    setProducts(updatedProducts);

    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // ✅ Hapus dari keranjang + tambah stok kembali
  const removeFromCart = (productId) => {
    const existingItem = cart.find((item) => item.id === productId);
    if (!existingItem) return;

    setCart(cart.filter((item) => item.id !== productId));

    const updatedProducts = products.map((p) =>
      p.id === productId ? { ...p, stock: p.stock + existingItem.quantity } : p
    );
    setProducts(updatedProducts);
  };

  // ✅ Fungsi checkout dengan validasi keranjang
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Tambahkan barang dahulu sebelum membayar!");
      return;
    }

    // Jika keranjang tidak kosong, lanjut ke halaman pembayaran
    navigate("/payment");
  };

  return (
    <div className="App">
      <nav>
        <Link to="/">Produk</Link> | <Link to="/cart">Keranjang</Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={<ProductList products={products} addToCart={addToCart} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              handleCheckout={handleCheckout}
            />
          }
        />
        <Route
          path="/payment"
          element={<Payment cart={cart} setCart={setCart} />}
        />
      </Routes>
    </div>
  );
}

export default App;
