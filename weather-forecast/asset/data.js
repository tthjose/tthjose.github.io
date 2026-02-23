async function getData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const resultfetch = await response.json();
        return(resultfetch);
    } 
    catch (error) {
            console.error(error.message);
    } 
}
async function displayWeather(code) {
    document.getElementById("current-weather").innerHTML = processWeatherCode(code);
}
async function displayTemperature(tcode) {
    let color;
    if (tcode <= 10) {
        color = "#0a94ff";
    }
    else if (tcode <= 16) {
        color = "#99ccff";
    }
    else if (tcode <= 22) {
        color = "#51f46c";
    }
    else if (tcode <= 27) {
        color = "#7df00a";
    }
    else if (tcode <= 32) {
        color ="#ffe099";
    }
    else if (tcode <= 36) {
        color="#ff9e38";
    }
    else if (tcode > 36) {
        color = "#ff3d08";
    }
    return(color);
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
        case (wCode > 50 && wCode < 91):
            weatherText = "rain";
            weatherIcon = '<img src="asset/icons/weather/rain.png"/>';
            break;
        case wCode >= 91:
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
function processWarning(tempMin,tempMax,humidP,wCode,aqi) {
    let coldsurge, heatwave, humid, thunderstorm, pollution;
    if (tempMin <= 20) {coldsurge = 1;}
    else if (tempMin <= 16) {coldsurge = 2;}
    else if  (tempMin <= 10) {coldsurge = 3;}
    else {coldsurge = 0};
    if (tempMax >= 34) {heatwave = 1;}
    else if (tempMax >= 36) {heatwave = 2;}
    else if (tempMax >= 39) {heatwave = 3;}
    else {heatwave = 0};
    if (humidP >= 80) {humid = 1;}
    else if (humidP >= 90) {humid = 2;}
    else if (humidP >= 95) {humid = 3;}
    else {humid = 0};
    if (wCode >= 91) {thunderstorm =1} else {thunderstorm = 0};
    if (aqi <= 60) {pollution = 0}
    else if (aqi <= 100) {pollution = 1}
    else if (aqi <= 150) {pollution = 2}
    else {pollution = 3};
    const warningCode = [coldsurge,heatwave,humid,thunderstorm,pollution];
    return(warningCode);
}
function displayWarning(code) {
    console.log(code);
    const element = ["coldsurge","heatwave","humid","thunderstorm","pollution"];
    for (let i=0; i<5; i++){
        let elementId = element[i];
        switch (true){
            case code[i] == 1 : document.getElementById(elementId).style.backgroundColor = "#FFFF00"; break;
            case code[i] == 2 : document.getElementById(elementId).style.backgroundColor = "#FF7F00"; break;
            case code[i] == 3 : document.getElementById(elementId).style.backgroundColor = "#FF2C2C"; break;
            case code[i] == 0 : document.getElementById(elementId).style.display = "none"; break;
        }
    }
    let overall = Math.max(...code)
    switch (true) {
            case overall == 1 : document.getElementById("overall").style.backgroundColor = "#FFFF00"; break;
            case overall == 2 : document.getElementById("overall").style.backgroundColor = "#FF7F00"; break;
            case overall == 3 : document.getElementById("overall").style.backgroundColor = "#FF2C2C"; break;
            case overall == 0 : document.getElementById("overall").style.display = "none"; break;
    }
}
async function main() {
    let url1 = "https://api.open-meteo.com/v1/forecast?latitude=21&longitude=105.77&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,relative_humidity_2m_max&models=ecmwf_ifs&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,precipitation&timezone=Asia%2FBangkok&forecast_days=3";
    let url2 = "https://api.waqi.info/feed/here/?token=3c909ae15fd4b8726813b84233b6038cc95291ef";
    let meteo = await getData(url1);
    let aq = await getData(url2);
    console.log(meteo);
    console.log(aq);
    document.getElementById("current-temp").innerHTML = meteo.current.temperature_2m;
    document.getElementById("frame-1-1-1").style.color = await displayTemperature(meteo.current.temperature_2m);
    displayWeather(meteo.current.weather_code);
    const warningCode = processWarning(meteo.daily.temperature_2m_min[0],meteo.daily.temperature_2m_max[0],meteo.daily.relative_humidity_2m_max[0],meteo.daily.weather_code[0],aq.data.aqi);
    displayWarning(warningCode);
}
main();