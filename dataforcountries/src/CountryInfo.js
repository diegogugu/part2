import CountryDetail from "./CountryDetail"

const CountryInfo = ({ filteredData, showCountry, weather }) => {
    console.log(filteredData);
    return (filteredData.length === 1 ? 
        <CountryDetail filteredData={filteredData[0]} weather={weather}/>
    : <div>
        {filteredData?.length > 10
            ? 'too many matches, specify another filter' :
            filteredData?.map(paese => (
                <p key={paese.name.official}>{paese.name.common}
                    <button onClick={() => showCountry(paese)}>Show</button>
                </p>
            ))}
    </div>
    )
}

export default CountryInfo