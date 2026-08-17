const currentWeek = getWeek(new Date()) + getYear(new Date())*52;
function retrieveDataCurrent () {
    const openRequest = indexedDB.open("drinkDatabase");
    openRequest.onerror = (event) => {
        console.log("Error");
    }
    openRequest.onsuccess = (event) => {
        let sugarLoad = 0;
        db = event.target.result;
        const tx = db.transaction("drinkDatabaseStore", "readonly");
        const store = tx.objectStore("drinkDatabaseStore").index("week"); 
        const getall = store.getAll(currentWeek);
        getall.onsuccess = (event) => {
            const Result = event.target.result;
            console.log(Result);
            let number = Result.length;
            for (let i = 0; i < number; i++) {
                if (Result[i].social == false) {
                    if (Result[i].exercise == true && Number(Result[i].sugar) > 0) {
                        sugarLoad = sugarLoad + Number(Result[i].sugar) - 0.5;
                    }
                    else {sugarLoad = sugarLoad + Number(Result[i].sugar);}
                }
            }
            console.log(sugarLoad);
            document.getElementById("sugaryLoad").innerText=sugarLoad;
            switch (sugarLoad) {
                case 0:
                    document.getElementById("sugaryLoadIcon").innerHTML = "<img src='asset/icon/glass/master.svg'/>";
                    break;
                case 0.5:
                    document.getElementById("sugaryLoadIcon").innerHTML = "<img src='asset/icon/glass/0.5.svg'/>";
                    break;
                case 1:
                    document.getElementById("sugaryLoadIcon").innerHTML = "<img src='asset/icon/glass/1.svg'/>";
                    break;
                case 1.5:
                    document.getElementById("sugaryLoadIcon").innerHTML = "<img src='asset/icon/glass/1.5.svg'/>";
                    break;
                case 2:
                    document.getElementById("sugaryLoadIcon").innerHTML = "<img src='asset/icon/glass/2.svg'/>";
                    break;
                case 2.5:
                    document.getElementById("sugaryLoadIcon").innerHTML = "<img src='asset/icon/glass/2.5.svg'/>";
                    break;
                default:
                    document.getElementById("sugaryLoadIcon").innerHTML = "<img src='asset/icon/glass/3.svg'/>";
                    break;        
            }
        }
    }
}
function displayDB() {
    const openRequest = indexedDB.open("drinkDatabase");
    openRequest.onerror = (event) => {
        console.log("Error");
    }
    openRequest.onsuccess = (event) => {
        document.getElementById("table").innerHTML= `
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Sugar load</th>
                        <th scope="col">Exercise</th>
                        <th scope="col">Social drink</th>
                        <th scope="col">Calculated load</th>
                    </tr>`
        const tx = db.transaction("drinkDatabaseStore", "readonly");
        const store = tx.objectStore("drinkDatabaseStore").index("week"); 
        const getall = store.getAll(currentWeek);
        getall.onsuccess = (event) => {
            const Result = event.target.result;
            let number = Result.length;
            let sugarDisplay;
            for (let i = 0; i < number; i++) {
                switch(Number(Result[i].sugar)) {
                    case 0:
                        sugarDisplay = "<10g";
                        break;
                    case 0.5:
                        sugarDisplay = "≤25g";
                        break;
                    case 1:
                        sugarDisplay = ">25g";
                        break;
                }
                const para = document.createElement("tr");
                para.innerHTML= `
                    <td> ${Result[i].date}</td>
                    <td> ${sugarDisplay}</td>
                    <td> ${displayCheckbox(Result[i].exercise)}</td>
                    <td> ${displayCheckbox(Result[i].social)}</td>
                    <td> ${getCalculatedLoad(Result[i])}</td>
                `
                document.getElementById("table").appendChild(para);
            }
        }
    }
}
//Support function
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
function displayCheckbox(c) {
    let checkbox;
    if (c == true) {
        checkbox = '<img class="icon-table" src="asset/icon/checkbox/checked.svg" />'
    }
    else {checkbox = '<img class="icon-table" src="asset/icon/checkbox/unchecked.svg" />'}
    return checkbox;
}
function getCalculatedLoad(l) {
    let result;
    if (l.social == true) {
        result = 0;
    }
    else {
        if (l.exercise == true) {
            result = Number(l.sugar) - 0.5;
            if (result < 0) {result = 0};
        } else {result= Number(l.sugar)}
    }
    return result;
}
//Execute function
function main() {
    retrieveDataCurrent();
    document.getElementById("viewDataCaller").addEventListener("click", function(e) {
        document.getElementById("table").style.display = "block";   
        displayDB();
        });
    };
main();
