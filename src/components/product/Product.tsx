import React from 'react';

interface ProductProps {
    title: string;
    description: string;
    price: number;
    image: string;
    onAddToCart: () => void;
    onDelete: () => void;
}

const Product: React.FC<ProductProps> = ({ title, description, price, image, onAddToCart }) => {

    return (
        <div className="border rounded-lg p-4 shadow-inner hover:shadow-lg bg-emerald-300">
            <img src={image} alt={title} className="w-full h-48 object-cover rounded" />
            <h2 className="font-bold text-lg">{title}</h2>
            <p>{description}</p>
            <p className="text-red-500 font-semibold">${price.toFixed(2)}</p>
            <button onClick={onAddToCart} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
            Add to Cart
        </button>
        </div>
    );
};

export default Product;