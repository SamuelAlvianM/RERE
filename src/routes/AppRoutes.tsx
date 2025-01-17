import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../components/auth/Login";
import { Cart, Product, ProductForm } from "../components/index";
import PrivateRoute from "../components/auth/PrivateRoute";
import bellImage from '../assets/bell.jpeg';
import kuraImage from '../assets/images.jpeg';
import pikaImage from '../assets/pikachu.jpeg';
import Register from "../components/auth/register";
import GamesPage from "../pages/GamePage";
import BelajarPage from "../pages/BelajarPage";

const AppRoutes: React.FC = () => {

    
    // nambahin produk ke CART
    const addToCart = (title: string, price: number, image: string) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.title === title);
            if (existingItem) {
                return prevCart.map(item =>
                    item.title === title ? { ...item, quantity: item.quantity + 1, image } : item
                );
            }
            return [...prevCart, { title, price, quantity: 1, image }];
        });
    };

    const [cart, setCart] = useState<{ title: string; price: number; quantity: number; image: string }[]>([]);

    const [products, setProducts] = useState([
        { title: 'Bell Erick', description: 'Tamed Plant...', price: 299.50, image: bellImage, onAddToCart: addToCart },
        { title: 'Cute Fox', description: 'This fox has 9 Tails...', price: 3999.00, image: kuraImage, onAddToCart: addToCart },
    ]);

    // ini useEffect
    useEffect(() => {
        const fetchProducts = async () => {
            await new Promise(resolve => setTimeout(resolve, 3000)); // simulate delay
            setProducts(prev => [
                ...prev,
                { title: 'Pikachu', description: 'New product, can give electricity for all houses for 30 years', price: 149.99, image: pikaImage, onAddToCart: addToCart },
            ]);
        };

        fetchProducts();
    }, []);

    //nambahin data baru
    const handleAddProduct = (newProduct: { title: string; description: string; price: number; image: string }) => {
        // kalau belum sesuai requirement
        if (!newProduct.title || !newProduct.description || !newProduct.price) {
            alert('Please fill out all required fields (Title, Description, Price, Image).');
            return;
        }
        // kalo udah
        const productWithAddToCart = { ...newProduct, onAddToCart: addToCart }; // tambahkan onAddToCart
        setProducts(prev => [...prev, productWithAddToCart]);
        
        alert(`New Product Added: ${newProduct.title} - $${newProduct.price}`);
    };
    
    const removeFromCart = (title: string) => {
        setCart(prevCart => prevCart.filter(item => item.title !== title));
    };
    
    const handleCheckout = () => {
        if (cart.length === 0) {
            alert("Please select your item first. Your Cart is Empty!");
        } else {
            alert(" Processing Checkout...")
            setCart([]);
        }
    };

    const handleDeleteProduct = (title: string) => {
        setProducts(prevProducts => prevProducts.filter(product => product.title !== title));
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/products"
                    element={
                        <PrivateRoute>
                            <Product products={products} onAddToCart={addToCart} />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/add-product"
                    element={
                        <PrivateRoute>
                            <ProductForm onSubmit={handleAddProduct} />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/cart"
                    element={
                        <PrivateRoute>
                            <Cart items={cart} onRemove={removeFromCart} onCheckout={handleCheckout} />
                        </PrivateRoute>
                    }
                />

                <Route path="/games" element={<GamesPage />} />
                <Route path="/belajar" element={<BelajarPage />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
