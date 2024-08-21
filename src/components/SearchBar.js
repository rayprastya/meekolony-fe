import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange }) => (
  <div className="search mb-4">
    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      className="bg-gray-800 text-white p-2 rounded-lg w-full"
    />
  </div>
);

export default SearchBar;
