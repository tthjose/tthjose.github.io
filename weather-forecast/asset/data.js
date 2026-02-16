async function getData() {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=21&longitude=106&daily=temperature_2m_max,temperature_2m_min,weather_code&models=ecmwf_aifs025_single&current=temperature_2m,weather_code&timezone=Asia%2FBangkok&forecast_days=3"
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const resultfetch = await response.json();
        //console.log(resultfetch);
        console.log(resultfetch.current.temperature_2m);
        return(resultfetch);
    } 
    catch (error) {
            console.error(error.message);
    } 
}
async function displayWeather(code) {
    document.getElementById("current-weather").innerHTML = processWeatherCode(code);
}
function processWeatherCode(wCode) {
    let weatherText;
    let weatherIcon;
    switch(true) {
        case wCode <= 1:
            weatherText = "sunny";
            weatherIcon = '<img src="asset/icons/weather/sunny.png"/>';
            break;
        case wCode == 2:
            weatherText = "partly-cloudy";
            weatherIcon = '<img src="asset/icons/weather/partly-cloudy.png"/>';
            break;
        case wCode == 3:
            weatherText = "cloudy";
            weatherIcon = '<img src="asset/icons/weather/cloudy.png"/>';
            break;
        case (wCode > 50 && wCode < 95):
            weatherText = "rain";
            weatherIcon = '<img src="asset/icons/weather/rain.png"/>';
            break;
        case wCode >= 95:
            weatherText = "thunderstorm";
            weatherIcon = '<img src="asset/icons/weather/thunderstorm.png"/>';
            break;
        default:
            weatherText = "unknown-code";
            weatherIcon = '<img src="asset/icons/weather/unknown.png"/>';
            break;             
    };
    return weatherIcon;
}
async function main() {
    let meteo = await getData();
    console.log(meteo);
    let tempCurrent = meteo.current.temperature_2m;
    let tempD0Max = meteo.daily.temperature_2m_max[0];
    let tempD1Max = meteo.daily.temperature_2m_max[1];
    let tempD2Max = meteo.daily.temperature_2m_max[2];
    let tempD0Min = meteo.daily.temperature_2m_min[0];
    let tempD1Min = meteo.daily.temperature_2m_min[1];
    let tempD2Min = meteo.daily.temperature_2m_min[2];
    document.getElementById("current-temp").innerHTML = tempCurrent;
    displayWeather(meteo.current.weather_code);
}
main();
displayWeather();