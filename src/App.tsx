
import React, { useEffect, useState } from 'react';
import Product from './components/product/Product';
import Cart from './components/cart/Cart';
import bellImage from './assets/bell.jpeg';
import kuraImage from './assets/images.jpeg';
import pikaImage from './assets/pikachu.jpeg';
import ProductForm from './components/product/ProductForm';


const App: React.FC = () => {
  const [cart, setCart] = useState<{ title: string; price: number; quantity: number }[]>([]);

  const [products, setProducts] = useState([
    { title: 'Bell Erick', description: 'Tamed Plant...', price: 299.50, image: bellImage },
    { title: 'Cute Fox', description: 'This fox has 9 Tails...', price: 3999.00, image: kuraImage },
  ]);

  // ini useEffect
  useEffect(() => {
    const fetchProducts = async () => {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setProducts(prev => [
        ...prev,
        { title: 'Pikachu', description: 'Newproduct, can give electricity for all houses for 30years', price: 149.99, image: pikaImage },
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
  setProducts(prev => [...prev, newProduct]);

  alert(`New Product Added: ${newProduct.title} - $${newProduct.price}`);
};

  // nambahin produk ke CART
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

    // checkout product
  const handleCheckout = () => {
    if(cart.length === 0) {
      alert("Please select your item first. Your Cart is Empty!");
    } else {
      alert(" Processing Checkout...")
      setCart([]);
    }
  };

  const handleDeleteProduct = (title: string) => {
    setProducts(prevProducts => prevProducts.filter(product => product.title !== title));
  };

  // panggil route sesuai urutan
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
            onDelete={() => handleDeleteProduct(product.title)}
          />
        ))}
      </div >
      <div className="mt-4 p-4 bg-teal-800 text-white rounded-lg shadow-lg"> 
        <Cart items={cart} onRemove={removeFromCart} onCheckout={handleCheckout} />
      </div>
      <div className="mt-4">
      <ProductForm onSubmit={handleAddProduct} />
      </div>
    </div>
  );
};

export default App;