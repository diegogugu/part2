
const CountryDetail = ({ filteredData, weather }) => {
    console.log(weather);
    const languagesArray = Object.keys(filteredData.languages);
    console.log(weather);
    return (<div>
        <h1>{filteredData.name.common}</h1>
        <p>capital: {filteredData.capital.map(capitale => <span key={capitale}>{capitale}</span>)}</p>
        <p>area: {filteredData.area}</p>
        <p>
            <strong>languages:</strong>
        </p>
        <ul>
            {languagesArray.map(lang => <li key={lang}>{filteredData.languages[lang]}</li>)}
        </ul>
        <img src={filteredData.flags.png} />
        {weather ? <>
        <h3>Weather in {filteredData.capital[0]}</h3>
        <p>temperature {weather.main.temp}° Celsius </p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0]?.icon}@2x.png`}></img>
        <p>wind {weather.wind.speed} km/h</p> </> 
        : <></>}

    </div>
    )
}

export default CountryDetail
