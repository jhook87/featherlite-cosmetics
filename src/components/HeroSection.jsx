import React, { useEffect, useState } from 'react';
import { Amplify, graphqlOperation } from 'aws-amplify';
import { getProduct } from '../graphql/queries';
import awsconfig from '../aws-exports';
import { API } from '@aws-amplify/api';


const HeroSection = ({ productId }) => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await API.graphql(graphqlOperation(getProduct, { id: productId }));
                const fetchedProduct = response.data.getProduct;
                setProduct({
                    ...fetchedProduct,
                    ctaUrl: `/shop/${fetchedProduct.id}`
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