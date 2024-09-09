import React from 'react';

const ShopPage = () => {
    const products = [
        { id: 1, name: 'Clay Foundation', price: '$50', imageUrl: '/assets/clay-foundation.png' },
        { id: 2, name: 'Mineral Eyeshadow Palette', price: '$35', imageUrl: '/assets/eyeshadow-palette.png' },
        { id: 3, name: 'Lip & Cheek Tint', price: '$25', imageUrl: '/assets/lip-cheek-tint.png' },
    ];

    return (
        <section className="shop-page container">
            <h1>Shop Our Products</h1>
            <div className="product-grid">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <img src={product.imageUrl} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>{product.price}</p>
                        <button>View Product</button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ShopPage;
