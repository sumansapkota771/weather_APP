import './App.css';
import Weather from './component/weather';
import { useEffect, useState } from "react";
import { Dimmer, Loader } from 'semantic-ui-react';

function App() {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      if (lat !== null && long !== null) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
          );
          const result = await response.json();
          setData(result);
          console.log(result);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      }
    };

    fetchData();
    
  }, [lat, long]);

  return (
    <div className="App">
      {data && data.main ? (
        <Weather className="flex justify-center center bg-white"weatherData={data} />
      ) : (
        <div>
          <Dimmer active>
            <Loader>Loading..</Loader>
          </Dimmer>
       </div>
     )}
 </div>

  );
}

export default App;
