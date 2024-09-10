import React from 'react';

const SearchBar = ({ placeholder }) => {
    return (
        <div className="search-bar-container">
            <input
                type="text"
                placeholder={placeholder}
                className="search-bar"
                aria-label="Search"
            />
        </div>
    );
};

export default SearchBar;
