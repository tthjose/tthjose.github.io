function getWeek(d) {
    const dt = new Date(d); 
    const ys = new Date(dt.getFullYear(), 0, 1); 
    const dp = Math.floor((dt - ys) / 86400000);
    const sw = ys.getDay();
    const so = (sw === 0) ? 6 : sw - 1;  
    const wn = Math.floor((dp + so) / 7) + 1;
    return wn;
}
function getYear(y) {
    const d = new Date(y);
    const year = d.getFullYear();
    return year;
}
export {getWeek,getYear}