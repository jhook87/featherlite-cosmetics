import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { getProduct } from '../graphql/queries';

const HeroSection = ({ productId }) => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await API.graphql(graphqlOperation(getProduct, { id: productId }));
                const fetchedProduct = response.data.getProduct;
                const imageUrl = `https://featherlites3.s3.amazonaws.com/${encodeURIComponent(fetchedProduct.ProductCategory)}/${encodeURIComponent(fetchedProduct.ColorDescription)}.jpg`;
                setProduct({
                    ...fetchedProduct,
                    ctaUrl: `/shop/${fetchedProduct.id}`,
                    imageUrl: imageUrl
                });
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProduct();
    }, [productId]);

    if (!product) return null;

    return (
        <section className="hero-section container">
            <div className="hero-content">
                <h1>{product.ColorDescription}</h1>
                <p>{product.ProductDetails}</p>
                <a href={product.ctaUrl} className="cta-button" aria-label={`Shop for ${product.ColorDescription}`}>Shop Now</a>
            </div>
            <div className="hero-image">
                <img src={product.imageUrl} alt={`${product.ColorDescription} - FeatherLite`} />
            </div>
        </section>
    );
};

export default HeroSection;