function refreshTime() {
    const timeDisplay = document.getElementById("time");
    const second = new Date().getSeconds();
    const minute = new Date().getMinutes();
    const hour = new Date().getHours();
    const day = new Date().getDate();
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1; //For some reason the returned month falls behind by 1
    let timeRaw = [day,month,year,hour,minute,second];
    const time = [];
    for (i=0; i<6;i++) {
        if (timeRaw[i] < 10) {
            time[i] = "0"+timeRaw[i];
        }
        else {time[i] = timeRaw[i]}
    };   
    timeDisplay.textContent = time[0]+"/"+time[1]+"/"+time[2]+"-"+time[3]+":"+time[4]+":"+time[5];
}
setInterval(refreshTime, 1000);