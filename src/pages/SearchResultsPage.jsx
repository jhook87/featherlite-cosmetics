import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { fetchProductsFromS3 } from '../utils/productUtils';

const SearchResultsPage = () => {
    const [filters, setFilters] = useState({
        category: '',
        priceRange: '',
        ecoFriendly: false,
        crueltyFree: false,
    });

    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function loadProducts() {
            try {
                const productsData = await fetchProductsFromS3();
                setProducts(productsData);
            } catch (error) {
                console.error('Failed to load products:', error);
            }
        }
        loadProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const result = await API.graphql(graphqlOperation(listProducts));
            const products = result.data.listProducts.items;
            setSearchResults(products);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching products:', err);
            setError('An error occurred while fetching products. Please try again.');
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const filteredResults = searchResults.filter(product => {
        if (filters.category && product.category !== filters.category) return false;
        if (filters.priceRange) {
            const [min, max] = filters.priceRange.split('-').map(Number);
            if (product.price < min || product.price > max) return false;
        }
        // Note: ecoFriendly and crueltyFree filters are commented out as they're not in the current product schema
        // if (filters.ecoFriendly && !product.ecoFriendly) return false;
        // if (filters.crueltyFree && !product.crueltyFree) return false;
        return true;
    });

    return (
        <div className="search-results-page container">
            <aside className="filter-sidebar">
                <h2>Filter Results</h2>
                <div className="filter-section">
                    <h3>Category</h3>
                    <select name="category" value={filters.category} onChange={handleFilterChange}>
                        <option value="">All Categories</option>
                        <option value="Foundation">Foundation</option>
                        <option value="Eyes">Eyes</option>
                        <option value="Lips">Lips</option>
                    </select>
                </div>
                <div className="filter-section">
                    <h3>Price Range</h3>
                    <select name="priceRange" value={filters.priceRange} onChange={handleFilterChange}>
                        <option value="">All Prices</option>
                        <option value="0-25">$0 - $25</option>
                        <option value="25-50">$25 - $50</option>
                        <option value="50-100">$50 - $100</option>
                    </select>
                </div>
                {/* Commented out as these fields are not in the current product schema
                <div className="filter-section">
                    <h3>Product Features</h3>
                    <label>
                        <input
                            type="checkbox"
                            name="ecoFriendly"
                            checked={filters.ecoFriendly}
                            onChange={handleFilterChange}
                        />
                        Eco-Friendly
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="crueltyFree"
                            checked={filters.crueltyFree}
                            onChange={handleFilterChange}
                        />
                        Cruelty-Free
                    </label>
                </div>
                */}
            </aside>
            <main className="search-results">
                <h1>Our Products</h1>
                {loading ? (
                    <p>Loading products...</p>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : (
                    <div className="product-grid">
                        {filteredResults.length > 0 ? (
                            filteredResults.map(product => (
                                <ProductCard key={product.id} product={{
                                    name: product.name,
                                    price: `$${product.price}`,
                                    imageUrl: product.imageUrl
                                }} />
                            ))
                        ) : (
                            <p>No products found matching your criteria.</p>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default SearchResultsPage;