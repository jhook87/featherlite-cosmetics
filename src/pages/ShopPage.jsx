// src/pages/ShopPage.jsx
import React, { useEffect, useState } from 'react';
import { fetchProductsFromS3 } from '../utils/productUtils';
import ProductCard from '../components/ProductCard';

const ShopPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function loadProducts() {
            try {
                const productsData = await fetchProductsFromS3();
                setProducts(productsData);
            } catch (error) {
                console.error('Failed to load products:', error);
            }
        }
        loadProducts();
    }, []);

    return (
        <section className="shop-page container">
            <h1>Shop Our Products</h1>
            <div className="product-grid">
                {products.map(product => (
                    <ProductCard key={product.SKU} product={{
                        name: product.ColorDescription,
                        price: `$${product.RetailPrice}`,
                        imageUrl: `/assets/${product.SKU}.png`,
                        id: product.SKU
                    }} />
                ))}
            </div>
        </section>
    );
};

export default ShopPage;