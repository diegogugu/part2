import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
export const storedData = {"coord": {
  "lon": 12.4839,
  "lat": 41.8947
},
"weather": [
  {
    "id": 802,
    "main": "Clouds",
    "description": "scattered clouds",
    "icon": "03d"
  }
],
"base": "stations",
"main": {
  "temp": 18.96,
  "feels_like": 18.69,
  "temp_min": 17.86,
  "temp_max": 23.73,
  "pressure": 1017,
  "humidity": 68
},
"visibility": 10000,
"wind": {
  "speed": 4.12,
  "deg": 20
},
"clouds": {
  "all": 40
},
"dt": 1651757241,
"sys": {
  "type": 1,
  "id": 6796,
  "country": "IT",
  "sunrise": 1651723281,
  "sunset": 1651774326
},
"timezone": 7200,
"id": 3169070,
"name": "Rome",
"cod": 200
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
