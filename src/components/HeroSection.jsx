import React, { useEffect, useState } from 'react';

const HeroSection = ({ productId }) => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            // Example of a real API call, replace with actual API in production
            const productData = {
                id: productId,
                name: "Clay Foundation",
                description: "A natural, lightweight foundation for a flawless finish.",
                imageUrl: "/assets/clay-foundation.png",
                ctaUrl: "/shop/clay-foundation",
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
                <a href={product.ctaUrl} className="cta-button" aria-label={`Shop for ${product.name}`}>Shop Now</a>
            </div>
            <div className="hero-image">
                <img src={product.imageUrl} alt={`${product.name} - FeatherLite`} />
            </div>
        </section>
    );
};

export default HeroSection;
