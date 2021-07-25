import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherInfo = ({country}) => {
  return(
    <>
      <span>{country.location.name}</span>
      <span>{country.current.observation_time}</span>
      <span>{country.current.temperature}</span>
      <span>{country.current.weather_icons}</span>
      <span>{country.current.weather_descriptions}</span>
    </>
  )
}
const CountryInfo = ({country}) => {
  //const [weatherData, setWeatherData] = useState({});
  //let apiResponse;
  const axios = require('axios');
  let city_name = 'London';
  let state_code = 'uk';
  let api_key = '07ef772b3d1c0f2446d965da65efb659';

  axios.get(`api.openweathermap.org/data/2.5/weather?q=${city_name},${state_code}&appid=${api_key}`)
    .then(response => {
      //setWeatherData(response.data);
      //console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`);
      console.log(response.data);
    }).catch(error => {
      console.log(error);
    });
  return(
    <>
      <h1>{country.name}</h1>
      <p>{country.population}</p>
      <ul>
        {country.languages.map(language => {
          return <li key={language.name}>{language.name}</li>
        })}
      </ul>
      <img src={country.flag} height="100" width="100" alt={`the ${country.demonym} flag`}/>
      
    </>
  )
}
function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [perfectMatch, setPerfectMatch] = useState([]);
  let countries = [];

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
         .then(response => {
           countries = response.data
         })
  })

  const searchCountry = (event) => {
    let str = event.target.value.toLowerCase();
    if(/[a-zA-Z]/.test(str) === false) return;
    let strRegex = new RegExp(str, 'gi')
    let result = [];
    countries.forEach(country => {
      let countryName = country.name.toLowerCase();
      if(str === countryName){
        //console.log(`search string is ${str}, matched country is ${countryName}`);
        setPerfectMatch([...perfectMatch, country]);
      }else if(country.name.match(strRegex) !== null){
        result.push(country)
      }
    })
    setSearchResults(result);
  }

  const displayCountries = () => {
    if(perfectMatch.length > 0){
      console.log(perfectMatch)
      let country = perfectMatch[0];
      return <CountryInfo country={country}/>
    }
    if(searchResults.length ===  1){
      let country = searchResults[0];
      return <CountryInfo country={country}/>
    }else if(searchResults.length > 10){
      console.log(searchResults);
      return 'Too many countries, specify another filter';
    }else {
      let matchedCountries = searchResults.map(country => {
        return(
          <div>
            <span>{country.name}</span>
            <button onClick={()=> setPerfectMatch([...perfectMatch, country])}>
              show
              </button>
          </div>
        )
      })
      return matchedCountries;
    }
  }

  return (
    <div className="App">
      <h1>Countries</h1>
        search countries<input type="text" onInput={searchCountry}/>
        <div>{searchResults && displayCountries()}</div>
    </div>
  );
}

export default App;
