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
function findHN(data) {
}
async function main () {
    let warnings;
    const currentPath = window.location.pathname;
    const matchedPath = "/index.html";
    const url = "http://hymetnet.gov.vn/dongset";
    let thunders = await getData(url);
    switch (currentPath) {
        case "/index.html":
            for (let i = 0; i < 6; i++) {
                const objectContent = Object.values(thunders)[i];
                let place = ["Từ Liêm","Cầu Giấy","Nghĩa Đô"];
                checkThunder: for (let m = 0; m < place.length; m++) {
                    const check = objectContent.filter((content) => content.includes(place[m]));
                    if (Object.keys(check).length > 0 ) {
                        warnings = true;
                        break checkThunder;
                    };
                };
            };
            break;
        case "/td.html":
            for (let i = 0; i < 6; i++) {
                const objectContent = Object.values(thunders)[i];
                let place = ["Tam Điệp"];
                checkThunder: for (let m = 0; m < place.length; m++) {
                    const check = objectContent.filter((content) => content.includes(place[m]));
                    if (Object.keys(check).length > 0 ) {
                        warnings = true;
                        break checkThunder;
                    };
                };
            };
            break;
        case "/nd.html":
            for (let i = 0; i < 6; i++) {
                const objectContent = Object.values(thunders)[i];
                let place = ["Phong Doanh"];
                checkThunder: for (let m = 0; m < place.length; m++) {
                    const check = objectContent.filter((content) => content.includes(place[m]));
                    if (Object.keys(check).length > 0 ) {
                        warnings = true;
                        break checkThunder;
                    };
                };
            };
            break;        
    };
    if (warnings == true) {
        document.getElementById("warningsStorm").style.display = "block";
    }
}
main();