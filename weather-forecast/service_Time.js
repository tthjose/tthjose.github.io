function refreshTime() {
    const timeDisplay = document.getElementById("time");
    const second = new Date().getSeconds();
    const minute = new Date().getMinutes();
    const hour = new Date().getHours();
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1; //For some reason the returned month falls behind by 1
    timeDisplay.textContent = day+"/"+month+"-"+hour+":"+minute+":"+second;
}
setInterval(refreshTime, 1000);