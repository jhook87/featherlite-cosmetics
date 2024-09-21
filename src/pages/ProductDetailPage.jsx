import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { getProduct } from '../graphql/queries';
import HeroSection from '../components/HeroSection';

const ProductDetailPage = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await API.graphql(graphqlOperation(getProduct, { id }));
                const fetchedProduct = response.data.getProduct;
                setProduct(fetchedProduct);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setError('An error occurred while fetching the product. Please try again.');
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <div className="product-detail-page">
            <HeroSection productId={id} />
            <div className="product-info container">
                <h1>{product.ColorDescription}</h1>
                <p className="sku">SKU: {product.SKU}</p>
                <p className="price">Price: ${product.RetailPrice}</p>
                <p className="size">Size: {product.ProdutSize}</p>
                <p className="category">Category: {product.ProductCategory}</p>
                <div className="details">
                    <h2>Product Details</h2>
                    <p>{product.ProductDetails}</p>
                </div>
                <button className="add-to-cart-btn">Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductDetailPage;