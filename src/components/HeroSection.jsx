import React, { useEffect, useState } from 'react';

const HeroSection = ({ productId }) => {
    const [product, setProduct] = useState(null);

    // Simulated API call to fetch product details based on productId
    useEffect(() => {
        const fetchProduct = async () => {
            // Simulated product data (replace this with actual API call)
            const productData = {
                id: productId,
                name: "Clay Foundation",
                description: "A natural, lightweight foundation for a flawless finish.",
                imageUrl: "/assets/clay-foundation.png", // Path to the product image
                ctaUrl: "/shop/clay-foundation", // Product page URL
            };
            setProduct(productData);
        };
        fetchProduct();
    }, [productId]);

    if (!product) return null;

    return (
        <section className="hero-section container">
            <div className="hero-content">
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <a href={product.ctaUrl} className="cta-button">Shop Now</a>
            </div>
            <div className="hero-image">
                <img src={product.imageUrl} alt={product.name} />
            </div>
        </section>
    );
};

export default HeroSection;