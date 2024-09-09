import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SearchResultsPage = () => {
    const [filters, setFilters] = useState({
        category: '',
        priceRange: '',
        ecoFriendly: false,
        crueltyFree: false,
    });

    const [searchResults, setSearchResults] = useState([
        { id: 1, name: 'Clay Foundation', price: 50, category: 'Foundation', imageUrl: '/assets/clay-foundation.png' },
        { id: 2, name: 'Mineral Eyeshadow Palette', price: 35, category: 'Eyes', imageUrl: '/assets/eyeshadow-palette.png' },
        { id: 3, name: 'Lip & Cheek Tint', price: 25, category: 'Lips', imageUrl: '/assets/lip-cheek-tint.png' },
        // Add more mock results as needed
    ]);

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
        if (filters.ecoFriendly && !product.ecoFriendly) return false;
        if (filters.crueltyFree && !product.crueltyFree) return false;
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
            </aside>
            <main className="search-results">
                <h1>Search Results</h1>
                <div className="product-grid">
                    {filteredResults.length > 0 ? (
                        filteredResults.map(product => (
                            <div key={product.id} className="product-card">
                                <img src={product.imageUrl} alt={product.name} />
                                <h3>{product.name}</h3>
                                <p>${product.price}</p>
                                <Link to={`/product/${product.id}`} className="view-product-btn">View Product</Link>
                            </div>
                        ))
                    ) : (
                        <p>No products found matching your criteria.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default SearchResultsPage;
