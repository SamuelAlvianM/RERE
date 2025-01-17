import React, { useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

interface CartProps {
  items: { title: string; price: number; quantity: number; image: string }[];
  onRemove: (title: string) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ items, onRemove, onCheckout }) => {
  // Ref untuk menghitung berapa kali user mengklik tombol remove
  const removeClickCount = useRef(0);
  
  // Ref untuk menyimpan total harga sebelumnya untuk perbandingan
  const previousTotalRef = useRef(0);
  
  // Ref untuk menyimpan waktu terakhir checkout dicoba
  const lastCheckoutAttemptRef = useRef<number>(0);
  
  const navigate = useNavigate();

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  // Effect untuk tracking perubahan total harga
  useEffect(() => {
    if (previousTotalRef.current !== totalPrice) {
      console.log(`Total price changed from $${previousTotalRef.current} to $${totalPrice}`);
      previousTotalRef.current = totalPrice;
    }
  }, [totalPrice]);

  // Handler untuk tombol remove dengan tracking
  const handleRemove = (title: string) => {
    removeClickCount.current += 1;
    console.log(`Item removed ${removeClickCount.current} times in this session`);
    onRemove(title);
  }

  // Handler untuk checkout dengan cooldown
  const handleCheckout = () => {
    const now = Date.now();
    const COOLDOWN = 2000; // 2 detik cooldown

    if (now - lastCheckoutAttemptRef.current < COOLDOWN) {
      alert('Please wait a moment before trying to checkout again');
      return;
    }

    lastCheckoutAttemptRef.current = now;
    onCheckout();
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-emerald-200 p-6 font-medium ">
      <div className="bg-yellow-200 rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="font-bold text-2xl text-center text-gray-800 mb-4">Shopping Cart</h2>

        {items.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {items.map(item => (
              <div key={item.title} className="flex justify-between items-center py-2 border-b border-gray-800">
                <img src={item.image} className="w-10 h-10"/>
                <span className="text-gray-700">{item.title} (x{item.quantity})</span>
                <span className="text-gray-700">${(item.price * item.quantity).toFixed(2)}</span>
                <button 
                  // Menggunakan handler baru dengan tracking
                  onClick={() => handleRemove(item.title)} 
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between mt-6 mb-4">
          <span className="font-bold text-lg text-gray-800">TOTAL</span>
          <span className="font-bold text-lg text-gray-800">${totalPrice.toFixed(2)}</span>
        </div>

        <button 
          // Menggunakan handler checkout dengan cooldown
          onClick={handleCheckout} 
          className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors disabled:bg-gray-300"
        >
          Checkout
        </button>
        <button
          onClick={() => navigate('/products')}
          className="w-full mt-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 focus:outline-none transition-colors"
        >
          Back to Product
        </button>
      </div>
    </div>
  );
};

export default Cart;