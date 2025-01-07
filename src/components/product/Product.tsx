import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductProps } from "./types";
import { useAuth } from "../../context/AuthContext";



interface Props {
    products: ProductProps[];
    onAddToCart: (title: string, price: number, image: string) => void;
}
interface CartProps{
    
}

const Product: React.FC<Props> = ({ products, onAddToCart }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const productCount = useMemo(() => products.length, [products]);
    const [popupContent, setPopupContent] = useState<string | null>(null);

    const handleNavigate = () => {
        navigate("/cart");
    };

    const handleNavigateToCreate = () => {
        navigate("/add-product");
    };

    const handleAddToCart = (title: string, price: number, image: string) => {
        // Add product to cart
        onAddToCart(title, price, image);
        // Set popup content
        setPopupContent(`Added ${title} product to the cart!`);
        // tutup popup
        setTimeout(() => {
            setPopupContent(null);
        }, 1500);
    };

    return (
        <div className="bg-emerald-100 min-h-screen p-6">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Products</h1>
            <p className="text-lg text-center text-gray-600 mb-4">Total Products: {productCount}</p>
            <div className="flex justify-evenly  mb-6">
                <button
                    onClick={handleNavigate}
                    className="px-6 py-3 bg-violet-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-stone-500"
                >
                    Go to Cart
                </button>
                <button
                    onClick={handleNavigateToCreate}
                    className="px-6 py-3 bg-violet-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-stone-500"
                >
                    Req Product
                </button>

                <button 
                    onClick={() => logout()} 
                    className="px-6 py-3 bg-violet-800 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-stone-500"
                >
                    Logout
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, index, ) => (
                    <div
                        key={index}
                        className="bg-yellow-200 border border-blue-400 rounded-lg shadow-xl p-4 hover:shadow-lg transition duration-300 ease-in-out"
                    >
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-48 object-cover rounded-md mb-4"
                        />
                        <h3 className="text-xl font-semibold text-gray-800">{product.title}</h3>
                        <p className="text-gray-600 mt-2">{product.description}</p>
                        <p className="text-lg font-semibold text-gray-800 mt-2">Price: ${product.price}</p>
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={() => handleAddToCart(product.title, product.price, product.image)}
                                className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Popup  info*/}
            {popupContent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-emerald-300 p-6 rounded-md shadow-xl">
                        <p className="text-lg font-semibold text-stone-800">{popupContent}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Product;
