// src/App.tsx
import React, { useState } from 'react';
import Product from './components/product/Product';
import Cart from './components/cart/Cart';
import bellImage from './assets/bell.jpeg';
import kuraImage from './assets/images.jpeg';


const App: React.FC = () => {
  const [cart, setCart] = useState<{ title: string; price: number; quantity: number }[]>([]);

  const products = [
    { title: 'Bell Erick', description: 'Tamed Plant that Lives in the forest. Very Rare', price: 299.50, image: bellImage },
    { title: 'Cute Fox', description: 'This fox has 9 Tails and it usually taking quiet place for nap or it will get mad ', price: 3999.00, image: kuraImage },
  ];

  const addToCart = (title: string, price: number, image: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.title === title);
      if (existingItem) {
        return prevCart.map(item =>
          item.title === title ? { ...item, quantity: item.quantity + 1, image} : item
        );
      }
      return [...prevCart, { title, price, quantity: 1, image }];
    });
  };

  const removeFromCart = (title: string) => {
    setCart(prevCart => prevCart.filter(item => item.title !== title));
  };

  const handleCheckout = () => {
    if(cart.length === 0) {
      alert("Please select your item first. Your Cart is Empty!");
    } else {
      alert(" Processing Checkout...")
      setCart([]);
    }
  };

  return (
    <div className="min-h-screen mx-auto p-4 bg-yellow-100">
      <h1 className="text-2xl font-bold mb-4 text-center">Sam Store</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <Product
            key={product.title}
            title={product.title}
            description={product.description}
            price={product.price}
            image={product.image}
            onAddToCart={() => addToCart(product.title, product.price, product.image)}
          />
        ))}
      </div >
      <div className="mt-4 p-4 bg-teal-800 text-white rounded-lg shadow-lg"> {/* Dark teal cart */}
        <Cart items={cart} onRemove={removeFromCart} onCheckout={handleCheckout} />

      </div>
    </div>
  );
};

export default App;