import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';

const App = () => {
  const [countries, setCountries] = useState([]);

  // Fetch JSON data when the component mounts
  useEffect(() => {
    fetch('/data/countries.json')  // Adjust the path if needed
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error('Error fetching countries:', error));
  }, []);

  return (
    <div className="app">
      <h1>Country Search</h1>
      <SearchBar countries={countries} />
    </div>
  );
};

export default App;