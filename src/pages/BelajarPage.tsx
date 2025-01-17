
import React, { useRef, useMemo, useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const BelajarPage: React.FC = () => {
  // State untuk products
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Laptop", price: 1000, quantity: 1 },
    { id: 2, name: "Phone", price: 500, quantity: 2 },
    { id: 3, name: "Tablet", price: 300, quantity: 3 },
  ]);

  // useRef Examples
  const clickCountRef = useRef(0);
  const lastActionTimeRef = useRef(Date.now());
  const inputRef = useRef<HTMLInputElement>(null);

  // useMemo Examples
  const totalValue = useMemo(() => {
    console.log("Calculating total value..."); // Untuk menunjukkan kapan kalkulasi terjadi
    return products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  }, [products]);

  const averagePrice = useMemo(() => {
    console.log("Calculating average price..."); 
    return products.length > 0 
      ? products.reduce((sum, product) => sum + product.price, 0) / products.length 
      : 0;
  }, [products]);

  // Kombinasi useRef dan useMemo untuk tracking performa
  const performanceMetrics = useMemo(() => {
    const currentTime = Date.now();
    const timeSinceLastAction = currentTime - lastActionTimeRef.current;
    
    return {
      clickCount: clickCountRef.current,
      timeSinceLastAction,
      averageValuePerClick: totalValue / (clickCountRef.current || 1)
    };
  }, [totalValue]);

  // Handlers
const handleAddProduct = () => {
    clickCountRef.current += 1;
    lastActionTimeRef.current = Date.now();
    
    const newProduct: Product = {
    id: Date.now(),
    name: inputRef.current?.value || "New Product",
      price: Math.floor(Math.random() * 1000),
    quantity: 1
    };

    setProducts(prev => [...prev, newProduct]);
};

 function boilWater(callback: () => void): void {
    console.log("Memanaskan air...");
    setTimeout(() => {
        console.log("Air sudah panas.");
        callback();
    }, 2000);
}

 function brewCoffee(callback: () => void): void {
    console.log("Menyeduh kopi...");
    setTimeout(() => {
        console.log("Kopi sudah diseduh.");
        callback();
    }, 1500);
}

 function serveCoffee(): void {
    console.log("Menyajikan kopi. Kopi siap diminum!");
}

const bikin_kopi = () => {
    brewCoffee(() => {
        boilWater(() => {
            serveCoffee();
        });
    });
};



return (
    <div className="p-6 bg-gray-100 min-h-screen">
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Belajar useRef dan useMemo</h1>

        {/* Input Section */}
        <div className="mb-6">
        <input
            ref={inputRef}
            type="text"
            placeholder="Enter product name"
            className="border p-2 rounded mr-2"
        />
        <button
            onClick={handleAddProduct}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
            Add Product
        </button>
        </div>

        {/* Metrics Display */}
        <div className="mb-6 p-4 bg-gray-50 rounded">
        <h2 className="font-bold mb-2">Metrics (useMemo):</h2>
        <p>Total Value: ${totalValue}</p>
        <p>Average Price: ${averagePrice.toFixed(2)}</p>
        </div>

        <div className="mb-6 p-4 bg-gray-50 rounded">
        <h2 className="font-bold mb-2">Performance Metrics (Combined):</h2>
        <p>Click Count: {performanceMetrics.clickCount}</p>
        <p>Time Since Last Action: {performanceMetrics.timeSinceLastAction}ms</p>
        <p>Average Value Per Click: ${performanceMetrics.averageValuePerClick.toFixed(2)}</p>
        </div>

        {/* Products List */}
        <div>
        <h2 className="font-bold mb-2">Products:</h2>
        {products.map(product => (
            <div key={product.id} className="border-b py-2">
            <p>{product.name} - ${product.price} x {product.quantity}</p>
            </div>
        ))}
        </div>
        <article>
            <h1 className="font-bold mb-2"> cara bikin kopi</h1>
            <button
            onClick={bikin_kopi}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-emerald-600"
        >
            coba klik
        </button>
        </article>
    </div>
    </div>
    );
};

export default BelajarPage;