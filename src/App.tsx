import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductCustomizer from "./components/ProductCustomizer";
import SpecsComparison from "./components/SpecsComparison";
import Benefits from "./components/Benefits";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";

import { Smartphone, PhoneColor, PhoneStorage, CartItem } from "./types";

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("aura_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("aura_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (
    phone: Smartphone,
    color: PhoneColor,
    storage: PhoneStorage,
    finalPrice: number
  ) => {
    const itemUniqueKey = `${phone.id}-${color.id}-${storage.size}`;

    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === itemUniqueKey);
      if (existing) {
        return prevItems.map((item) =>
          item.id === itemUniqueKey
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: itemUniqueKey,
          phoneId: phone.id,
          name: phone.name,
          color: color,
          storage: storage.size,
          price: finalPrice,
          quantity: 1,
          image: phone.image,
        };
        return [...prevItems, newItem];
      }
    });

    // Auto open cart drawer on item added for excellent user experience
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleScrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      const offset = 80; // height of navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const cartTotalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="bg-zinc-950 min-h-screen text-white font-sans selection:bg-violet-600/30 selection:text-violet-200">
      {/* Floating Header */}
      <Navbar
        cartCount={cartTotalCount}
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* Main Single-Page Sections */}
      <main>
        {/* Hero Banner Section */}
        <Hero
          onCtaClick={() => handleScrollToSection("#personalizar")}
          onCompareClick={() => handleScrollToSection("#comparar")}
        />

        {/* Interactive Customizer and Purchasing Center */}
        <ProductCustomizer onAddToCart={handleAddToCart} />

        {/* Dynamic Comparison Matrix */}
        <SpecsComparison />

        {/* Bento Grid Benefits Section */}
        <Benefits />

        {/* Client Testimonials */}
        <Testimonials />

        {/* Frequently Asked Questions */}
        <FAQ />
      </main>

      {/* Slideout Simulated Shopping Cart & Checkout Wizard */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Corporate Detailed Footer */}
      <Footer />
    </div>
  );
}

