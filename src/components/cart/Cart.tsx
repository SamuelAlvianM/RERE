
import React from 'react';

interface CartProps {
  items: { title: string; price: number; quantity: number }[];
  onRemove: (title: string) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ items, onRemove, onCheckout }) => {

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h2 className="font-bold text-lg">Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        items.map(item => (
          <div key={item.title} className="flex justify-between items-center">
            <span>{item.title} (x{item.quantity})</span>
            <span>${item.price.toFixed(2)}</span>
            <button onClick={() => onRemove(item.title)} className="text-red-500">Remove</button>
          </div>
        ))
      )}
      <div>
        <span className="font-bold text-lg"> TOTAL </span>
        <span className="font-bold text-lg  text-center ">${totalPrice.toFixed(2)}</span>
      </div>
      <button 
        onClick={onCheckout} 
        className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Checkout
      </button>
    </div>
  );
};

export default Cart;