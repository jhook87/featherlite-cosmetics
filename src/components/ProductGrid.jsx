import React, { useEffect, useState } from 'react';
import { fetchProductsFromS3 } from '../utils/productUtils';
import ProductCard from './ProductCard';

const ProductGrid = () => {
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
        <section className="product-grid">
            <h2>Our Products</h2>
            <div className="grid">
                {products.map((product) => (
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

export default ProductGrid;