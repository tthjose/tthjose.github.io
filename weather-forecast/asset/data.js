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
async function displayWeather(code,code0,code1,code2) {
    document.getElementById("current-weather").innerHTML = processWeatherCode(code);
    document.getElementById("wFI-0").innerHTML = processWeatherCode(code0);
    document.getElementById("wFI-1").innerHTML = processWeatherCode(code1);
    document.getElementById("wFI-2").innerHTML = processWeatherCode(code2);
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
    if (tempMin <= 10) {coldsurge = 3;}
    else if (tempMin <= 14) {coldsurge = 2;}
    else if  (tempMin <= 19) {coldsurge = 1;}
    else {coldsurge = 0};
    if (tempMax >= 39) {heatwave = 3;}
    else if (tempMax >= 36) {heatwave = 2;}
    else if (tempMax >= 34) {heatwave = 1;}
    else {heatwave = 0};
    if (humidP >= 95) {humid = 3;}
    else if (humidP >= 90) {humid = 2;}
    else if (humidP >= 80) {humid = 1;}
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
            case code[i] == 1 : document.getElementById(elementId).innerText = "🟨"+element[i]+" "; document.getElementById(elementId).style.border = "1px solid black"; break;
            case code[i] == 2 : document.getElementById(elementId).innerText = "🟧"+element[i]+" "; document.getElementById(elementId).style.border = "1px solid black"; break;
            case code[i] == 3 : document.getElementById(elementId).innerText = "🟥"+element[i]+" "; document.getElementById(elementId).style.border = "1px solid black"; break;
            case code[i] == 0 : document.getElementById(elementId).style.display = "none"; break;
        }
    }
    let overall = Math.max(...code)
    switch (true) {
            case overall == 1 : document.getElementById("overall").innerText = "🟨"; break;
            case overall == 2 : document.getElementById("overall").innerText = "🟧"; break;
            case overall == 3 : document.getElementById("overall").innerText = "🟥"; break;
            case overall == 0 : document.getElementById("overall").innerText = ": none"; break;
    }
}
function displayWarningFuture(code,date) {
    let overall = Math.max(...code);
    let element;
    const warning = ["coldsurge","heatwave","humid","thunderstorm","pollution"];
    switch (true) {
        case date == 0 : element = "wFW-0"; break;
        case date == 1 : element = "wFW-1"; break;
        case date == 2 : element = "wFW-2"; break;
    }
    switch (true) {
            case overall == 1 : document.getElementById(element).innerText = "🟨"; break;
            case overall == 2 : document.getElementById(element).innerText = "🟧"; break;
            case overall == 3 : document.getElementById(element).innerText = "🟥"; break;
            case overall == 0 : document.getElementById(element).innerText = ": none"; break;
    }
    for (let i=0;i<5;i++) {
        if (code[i] > 0) {
            const para = document.createElement("p");
            para.innerHTML = warning[i];
            document.getElementById(element).appendChild(para);
        }
    }
}
function forecastTemperature(t) {
    for (let i=0;i<6;i++ ) {
        t[i] = t[i].toFixed(0);
    }
    console.log(t);
    document.getElementById("wFT-0").innerHTML = t[0]+"-"+t[3]+"°C";
    document.getElementById("wFT-1").innerHTML = t[1]+"-"+t[4]+"°C";
    document.getElementById("wFT-2").innerHTML = t[2]+"-"+t[5]+"°C";
}
function displayDate(date) {
    document.getElementById("wFD-0").innerText = date[0];
    document.getElementById("wFD-1").innerText = date[1];
    document.getElementById("wFD-2").innerText = date[2];
}
async function main() {
    //retrive data from APIs
    let url1 = "https://api.open-meteo.com/v1/forecast?latitude=20.98&longitude=105.8&daily=weather_code,temperature_2m_max,temperature_2m_min,relative_humidity_2m_mean,precipitation_probability_mean&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,precipitation&timezone=Asia%2FBangkok&forecast_days=3";
    let url2 = "https://api.waqi.info/feed/here/?token=3c909ae15fd4b8726813b84233b6038cc95291ef";
    let meteo = await getData(url1);
    let aq = await getData(url2);
    console.log(meteo);
    console.log(aq);
    //display current info
    document.getElementById("current-temp").innerHTML = meteo.current.temperature_2m;
    document.getElementById("current-temp-wrap").style.backgroundColor = await displayTemperature(meteo.current.temperature_2m);
    document.getElementById("current-humid").innerHTML = meteo.current.relative_humidity_2m;
    document.getElementById("current-aqi").innerHTML = aq.data.aqi;
    //display weather icon on all elements
    displayWeather(meteo.current.weather_code,meteo.daily.weather_code[0],meteo.daily.weather_code[1],meteo.daily.weather_code[2]);
    //display current weather warnings
    const warningCode = processWarning(meteo.daily.temperature_2m_min[0],meteo.daily.temperature_2m_max[0],meteo.daily.relative_humidity_2m_mean[0],meteo.daily.weather_code[0],aq.data.aqi);
    displayWarning(warningCode);
    //display forecast date
    displayDate(meteo.daily.time)
    //display temperature forecast
    let tForecast = [meteo.daily.temperature_2m_min[0],meteo.daily.temperature_2m_min[1],meteo.daily.temperature_2m_min[2],meteo.daily.temperature_2m_max[0],meteo.daily.temperature_2m_max[1],meteo.daily.temperature_2m_max[2]] 
    forecastTemperature(tForecast)
    //display forecast warning
    const warningCode1 = processWarning(meteo.daily.temperature_2m_min[1],meteo.daily.temperature_2m_max[1],meteo.daily.relative_humidity_2m_mean[1],meteo.daily.weather_code[1],0);
    const warningCode2 = processWarning(meteo.daily.temperature_2m_min[2],meteo.daily.temperature_2m_max[2],meteo.daily.relative_humidity_2m_mean[2],meteo.daily.weather_code[2],0);
    displayWarningFuture(warningCode,0);
    displayWarningFuture(warningCode1,1);
    displayWarningFuture(warningCode2,2);
}
main();