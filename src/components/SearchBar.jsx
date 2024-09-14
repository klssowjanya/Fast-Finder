import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ countries }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);  
  const [selectedCountry, setSelectedCountry] = useState(null);  
  const [submitted, setSubmitted] = useState(false);  

  const handleInputChange = (e) => {
    const input = e.target.value;
    setQuery(input);
    setSelectedCountry(null);  
    setSubmitted(false);  

    if (input) {
      const filteredSuggestions = countries
        .flatMap(country => [
          country.country.toLowerCase().includes(input.toLowerCase()) ? country.country : null,
          country.capital.toLowerCase().includes(input.toLowerCase()) ? country.capital : null
        ])
        .filter(Boolean);  
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);  
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const matchedCountry = countries.find(country =>
        country.country.toLowerCase() === query.toLowerCase() || 
        country.capital.toLowerCase() === query.toLowerCase()
      );

      if (matchedCountry) {
        setSelectedCountry(matchedCountry);
        setSuggestions([]);
      } else {
        setSelectedCountry(null);
      }

      setSubmitted(true);  
      setQuery('');  
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);  
    const matchedCountry = countries.find(country =>
      country.country === suggestion || country.capital === suggestion
    );
    setSelectedCountry(matchedCountry);  
    setSuggestions([]);  
    setSubmitted(true);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by country or capital..."
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}  
        className="input-field"
      />

      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li 
              key={index}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}

      {submitted && selectedCountry && (
        <div className="country-details">
          <h2>{selectedCountry.country}</h2>
          <p><strong>Capital:</strong> {selectedCountry.capital}</p>
          <p><strong>Population:</strong> {selectedCountry.population}</p>
          <p><strong>Official Language(s):</strong> {Array.isArray(selectedCountry.official_language) ? selectedCountry.official_language.join(', ') : selectedCountry.official_language}</p>
          <p><strong>Currency:</strong> {selectedCountry.currency}</p>
        </div>
      )}

      {submitted && !selectedCountry && (
        <p>No country or capital found matching your query.</p>
      )}
    </div>
  );
};

export default SearchBar;