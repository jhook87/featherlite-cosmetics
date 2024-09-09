import React from 'react';

const ProductGrid = () => {
    const products = [
        { name: 'Clay Foundation', price: '$50' },
        { name: 'Mineral Eyeshadow Palette', price: '$35' },
        { name: 'Lip & Cheek Tint', price: '$25' },
    ];

    return (
        <section className="product-grid">
            <h2>Best Sellers</h2>
            <div className="grid">
                {products.map((product, index) => (
                    <div className="product-card" key={index}>
                        <img src={`path_to_image_${index}`} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>{product.price}</p>
                        <button>Add to Cart</button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProductGrid;
