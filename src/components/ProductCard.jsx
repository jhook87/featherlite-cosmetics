import React from 'react';

const ProductCard = ({ product }) => {
    const imageUrl = `https://featherlites3.s3.amazonaws.com/${encodeURIComponent(product.ProductCategory)}/${encodeURIComponent(product.ColorDescription)}.jpg`;

    return (
        <div className="product-card">
            <img src={imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <button>Add to Cart</button>
        </div>
    );
};

export default ProductCard;