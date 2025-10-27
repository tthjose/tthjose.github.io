    let a = localStorage.getItem("name");
    let b = localStorage.getItem("caller");
    if (a === null) {
        document.getElementById("welcome-message").style.display = "none";
        document.getElementById("menu-dropdown").innerHTML = "08-11-2025 / 19-09 ÂL";
    } 
    else {
    document.getElementById("welcome-message").innerHTML = "Trân trọng kính mời "+a+" đến chung vui cùng "+b+"!";
    document.getElementById("menu-dropdown").innerHTML = "Trân trọng kính mời "+a+" đến chung vui cùng "+b+"!";
    }