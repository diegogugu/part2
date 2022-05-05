import axios from 'axios'
import { useEffect } from 'react';
import { useState } from 'react';
import CountryInfo from './CountryInfo';
import { storedData } from './index';

function App() {
  const api_key = process.env.REACT_APP_API_KEY; //57a66cb027adad72e31db876bc1659fb
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState('');
  const [weather, setWeather] = useState(null);

  const getData = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setData(response.data);
        setFilteredData(response.data);
      })
  }

  const getWeather = ([lat, lon]) => {
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
      .then(response => {
        setWeather(response.data)
      }, err => {
        setWeather(storedData); // get storedData from index.js in case apikey will expired to show (fake) data in any case
      })
  }

  useEffect(getData, []);

  const handleFilter = (event) => {
    const filterData = data.filter(paese => paese.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
    setFilter(event.target.value);
    setFilteredData(filterData);
    if (filterData.length === 1) {
      showCountry(filterData[0]);
    }
  }

  const showCountry = (country) => {
    getWeather(country.latlng)
    setFilteredData([country])
  }

  return (
    <>
      <form>
        find countries: <input value={filter} onChange={handleFilter}></input>
      </form>
      {filter ? <CountryInfo filteredData={filteredData} showCountry={showCountry} weather={weather} /> :
        'insert filter'}
    </>
  );

}

export default App;
