import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductsFromS3 } from '../utils/productUtils';
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
                const allProducts = await fetchProductsFromS3();
                const fetchedProduct = allProducts.find(p => p.SKU === id);
                if (fetchedProduct) {
                    const imageUrl = `https://featherlites3.s3.amazonaws.com/productImages/${encodeURIComponent(fetchedProduct.ProductCategory)}/${encodeURIComponent(fetchedProduct.SKU)}.jpg`;
                    setProduct({ ...fetchedProduct, imageUrl });
                } else {
                    setError('Product not found');
                }
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
                <img src={product.imageUrl} alt={product.ColorDescription} className="product-image" />
                <h1>{product.ColorDescription}</h1>
                <p className="sku">SKU: {product.SKU}</p>
                <p className="price">Price: ${product.RetailPrice}</p>
                <p className="size">Size: {product.ProductSize}</p>
                <p className="weight">Weight: {product.Weight}</p>
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