import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuBar from './components/MenuBar';
import Header from './components/Header';
import Products from './components/Products';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/scrape');
        console.log('Data received:', response.data);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <MenuBar />
      <Header />
      <Products data={data} />
    </div>
  );
};

export default App;
