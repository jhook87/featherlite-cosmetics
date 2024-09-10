import React from 'react';
import ProductCard from './ProductCard'; // Reusable ProductCard component

const ProductGrid = () => {
    const products = [
        { name: 'Clay Foundation', price: '$50', imageUrl: '/assets/clay-foundation.png', id: '1' },
        { name: 'Mineral Eyeshadow Palette', price: '$35', imageUrl: '/assets/eyeshadow-palette.png', id: '2' },
        { name: 'Lip & Cheek Tint', price: '$25', imageUrl: '/assets/lip-cheek-tint.png', id: '3' },
    ];

    return (
        <section className="product-grid">
            <h2>Best Sellers</h2>
            <div className="grid">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
};

export default ProductGrid;
