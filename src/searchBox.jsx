import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './searchBox.css'; // Assuming you have a CSS file for styling
import { useState } from 'react';

export default function SearchBox({ updateInfo }) {
    let  [city, setCity] = useState('');
    let [error, setError] = useState(false);
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY =  "a517faf76e444f0786db592d11bebf08";

    let getWeatherInfo = async () => {
        try {
        let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        let jsonResponse = await response.json();
        let result = {
            city: jsonResponse.name,
            temp: jsonResponse.main.temp_min,
            tempMin: jsonResponse.main.temp,
            humidity: jsonResponse.main.humidity,
            feelsLike: jsonResponse.main.feels_like,
            weather:jsonResponse.weather[0].description,
        };
        console.log(result);
        return result;
    } catch {
        throw error;
    }
     };
    

    let handleChange = (event) => {
        setCity(event.target.value);
    };

    let handleSubmit = async (event) => {
        try {
            event.preventDefault();
        console.log(city);
        setCity("");
        getWeatherInfo();
        let newInfo = await getWeatherInfo();
        updateInfo(newInfo);

        } catch {
            setError(true);
        }
        
    };

    return (
        <div className='search-box'>
            <form onSubmit={handleSubmit}>
            <TextField id="city" label="City Name" variant="outlined" required value={city} onChange={handleChange} />
            <br /><br />
             <Button variant="contained" type="Submit">Search</Button>
             {error && <p style={{color:"red"}}>No such place exist</p>}
            </form>
        </div>
    )
}