let data;
function openDB() {
    let db;
    const openRequest = indexedDB.open("drinkDatabase",2);
    openRequest.onupgradeneeded = function (event) {
        db = event.target.result;
        console.log("running onupgradeneeded");
        const storeOS = db.createObjectStore("drinkDatabaseStore", {keyPath: "id", autoIncrement:true});
        storeOS.createIndex("date", "date", {unique:false});
        storeOS.createIndex("week", "week", {unique:false});
        storeOS.createIndex("sugar", "sugar", {unique:false});
        storeOS.createIndex("exercise", "exercise", {unique:false});
        storeOS.createIndex("social", "social", {unique:false});
    };
}
function saveDB() {
    let db;
    const openRequest = indexedDB.open("drinkDatabase");
        openRequest.onsuccess = function (event) {
        console.log("Running onsuccess");
        db = event.target.result;
        const tx = db.transaction("drinkDatabaseStore", "readwrite");
        const store = tx.objectStore("drinkDatabaseStore");
        store.add({date:data[0],week:data[1],sugar:data[2],exercise:data[3],social:data[4]});
    };
}
async function saveData() {
    let Day = document.getElementById("day").value;
    const Sugar = document.getElementById("sugar").value;
    var Exercise = document.getElementById("exercise").checked;
    var Social = document.getElementById("social").checked;
    const Week = getYear(Day)*52+getWeek(Day);
    Day = new Date(Day).toLocaleDateString("vi-VN");
    data =[Day, Week, Sugar, Exercise, Social];
    console.log(data);
}
//Support functions, cannot separate yet due to CORS blocking local testing
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
function main() {
    openDB();
    document.getElementById("save").addEventListener("click", function(e) {
        saveData();
        saveDB();
    });
}
main();